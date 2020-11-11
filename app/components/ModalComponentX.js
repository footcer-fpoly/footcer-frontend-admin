import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import Modal, { ModalProps } from 'react-native-modal';
import Colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';

const ModalComponent = (props, ref) => {
  const [visible, setVisible] = useState(props?.visible || false);
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
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            onPress={hide}
            style={{
              position: 'absolute',
              right: 0,
              padding: 10 * WIDTH_SCALE,
              borderRadius: 4 * HEIGHT_SCALE,
              backgroundColor: Colors.colorGreen,
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: fonts.bold,
              }}>
              X
            </Text>
          </TouchableOpacity>
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
            }}>
            {props.children}
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
export default forwardRef(ModalComponent);
