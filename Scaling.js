import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Use a standard tablet resolution as the base (e.g., iPad/Android Tablet)
const guidelineBaseWidth = 1024;
const guidelineBaseHeight = 768;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale, width, height };