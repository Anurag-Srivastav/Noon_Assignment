import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LFUCache, LFUCacheNode } from "./lfuCache";

type SearchState = {
  recent: string[];
  cache: { [key: string]: LFUCacheNode<any[]> };
};

const CACHE_CAPACITY = 10; // Maximum number of cached searches

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
      
      // Convert back to plain object - now includes full node structure
      state.cache = cache.toObject();
    },

    incrementCacheFrequency: (state, action: PayloadAction<string>) => {
      const q = action.payload.toLowerCase();
      
      // If item exists in cache, increment its frequency
      if (state.cache[q]) {
        state.cache[q].freq += 1;
      }
    },

    clearRecentSearches: (state) => {
      state.recent = [];
    },
  },
});

export const { addRecentSearch, cacheSearchResults, incrementCacheFrequency, clearRecentSearches } = searchSlice.actions;
export default searchSlice.reducer;
