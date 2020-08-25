import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colorGreen} from '../theme/Color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function ItemHeader(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon style={styles.iconHeader} name="chevron-left" size={21} />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>{props.titleHeader}</Text>
      <View style={{width: 21}} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colorGreen,
  },
  titleHeader: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconHeader: {
    color: '#fff',
  },
});
