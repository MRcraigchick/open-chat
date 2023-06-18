import Svg, { Path } from 'react-native-svg';

export default function EyeVisible({ ...props }) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'
      {...props}>
      <Path d='M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.297-61.826q-45.147 0-76.571-31.603t-31.424-76.75q0-45.147 31.603-76.571t76.75-31.424q45.147 0 76.571 31.603t31.424 76.75q0 45.147-31.603 76.571t-76.75 31.424ZM480-194.5q-147.913 0-267.348-84.674T34.5-500q58.717-136.152 178.152-220.826Q332.087-805.5 480-805.5t267.348 84.674Q866.783-636.152 925.5-500q-58.717 136.152-178.152 220.826Q627.913-194.5 480-194.5Z' />
    </Svg>
  );
}
