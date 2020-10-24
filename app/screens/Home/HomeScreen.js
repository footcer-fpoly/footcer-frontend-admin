import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Slider from "react-native-hook-image-slider"
import Container from '../../components/common/Container'
import StatusBarMain from '../../components/common/StatusBarMain'
import ItemStadium from '../../components/Home/ItemStadium'
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';

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
    <View style={styles.slideShowContainer}>
      <View style={styles.slideShowContent}>
        <Slider
          images={[
            "https://bit.ly/34njZRw",
            "https://bit.ly/2HwfxHa",
            "https://bit.ly/3dRGf9h",
            "https://bit.ly/2HvF0Rr",
            "https://bit.ly/35mE8qk",
          ]}
        />
        </View>
      </View>
      <View style={styles.containerAds}>
        <View style={styles.touchPress}>
          <TouchableOpacity
          style={styles.touchStyle}
            >
            <Text style={styles.textPress}
              >
              Thêm quảng cáo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPromotion}>
          <Text style={styles.textDiscount}>Khuyến mãi của bạn</Text>
          <Text style={styles.textViewAll}>Xem tất cả</Text>
        </View>
        <FlatList 
          data={[1,2,3,4]}
          renderItem = {({item,index}) => <ItemStadium data={item} />}
          keyExtractor = {item => item.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent:'space-between'}}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  slideShowContainer:{flex:1},
  slideShowContent:{borderRadius:15, width:'100%', marginTop:13},
  containerAds:{paddingHorizontal:18},
  touchPress:{ marginVertical:13},
  touchStyle:{
    borderRadius:7, 
    borderWidth:1, 
    paddingVertical:10, 
    alignItems:'center', 
    borderColor:Colors.borderGreen
  },
  textPress: {
    color:Colors.borderGreen, 
    fontSize:ConfigStyle.font16, 
    fontFamily:'Roboto-Regular',
  },
  containerPromotion: {
    justifyContent:'space-between', 
    flexDirection:'row', 
    alignItems:'center',
    marginBottom:20,
  }, 
  textDiscount:{
    fontSize:ConfigStyle.font16, 
    fontFamily:'Roboto-Medium'
  },
  textViewAll:{
    fontSize:ConfigStyle.font14, 
    fontFamily:'Roboto-Medium', color:Colors.colorViewAll
  }
})
