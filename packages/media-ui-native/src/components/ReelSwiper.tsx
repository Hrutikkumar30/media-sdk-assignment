import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, ListRenderItemInfo, StyleSheet } from 'react-native';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

export interface ReelSwiperProps<T> {
  data: T[];
  renderItem: (info: ListRenderItemInfo<T> & { isActive: boolean }) => React.ReactElement | null;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export function ReelSwiper<T>({ data, renderItem, onEndReached, onEndReachedThreshold = 0.5 }: ReelSwiperProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(info) => {
          return (
            <View style={styles.slide}>
              {renderItem({ ...info, isActive: info.index === activeIndex })}
            </View>
          );
        }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  slide: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
});
