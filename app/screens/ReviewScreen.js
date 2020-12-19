import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import Colors from '../theme/Colors';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import fonts from '../theme/ConfigStyle';
import StarRating from 'react-native-star-rating';
import CFlatList from '../components/CFlatList';

export default function ReviewScreen({ route, navigation }) {
  const item = route?.params?.item;
  console.log(
    '🚀 ~ file: ReviewScreen.js ~ line 11 ~ ReviewScreen ~ item',
    item,
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        navigation={navigation}
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Đánh giá sân
          </Text>
        }
      />
      <CFlatList data={item || []} renderItem={renderItem} />

      {/* {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()} */}
    </View>
  );

  function renderItem(props) {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#eeeeee',
          borderBottomWidth: 1 * WIDTH_SCALE,
          padding: 20 * WIDTH_SCALE,
        }}>
        <View>
          <Image
            source={{
              uri: props?.item?.user?.avatar,
            }}
            style={{
              height: 80 * WIDTH_SCALE,
              width: 80 * WIDTH_SCALE,
              borderRadius: 40 * WIDTH_SCALE,
            }}
          />
        </View>
        <View style={{ marginLeft: 20 * WIDTH_SCALE, flex: 1 }}>
          <Text
            style={{
              width: '100%',
              color: Colors.blackColor,
              fontSize: fonts.font16,
              fontWeight: 'bold',
              //
            }}
            multiline>
            {props?.item?.user?.displayName}
          </Text>
          <View
            style={{ width: 120 * WIDTH_SCALE, marginTop: 2 * WIDTH_SCALE }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={props?.item?.rate || 0}
              fullStarColor={'yellow'}
              starSize={20 * WIDTH_SCALE}
            />
          </View>
          <Text
            style={{
              width: '100%',
              color: Colors.colorGrayText,
              marginTop: 8 * WIDTH_SCALE,
            }}
            multiline>
            {props?.item.content}
          </Text>
        </View>
      </View>
    );
  }
}
