import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Container from '../../components/common/Container';
import StatusBarMain from '../../components/common/StatusBarMain';
import ItemNotification from '../../components/Notification/ItemNotification';
import ConfigStyle from '../../theme/ConfigStyle'

export default function NotificationScreen(props) {
  return (
    <Container
      header={
        <StatusBarMain
        title="Thông báo"
        contentBarStyles={{justifyContent:'space-between'}}
        navigation={props.navigation}
        headerHeight={ConfigStyle.statusBarHeight}
        />
      }
      headerHeight={ConfigStyle.statusBarHeight}
      >
      <View style={{flex:1}}>
        <FlatList
          data={[1,2,3,4]}
          keyExtractor={item => item.toString()}
          renderItem={(item) => <ItemNotification data={item}/>}
        />
      </View>
      </Container>
  )
}
