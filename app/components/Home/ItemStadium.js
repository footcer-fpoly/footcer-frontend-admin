import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';
import { WIDTH_SCALE } from '../../utils/ScaleAdaptor';

export default function ItemStadium(props) {
  const data = {
    deal: '-40%',
    typeStadium: 'Sân 5',
    nameStadium: 'Sân bóng đá Chảo Lửa',
    address: '30 Phan Thúc Duyện, Tân Bình',
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/stadium.jpg')}
          style={{
            width: 170 * WIDTH_SCALE,
            height: 130,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
          }}
        />
        <TouchableOpacity style={styles.touchSale}>
          <Text style={styles.textSale}>{data.deal}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textInfor}>
        <Text style={styles.typeOfStadium}>{data.typeStadium}</Text>
        <Text style={styles.nameOfStadium}>{data.nameStadium}</Text>
        <Text style={styles.addressOfStadium}>{data.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    width: 170 * WIDTH_SCALE,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.colorGrayText,
    paddingBottom: 15,
    marginBottom: 16,
  },
  touchSale: {
    backgroundColor: Colors.touchSale,
    borderTopRightRadius: 7,
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  textSale: {
    color: Colors.whiteColor,
    fontSize: ConfigStyle.font12,
    fontFamily: 'Roboto-Regular',
  },
  textInfor: {
    marginTop: 7,
    marginLeft: 8,
  },
  typeOfStadium: {
    fontSize: ConfigStyle.font10,
    fontFamily: 'Roboto-Regular',
    color: Colors.colorGrayText,
  },
  nameOfStadium: {
    fontSize: ConfigStyle.font12,
    fontFamily: 'Roboto-Regular',
    color: Colors.blackColor,
  },
  addressOfStadium: {
    fontSize: ConfigStyle.font11,
    fontFamily: 'Roboto-Regular',
    color: Colors.colorGrayText,
  },
});
