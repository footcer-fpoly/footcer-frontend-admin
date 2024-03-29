import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  colorWhite,
  colorGrayText,
  colorBlue,
  colorGreen,
  colorOrange,
  colorDarkBlue,
} from '../../theme/Color';

export default function Setting(props) {
  return (
    <View style={styles.settingsContainer}>
      <View style={styles.row}>
        <Text style={styles.txt}>Khung giờ</Text>
        <Text style={styles.txtTimeSlot}>{props.timeSlot}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txt}>Ngày</Text>
        <Text style={styles.txtDate}>{props.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txt}>Loại sân</Text>
        <Text style={styles.txtDate}>{props.typeStadium}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txt}>Giá tiền</Text>
        <Text style={styles.txtPrice}>{props.price}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnSetting}>
          <Text style={styles.txtSetting}>Thiết lập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    backgroundColor: colorWhite,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  txt: {
    color: colorGrayText,
    fontSize: 16,
  },
  txtTimeSlot: {
    color: colorBlue,
    fontSize: 16,
  },
  txtDate: {
    fontSize: 16,
  },
  txtPrice: {
    color: colorGreen,
    fontSize: 16,
  },
  btnContainer: {
    alignItems: 'center',
  },
  btnSetting: {
    backgroundColor: colorOrange,
    alignItems: 'center',
    borderRadius: 7,
  },
  txtSetting: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 17,
    color: colorWhite,
  },
});
