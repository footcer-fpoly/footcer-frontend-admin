import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { HEIGHT_SCALE } from '../utils/ScaleAdaptor';
// import Spinner from './Spinner'

export default class CFlatList extends FlatList {
  static propTypes = {
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
  };
  ListFooterComponent = () => {
    const { isLoading, renderFooter } = this.props;
    if (isLoading) {
      return (
        <SkypeIndicator
          color={'#fff'}
          size={30 * HEIGHT_SCALE}
          style={{
            paddingTop: 8 * HEIGHT_SCALE,
            paddingBottom: 16 * HEIGHT_SCALE,
          }}
        />
      );
    }
    return renderFooter ? renderFooter : <View />;
  };
  keyExtractor = (item, index) =>
    item && item.id ? `${item?.id?.toString()}` : index?.toString();

  render() {
    const {
      children,
      isLoading,
      data,
      refreshing,
      onRefresh,
      noData,
    } = this.props;
    if (data?.length === 0) {
      return (
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
            />
          }>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {isLoading ? (
              <SkypeIndicator
                color={'#fff'}
                size={150 * HEIGHT_SCALE}
                style={{
                  paddingTop: 8 * HEIGHT_SCALE,
                  paddingBottom: 16 * HEIGHT_SCALE,
                }}
              />
            ) : noData ? (
              noData
            ) : (
              <Text
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  alignSelf: 'center',
                  paddingTop: 24 * HEIGHT_SCALE,
                  paddingBottom: 24 * HEIGHT_SCALE,
                  color: '#000',
                }}>
                {'Không có dữ liệu'}
              </Text>
            )}
          </View>
        </ScrollView>
      );
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data || []}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.ListFooterComponent}
        {...this.props}>
        {children}
      </FlatList>
    );
  }
}
