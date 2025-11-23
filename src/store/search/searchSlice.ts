import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LFUCache, LFUCacheNode } from "./lfuCache";

type SearchState = {
  recent: string[];
  cache: { [key: string]: LFUCacheNode<any[]> };
};

const CACHE_CAPACITY = 20; // Maximum number of cached searches

const initialState: SearchState = {
  recent: [],
  cache: {},
};

// Helper to create LFU cache from serialized state
const createCacheFromState = (cacheState: { [key: string]: LFUCacheNode<any[]> }): LFUCache<any[]> => {
  const cache = new LFUCache<any[]>(CACHE_CAPACITY);
  
  // Restore cached items from state with their frequencies
  Object.entries(cacheState).forEach(([_, node]) => {
    // Use a private method workaround to restore with frequency
    for (let i = 0; i < node.freq; i++) {
      if (i === 0) {
        cache.put(node.key, node.value);
      } else {
        cache.get(node.key);
      }
    }
  });
  
  return cache;
};

// Helper to serialize LFU cache to plain object with nodes
const serializeCache = (cache: LFUCache<any[]>): { [key: string]: LFUCacheNode<any[]> } => {
  const obj = cache.toObject();
  const result: { [key: string]: LFUCacheNode<any[]> } = {};
  
  // We need to get the full node structure, not just values
  // This requires accessing the cache's internal map
  Object.entries(obj).forEach(([key, _value]) => {
    const node = (cache as any).map.get(key);
    if (node) {
      result[key] = {
        key: node.key,
        value: node.value,
        freq: node.freq,
      };
    }
  });
  
  return result;
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const q = action.payload.trim().toLowerCase();

      if (!q) return;

      state.recent = state.recent.filter(r => r !== q);

      state.recent.unshift(q);

      state.recent = state.recent.slice(0, 10);
    },

    cacheSearchResults: (
      state,
      action: PayloadAction<{ query: string; results: any[] }>
    ) => {
      const q = action.payload.query.toLowerCase();
      
      // Recreate LFU cache from current state
      const cache = createCacheFromState(state.cache);
      
      // Add new search result
      cache.put(q, action.payload.results);
      
      // Serialize back to state
      state.cache = serializeCache(cache);
    },

    getCachedResults: (state, action: PayloadAction<string>) => {
      const q = action.payload.toLowerCase();
      
      // Recreate LFU cache from current state
      const cache = createCacheFromState(state.cache);
      
      // Get will increment frequency
      cache.get(q);
      
      // Serialize back to state to preserve frequency update
      state.cache = serializeCache(cache);
    },

    clearRecentSearches: (state) => {
      state.recent = [];
    },
  },
});

export const { addRecentSearch, cacheSearchResults, getCachedResults, clearRecentSearches } = searchSlice.actions;
export default searchSlice.reducer;
