import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Lightbox } from '../src/components/Lightbox';

const IMAGES = [
  { id: '1', url: 'https://picsum.photos/seed/1/800/600' },
  { id: '2', url: 'https://picsum.photos/seed/2/800/600' },
  { id: '3', url: 'https://picsum.photos/seed/3/800/600' },
];

export const LightboxExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Lightbox" onPress={() => setIsOpen(true)} />
      <Lightbox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={IMAGES}
      />
    </View>
  );
};
