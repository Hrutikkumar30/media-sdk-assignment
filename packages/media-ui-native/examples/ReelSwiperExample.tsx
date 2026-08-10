import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ReelSwiper } from '../src/components/ReelSwiper';

const REELS = Array.from({ length: 5 }).map((_, i) => ({
  id: String(i),
  url: `https://picsum.photos/seed/${i + 100}/400/800`,
  title: `Reel ${i + 1}`,
}));

export const ReelSwiperExample = () => {
  return (
    <ReelSwiper
      data={REELS}
      renderItem={({ item, isActive }) => (
        <View style={styles.container}>
          <Image 
             source={{ uri: item.url }} 
             style={[styles.image, { opacity: isActive ? 1 : 0.5 }]} 
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>{isActive ? 'Playing' : 'Paused'}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  }
});
