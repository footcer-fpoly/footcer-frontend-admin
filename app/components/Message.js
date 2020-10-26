import { MessageOptions, showMessage } from 'react-native-flash-message';
import Colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import { StatusBar } from 'react-native';
import { WIDTH_SCALE } from '../utils/ScaleAdaptor';

export const Message = (message) => {
  showMessage({
    message: message,
    duration: 3000,
    backgroundColor: Colors.whiteColor,
    textStyle: { fontSize: fonts.font14, color: Colors.blackColor },
    titleStyle: { fontSize: fonts.font14, color: Colors.blackColor },
    style: {
      marginTop: StatusBar.currentHeight,
      borderWidth: 0.5 * WIDTH_SCALE,
      borderColor: Colors.blackColor,
    },
  });
};
