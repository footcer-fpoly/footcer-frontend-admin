import {Dimensions, Platform} from 'react-native';
import Colors from './Colors';
import ConfigStyle from './ConfigStyle';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    // backgroundColor: 'red'
  },
  input: {
    height: 43,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  wrapperGlobal: {
    flex: 1,
    position: 'relative',
  },
  title1RS: {
    fontSize: ConfigStyle.RF.title1,
  },
};
