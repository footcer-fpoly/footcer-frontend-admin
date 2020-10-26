import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '../redux/actions/userAction';
import IMAGE from '../utils/images.util';
import colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import API from '../server/api';
import { Message } from '../components/Message';
import Header from '../components/Header';
import Colors from '../theme/Colors';
import MapView from 'react-native-maps';

export default function UpdateStadium({ route, navigation }) {
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT, flex: 1 }}>
      <Header
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Cập nhật thông tin sân
          </Text>
        }
      />
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <ScrollView style={{ padding: 10 * WIDTH_SCALE }}>
          <View>
            <Text style={{ fontWeight: fonts.bold, left: 10 * WIDTH_SCALE }}>
              Vị trí sân của bạn trên bản đồ:
            </Text>
            <View
              style={{
                borderWidth: 1 * HEIGHT_SCALE,
                borderColor: Colors.borderGreen,
                borderRadius: 6 * HEIGHT_SCALE,
                height: 250 * HEIGHT_SCALE,
              }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
