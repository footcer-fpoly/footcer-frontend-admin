import React from 'react';
import { WaveIndicator } from 'react-native-indicators';
import Modal from 'react-native-modal';
import Colors from '../theme/Colors';
import { HEIGHT_SCALE } from '../utils/ScaleAdaptor';
class Spinner extends React.PureComponent {
  static instance = null;

  static show() {
    if (Spinner.instance) {
      Spinner.instance.setState({ visible: true });
    }
  }

  static hide() {
    if (Spinner.instance) {
      Spinner.instance.setState({ visible: false });
    }
  }

  constructor(props) {
    super(props);
    Spinner.instance = this;
    this.state = {
      visible: false,
    };
  }
  render() {
    if (Spinner?.instance?.state?.visible) {
      return (
        <Modal
          animationInTiming={100}
          animationOutTiming={100}
          isVisible={Spinner?.instance?.state?.visible}
          style={{
            margin: 0,
            padding: 0,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <WaveIndicator color={Colors.whiteColor} size={60 * HEIGHT_SCALE} />
        </Modal>
      );
    }
    return null;
  }
}
export default Spinner;
