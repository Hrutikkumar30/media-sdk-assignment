import { describe, test, expect, beforeEach } from 'vitest';
import { MediaClient } from '../MediaClient';

describe('MediaClient', () => {
  let client: MediaClient;

  beforeEach(() => {
    client = new MediaClient({ apiKey: 'test_key' });
  });

  test('should initialize with provided config', () => {
    expect(client).toBeDefined();
    expect(client.events).toBeDefined();
  });

  test('should emit trackView and trackDownload events through SDK', () => {
    let viewEventFired = false;
    let downloadEventFired = false;

    client.events.on('media:view', (payload: any) => {
      viewEventFired = true;
      expect(payload.mediaId).toBe('123');
    });

    client.events.on('media:download', (payload: any) => {
      downloadEventFired = true;
      expect(payload.mediaId).toBe('123');
    });

    client.trackView('123', 'Test Photo');
    client.trackDownload('123', 'https://example.com/photo.jpg');

    expect(viewEventFired).toBe(true);
    expect(downloadEventFired).toBe(true);
  });

  test('should clear cache on clearCache call', () => {
    expect(() => client.clearCache()).not.toThrow();
  });
});
