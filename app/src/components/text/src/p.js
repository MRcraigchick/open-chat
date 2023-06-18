import { Text } from 'react-native';

export default function P({ children, ...props }) {
  return <Text {...props}>{children}</Text>;
}
