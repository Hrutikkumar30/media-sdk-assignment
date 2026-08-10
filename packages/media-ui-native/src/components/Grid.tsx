import React, { useCallback } from 'react';
import { FlatList, FlatListProps, StyleSheet, View, ListRenderItemInfo } from 'react-native';

export interface GridProps<T> extends Omit<FlatListProps<T>, 'numColumns'> {
  numColumns?: number;
  gap?: number;
}

export function Grid<T>({ 
  data, 
  renderItem, 
  numColumns = 3, 
  gap = 2,
  contentContainerStyle,
  ...rest 
}: GridProps<T>) {
  const renderGridItem = useCallback((info: ListRenderItemInfo<T>) => {
    return (
      <View style={{ flex: 1 / numColumns, padding: gap / 2 }}>
        {renderItem ? renderItem(info) : null}
      </View>
    );
  }, [numColumns, gap, renderItem]);

  return (
    <FlatList
      {...rest}
      data={data}
      renderItem={renderGridItem}
      numColumns={numColumns}
      contentContainerStyle={[
        { padding: gap / 2 },
        contentContainerStyle
      ]}
    />
  );
}
