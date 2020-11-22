import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ConfigStyle from '../theme/ConfigStyle';
import Container from '../components/common/Container';
import StatusBarMain from '../components/common/StatusBarMain';
import User from '../components/ProfileComponent/User';
import ContainerProfile from '../components/common/ContainerProfile';

export default function ProfileScreen({ route, navigation }) {
  return (
    <ContainerProfile
      header={
        <StatusBarMain
          title="Profile"
          contentBarStyles={{ justifyContent: 'space-between' }}
          navigation={navigation}
          headerHeight={ConfigStyle.statusBarHeight}
        />
      }
      headerHeight={ConfigStyle.statusBarHeight}>
      <View style={{ flex: 1 }}>
        <User navigation={navigation} />
      </View>
    </ContainerProfile>
  );
}
