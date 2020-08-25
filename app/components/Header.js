import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colorWhite, colorGreen} from '../theme/Color';

export default function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{props.nameStadium}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colorGreen,
  },
  title: {
    fontSize: 18,
    color: colorWhite,
  },
});
