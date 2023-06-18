import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import tailwindConfig from '@/theme';

const theme = tailwindConfig.theme.colors;

export default function Input({
  register,
  name,
  type = '',
  rules = {},
  controlled = true,
  error,
  classNames = {
    container: '',
  },
  ...props
}) {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View className={`w-full mb-[20px] ${classNames.container}`}>
      <TextInput
        {...props}
        {...(() => {
          if (type === 'password') {
            return {
              right: hidePassword ? (
                <TextInput.Icon
                  onPress={() => setHidePassword(false)}
                  icon='eye'
                />
              ) : (
                <TextInput.Icon
                  onPress={() => setHidePassword(true)}
                  icon='eye-off'
                />
              ),
              secureTextEntry: hidePassword,
            };
          }
          return {};
        })()}
        {...register(name, rules)}
        error={Boolean(error)}
        theme={{
          colors: {
            primary: theme.first,
            accent: theme.dark,
            placeholder: theme.dark,
            text: theme.dark,
            background: 'transparent',
            error: theme.error,
          },
        }}
        style={{
          backgroundColor: 'transparent',
        }}
        underlineColor={theme.dark}
        underlineColorAndroid={theme.dark}
      />
      <Text
        className={`${classNames.error} text-error ${error?.message ? 'mt-[10px]' : ''}`}>
        {error?.message}
      </Text>
    </View>
  );
}
