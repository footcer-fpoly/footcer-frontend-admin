import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function Notifications() {

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    }

    return (
        <SafeAreaView>
            <Text>Alo 1234</Text>
            <TextInput 
            placeholder="Enter your text here"
            />
            <TouchableOpacity onPress={requestUserPermission}>
                <Text>Request Permissions</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
