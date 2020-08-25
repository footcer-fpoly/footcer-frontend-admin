import React, {Component} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#0AB134', flex: 1}}>
        <Header title="Sân bóng FPoly" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#EDEDED'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 180,
                height: 110,
                backgroundColor: '#FFF',
                boderRadius: 7,
                justifyContent: 'center',
                marginTop: 21,
                marginLeft: 21,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name="soccer-ball-o"
                  size={50}
                  style={{marginBottom: 13}}
                />
                <Text>Thông tin cơ bản</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 180,
                height: 110,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                marginTop: 21,
                boderRadius: 7,
                marginVertical: 21,
                marginHorizontal: 21,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name="building-o"
                  size={50}
                  style={{marginBottom: 13}}
                />
                <Text>Sản phẩm - dịch vụ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
