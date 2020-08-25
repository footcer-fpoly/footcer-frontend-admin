import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {colorGreen} from '../../theme/Color';

export default function Head(props) {
  return (
    <View style={styles.headContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: props.urlAvatar}} />
      </View>
      <Text style={styles.txtName}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  avatarContainer: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    borderColor: colorGreen,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 98,
    width: 98,
    borderRadius: 98 / 2,
    borderColor: colorGreen,
    borderWidth: 0.5,
  },
  txtName: {
    fontSize: 22,
    color: colorGreen,
  },
});
