import React, { Component } from 'react';
import { TouchableOpacity, View, TextInput, Text } from 'react-native';
import Colors from '../theme/Colors';
import { WIDTH_SCALE } from '../utils/ScaleAdaptor';
TextInput.defaultProps.selectionColor = Colors.textGreen;

export default class TextInputCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      height: 30,
      isValue: '',
    };
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };
  handleBlur = () => {
    if (this.props.hideLabel) {
      this.setState({ isFocused: true });
    } else {
      this.setState({ isFocused: false });
    }
  };
  componentDidMount() {
    if (this.props.value) {
      this.setState({ isValue: this.props.value });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.isValue) {
      this.setState({ isValue: nextProps.value });
    }
  }
  render() {
    const { label, icon, textError, validate, isPicker, ...props } = this.props;
    const { isFocused, isValue } = this.state;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: !isFocused ? (isValue ? 10 : 35) : 10,
      color: !isFocused ? (isValue ? '#000' : Colors.colorGrayText) : '#000',
      //   color: '#000',
      marginLeft: 30,
      marginBottom: !isFocused ? (isValue ? 0 : 20) : 0,
      zIndex: !isFocused ? (isValue ? 9 : 0) : 9,
      paddingLeft: !isFocused ? (isValue ? 5 : 0) : 5,
      paddingRight: !isFocused ? (isValue ? 5 : 0) : 5,
      backgroundColor: !isFocused ? '#FFF' : '#FFF',
    };

    const inputContainer = {
      alignSelf: 'center',
      marginTop: 20 * WIDTH_SCALE,
      marginHorizontal: 10 * WIDTH_SCALE,
      borderRadius: 6 * WIDTH_SCALE,
      height: 50,
      width: '100%',
      borderColor: !isFocused
        ? isValue
          ? Colors.borderGreen
          : '#000'
        : Colors.borderGreen,
      //   borderColor: '#000',
      borderWidth: !isFocused ? 1 * WIDTH_SCALE : 1 * WIDTH_SCALE,
      zIndex: 1,
      overflow: 'visible',
    };
    const parent = {
      height: 70,
      zIndex: 2,
    };

    return (
      <View style={{ width: '100%' }}>
        <View style={parent}>
          <View>
            <Text style={labelStyle}>{label}</Text>
            <View style={inputContainer}>
              <TextInput
                {...props}
                onChangeText={(text) => {
                  this.setState({ isValue: text });
                  props.onChangeText(text);
                }}
                style={{
                  height: 50,
                  color: '#000',
                  marginLeft: 20 * WIDTH_SCALE,
                  marginRight: icon ? 40 * WIDTH_SCALE : 20 * WIDTH_SCALE,
                  marginBottom: 10,
                }}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                underlineColorAndroid={'transparent'}
              />
            </View>
            {icon && (
              <TouchableOpacity
                disabled={props.onPressIcon ? false : true}
                onPress={props.onPressIcon}
                style={{
                  alignItems: isPicker ? 'flex-end' : null,
                  width: isPicker ? '100%' : null,
                  zIndex: 9999,
                  position: 'absolute',
                  right: 0,
                  top: isPicker ? 0 : 30,
                }}>
                {icon()}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text
          style={{
            color: Colors.colorRed,
            // marginTop: 10 * WIDTH_SCALE,
          }}>
          {validate ? textError : ''}
        </Text>
      </View>
    );
  }
}
