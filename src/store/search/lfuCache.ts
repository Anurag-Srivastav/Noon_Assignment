// src/store/search/lfuCache.ts

export type LFUCacheNode<T> = {
  key: string;
  value: T;
  freq: number;
};

export class LFUCache<T> {
  private capacity: number;
  private map: Map<string, LFUCacheNode<T>>;

  constructor(capacity: number, initial?: Record<string, T>) {
    this.capacity = capacity;
    this.map = new Map();

    if (initial) {
      Object.keys(initial).forEach((key) => {
        this.map.set(key, {
          key,
          value: initial[key],
          freq: 1,
        });
      });
    }
  }

  get(key: string): T | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;

    node.freq += 1;
    return node.value;
  }

  put(key: string, value: T) {
    if (this.capacity === 0) return;

    // If key exists, update + freq++
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.value = value;
      node.freq += 1;
      return;
    }

    // If cache full → evict LFU
    if (this.map.size >= this.capacity) {
      this.evictLFU();
    }

    // Insert new key
    this.map.set(key, {
      key,
      value,
      freq: 1,
    });
  }

  private evictLFU() {
    let lfuKey = "";
    let minFreq = Infinity;

    this.map.forEach((node, key) => {
      if (node.freq < minFreq) {
        minFreq = node.freq;
        lfuKey = key;
      }
    });

    if (lfuKey) {
      this.map.delete(lfuKey);
    }
  }

  toObject(): Record<string, LFUCacheNode<T>> {
    const obj: Record<string, LFUCacheNode<T>> = {};
    this.map.forEach((node, key) => {
      obj[key] = {
        key: node.key,
        value: node.value,
        freq: node.freq,
      };
    });
    return obj;
  }
}
