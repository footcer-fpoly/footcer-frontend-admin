import React, {Component} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';

export default class SplashScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text> SplashScreen </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Go to main</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
