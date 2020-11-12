import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import Modal, { ModalProps } from 'react-native-modal';
import Colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import DatePicker from 'react-native-date-picker';

const ModalTimeComponent = (props, ref) => {
  const [visible, setVisible] = useState(props?.visible || false);
  const [time, setTime] = useState(new Date('Thu, 01 Jan 1970 00:00:00 GMT'));
  useEffect(() => {
    props?.timeDefault && setTime(new Date(props?.timeDefault));
  }, [props?.timeDefault]);
  const show = () => {
    if (!props?.isLoadding) setVisible(true);
  };
  const hide = async (onHide) => {
    if (!props?.isLoadding) setVisible(false);
    if (typeof onHide === 'function') {
      onHide && onHide();
    }
  };
  const getVisible = () => {
    return visible;
  };
  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
    getVisible: getVisible,
  }));
  useEffect(() => {
    props.time(time.toUTCString());
  }, [time]);
  const borderRadius = 40 * HEIGHT_SCALE;
  const renderContentModal = () => {
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          borderRadius: borderRadius,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 10 * HEIGHT_SCALE,
            padding: 15 * HEIGHT_SCALE,
            backgroundColor: Colors.colorWhite,
            minWidth: 0.7 * WIDTH,
            maxWidth: 0.9 * WIDTH,
          }}>
          <Text
            style={{
              fontSize: fonts.font20,
              textAlign: 'center',
              fontWeight: fonts.bold,
            }}
            adjustsFontSizeToFit>
            {props.title}
          </Text>
          <View
            style={{
              marginVertical: 10 * HEIGHT_SCALE,
              flex: 1,
              alignItems: 'center',
            }}>
            <DatePicker
              minuteInterval={30}
              timeZoneOffsetInMinutes={0}
              androidVariant="iosClone"
              mode="time"
              date={time}
              is24hourSource=""
              onDateChange={setTime}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {!props.isHideAgree && (
              <TouchableOpacity onPress={props.onPress ? props.onPress : hide}>
                <Text style={{ color: Colors.colorGreen }}>
                  {props.agree
                    ? props.agree.toUpperCase()
                    : 'Đồng ý'.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <Modal
      propagateSwipe={props?.propagateSwipe ? props?.propagateSwipe : false}
      isVisible={visible}
      onBackdropPress={props.disableBackdrop ? () => null : hide}
      onBackButtonPress={hide}
      style={{
        margin: 0,
        padding: 0,
        flex: 1,
        alignItems: 'center',
      }}>
      {renderContentModal()}
    </Modal>
  );
};
export default forwardRef(ModalTimeComponent);
