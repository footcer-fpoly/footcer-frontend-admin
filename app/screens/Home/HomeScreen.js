import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Container from '../../components/common/Container'
import StatusBarMain from '../../components/common/StatusBarMain'
import ConfigStyle from '../../theme/ConfigStyle'

export default function HomeScreen(props) {
  return (
    <Container 
    header={
      <StatusBarMain 
        title="Sân bóng FPoly"
        contentBarStyles={{justifyContent:'space-between'}}
        navigation={props.navigation}
        headerHeight={ConfigStyle.statusBarHeight}
      />
    }
    headerHeight={ConfigStyle.statusBarHeight}
    >
    </Container>
  )
}
