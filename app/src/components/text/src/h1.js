import { Text } from 'react-native';

export default function H1({ children, ...props }) {
  return (
    <Text
      {...props}
      className={`text-6xl py-[10px] md:text-8xl font-title-900 w-full ${
        props?.className && props.className
      }`}>
      {children}
    </Text>
  );
}
