import { Pressable, View } from 'react-native';
import { P } from '@/components/text';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function Button({
  label = false,
  classNames = {
    container: '',
    button: '',
    animatedLayer: '',
    childWrapper: '',
    label: '',
  },
  onPressIn = () => {},
  onPressOut = () => {},
  children,
  ...props
}) {
  const animated = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animated.value,
    };
  });

  const ChildComponent = ({ style }) => {
    return (
      <View
        style={style}
        className={`${classNames.childWrapper}`}>
        {label ? (
          <P className={`text-contrast text-[20px] ${classNames.label} `}>{label}</P>
        ) : (
          children
        )}
      </View>
    );
  };

  return (
    <View className={`bg-third rounded-[10px] ${classNames.container}`}>
      <Pressable
        className={`${classNames.button}`}
        {...props}
        onPressIn={(e) => {
          onPressIn(e);
          animated.value = withTiming(0, { duration: 100 });
        }}
        onPressOut={(e) => {
          onPressOut(e);
          animated.value = withTiming(1, { duration: 200 });
        }}>
        <Animated.View
          className={`bg-second w-full flex items-center justify-center rounded-[10px] h-[60px] ${classNames.animatedLayer}`}
          style={animatedStyle}
        />
        <ChildComponent className='flex justify-center items-center absolute left-0 right-0 top-0 bottom-0 rounded-[10px]' />
      </Pressable>
    </View>
  );
}
