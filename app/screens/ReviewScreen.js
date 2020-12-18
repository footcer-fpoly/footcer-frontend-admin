import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import Colors from '../theme/Colors';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import fonts from '../theme/ConfigStyle';
import StarRating from 'react-native-star-rating';

export default function ReviewScreen({ route, navigation }) {
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
      <ScrollView showsHorizontalScrollIndicator={true}>
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
        {renderItem()}
      </ScrollView>
    </View>
  );

  function renderItem() {
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
              uri:
                'https://i.pinimg.com/236x/0d/7d/b0/0d7db08b7a4a5e31c2f8bfb353b0a882.jpg',
            }}
            style={{
              height: 80 * WIDTH_SCALE,
              width: 80 * WIDTH_SCALE,
              borderRadius: 40 * WIDTH_SCALE,
            }}
          />
        </View>
        <View style={{ marginLeft: 20 * WIDTH_SCALE, flex: 1 }}>
          <View style={{ width: 120 * WIDTH_SCALE }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={5}
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
            multiline>{`Em cần tìm người yêu làm Dev <3 I love you 3000 yeeu`}</Text>
        </View>
      </View>
    );
  }
}
