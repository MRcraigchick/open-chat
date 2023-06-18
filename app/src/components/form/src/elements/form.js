import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function Form({ defaultValues = {}, children, onSubmit, ...props }) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  const mapChildrenRecursively = (child) => {
    if (child.props.wrapper && child.props.children) {
      const { children: nestedChildren, ...childProps } = child.props;
      return React.createElement(
        child.type,
        { ...childProps },
        React.Children.map(nestedChildren, (nestedChild) =>
          mapChildrenRecursively(nestedChild)
        )
      );
    } else if (child.props && child.props.submitter) {
      return React.cloneElement(child, {
        onPress: handleSubmit((values) => {
          onSubmit({ values, errors });
        }),
        ...child.props,
      });
    } else if (child.props && child.props.name) {
      return (
        <Controller
          key={child.props?.name}
          name={child.props?.name}
          control={control}
          rules={child.props.rules}
          render={({
            field: { onChange, ref, ...otherFieldProps },
            fieldState: { error },
          }) =>
            React.createElement(child.type, {
              ...{
                ...child.props,
                onChangeText: onChange,
                ...otherFieldProps,
                register,
                error,
              },
            })
          }
        />
      );
    }
    {
      return child;
    }
  };

  return (
    <View
      {...props}
      className={`${props.className}`}>
      {React.Children.map(children, (child) => mapChildrenRecursively(child))}
    </View>
  );
}
