import React, {useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagesUtil from '../../utils/images.util';
import IconSearch from '../../assets/images/svg/magnifying-glass.svg';

const InputSearch = (props) => {
  const input = useRef(null);
  return (
    <View
      style={{
        ...styles.container,
        justifyContent: 'flex-start',
      }}
    >
      {/* <IconSearch /> */}
      {props.disabled ? (
        <TouchableWithoutFeedback
          onPress={props.onFocusSearch}
          style={{zIndex: 2}}
        >
          <View style={styles.overplayTextInput}></View>
        </TouchableWithoutFeedback>
      ) : null}
      <TextInput
        ref={input}
        style={{...styles.textInput, marginLeft: 12}}
        placeholder="Search...."
        value={props.textSearch}
        onChange={props.onSearch}
        onFocus={props.onFocusSearch}
        autoFocus={props.autoFocus}
      />
    </View>
  );
};
InputSearch.prototype = {
  onSearch: PropTypes.func,
  disabled: PropTypes.bool,
};
export default InputSearch;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height: 43,
    marginHorizontal: 0,
    zIndex: 99,
  },
  textInput: {
    marginTop: 5,
    flex: 1,
  },
  iconSearch: {
    width: 22,
    height: 22,
  },
  overplayTextInput: {
    height: 46,
    position: 'absolute',
    width: '75%',
    top: 0,
    left: 37,
    zIndex: 99,
  },
});
