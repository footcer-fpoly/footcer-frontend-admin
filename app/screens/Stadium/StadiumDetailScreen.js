import React from 'react'
import { View, Text, Image } from 'react-native'
import Container from '../../components/common/Container'
import StatusBarMain from '../../components/common/StatusBarMain'
import ConfigStyle from '../../theme/ConfigStyle'

export default function StadiumDetailScreen(props) {
    return (
        <Container
        header={
      <StatusBarMain 
        title="Thông tin sân"
        contentBarStyles={{justifyContent:'space-between'}}
        navigation={props.navigation}
        arrowBack={true}
        headerHeight={ConfigStyle.statusBarHeight}
      />
    }
    headerHeight={ConfigStyle.statusBarHeight}
        >
            <View style={{flex: 1}}>
                <Image 
                source={require('../../assets/images/stadium.jpg')} 
                style={{width:'100%', height:300,borderBottomLeftRadius:30,borderBottomRightRadius:30}} 
                />
            </View>
        </Container>
    )
}
