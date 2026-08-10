import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Dimensions, Image, SafeAreaView } from 'react-native';

export interface LightboxItem {
  id: string;
  url: string;
}

export interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LightboxItem[];
  initialIndex?: number;
}

export function Lightbox({ isOpen, onClose, items, initialIndex = 0 }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <TouchableOpacity onPress={goPrev} style={styles.navButton}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
             <Image 
               source={{ uri: currentItem.url }} 
               style={styles.image} 
               resizeMode="contain" 
             />
          </View>

          <TouchableOpacity onPress={goNext} style={styles.navButton}>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.indicatorText}>{currentIndex + 1} / {items.length}</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 20,
  },
  navText: {
    color: 'white',
    fontSize: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  indicatorText: {
    color: 'white',
    fontSize: 14,
  }
});
