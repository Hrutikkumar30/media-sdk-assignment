import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Grid } from '../src/components/Grid';

const MOCK_DATA = Array.from({ length: 30 }).map((_, i) => ({
  id: String(i),
  url: `https://picsum.photos/seed/${i}/200/200`,
}));

export const GridExample = () => {
  return (
    <Grid
      data={MOCK_DATA}
      numColumns={3}
      gap={4}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#ccc',
  },
  image: {
    flex: 1,
  }
});
