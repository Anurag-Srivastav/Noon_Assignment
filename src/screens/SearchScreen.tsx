import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PRODUCTS } from '../data/products';
import SearchResultCard from '../components/SearchResultCard';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import ThreeCardCarousel from '../components/ThreeCardCarousel';
import Tag from '../components/Tag';
import { SCREENS, COLORS, LABELS } from '../constants';
import { useShimmer } from '../hooks/useShimmer';
import { useDebounce } from '../hooks/useDebounce';
import { useSearch } from '../hooks/useSearch';
import { vh, vw } from '../utils/dimensions';
import type { Product } from '../data/products';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const { renderShimmer } = useShimmer(SCREENS.SEARCH);
  const { search, recentSearches, clearRecentSearches } = useSearch();
  
  const debouncedQuery = useDebounce(query, 500);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleTagPress = useCallback((item: string) => {
    setQuery(item);
  }, []);

  const handleProductPress = useCallback((productId: string) => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, {
      productId,
    });
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (query.trim() && query !== debouncedQuery) {
      setSearching(true);
    }
  }, [query, debouncedQuery]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setSearching(false);
        return;
      }

      setSearching(true);
      try {
        const searchResults = await search(debouncedQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setTimeout(() => {
          setSearching(false);
        }, 300);
      }
    };

    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);


  if (loading) {
    return renderShimmer();
  }

  return (
    <SafeAreaView style={styles.container}>

      <SearchBar
        editable={true}
        iconName={'chevron-back-outline'}
        value={query}
        onChangeText={setQuery}
        onPressIcon={handleBackPress}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        {recentSearches?.length > 0 && query.length === 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {LABELS.RECENT_SEARCHES}
              </Text>
              <TouchableOpacity onPress={clearRecentSearches}>
                <Text style={styles.clearButton}>{LABELS.CLEAR}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagContainer}>
              {recentSearches.map((item, idx) => (
                <Tag
                  key={idx}
                  text={item}
                  onPress={() => handleTagPress(item)}
                />
              ))}
            </View>
          </View>
        )}

        {query.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>
              {LABELS.SEARCH_RESULTS} ({searching ? '...' : results.length})
            </Text>

            {searching ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>{LABELS.SEARCHING}</Text>
              </View>
            ) : results.length > 0 ? (
              <View style={styles.resultsContainer}>
                {results?.map(item => (
                  <SearchResultCard
                    key={item.id}
                    product={item}
                    onPress={() => handleProductPress(item.id)}
                  />
                ))}
              </View>
            ) : (
              <Text
                style={styles.noResults}
              >
                {LABELS.NO_PRODUCTS_FOUND} "{query}"
              </Text>
            )}
          </View>
        )}

        {query.length === 0 && (
          <View style={styles.forYouSection}>
            <ThreeCardCarousel title={LABELS.FOR_YOU} data={PRODUCTS.forYou} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: vw(12),
    paddingBottom: vh(20),
  },
  section: {
    marginTop: vh(10),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(8),
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: vw(16),
    color: COLORS.BLACK,
    marginBottom: vh(8),
  },
  clearButton: {
    fontSize: vw(14),
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: vw(8),
  },
  resultsSection: {
    marginTop: vh(16),
  },
  resultsContainer: {
    gap: vh(12),
  },
  loadingContainer: {
    marginTop: vh(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: vh(40),
  },
  loadingText: {
    fontSize: vw(14),
    color: COLORS.GRAY_MEDIUM,
    fontWeight: '500',
  },
  noResults: {
    marginTop: vh(20),
    textAlign: 'center',
    color: COLORS.GRAY_MEDIUM,
    fontSize: vw(14),
  },
  forYouSection: {
    marginTop: vh(20),
  },
});
