import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addRecentSearch, cacheSearchResults, incrementCacheFrequency, clearRecentSearches } from '../store/search/searchSlice';
import { searchProducts } from '../domain';
import type { Product } from '../data/products';

export const useSearch = () => {
  const dispatch = useDispatch();
  
  const cache = useSelector((state: RootState) => state.search.cache);
  const recentSearches = useSelector((state: RootState) => state.search.recent);

  // Search with caching using Redux LFU cache
  const search = useCallback(async (
    query: string
  ): Promise<Product[]> => {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
      return [];
    }

    // Check cache first
    const cachedNode = cache[normalizedQuery];
    console.log(cache)
    if (cachedNode) {
      console.log(`Cache HIT for "${normalizedQuery}" (freq: ${cachedNode.freq})`);
      
      // Increment frequency for LFU tracking
      dispatch(incrementCacheFrequency(normalizedQuery));
      
      // Add to recent searches
      dispatch(addRecentSearch(query));

      return cachedNode.value;
    }

    // Cache MISS - call domain layer (synchronous filtering)
    console.log(`Cache MISS for "${normalizedQuery}" - filtering products`);

    try {
      // searchProducts is synchronous (filters locally)
      const results = await searchProducts(normalizedQuery);

      // Cache the results using Redux action
      dispatch(cacheSearchResults({ query: normalizedQuery, results }));
      
      // Add to recent searches
      dispatch(addRecentSearch(query));

      return results;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }, [cache, dispatch]);

  // Clear recent searches
  const clearRecent = useCallback(() => {
    dispatch(clearRecentSearches());
  }, [dispatch]);

  return useMemo(() => ({
    search,
    recentSearches,
    clearRecentSearches: clearRecent,
  }), [search, recentSearches, clearRecent]);
};

