import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import BannerCarousel from '../components/BannerCarousel';
import ProductCarousel from '../components/ProductCarousel';
import { BANNERS } from '../data/banners';
import type { Product } from '../data/products';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import ThreeCardCarousel from '../components/ThreeCardCarousel';
import StickyCartBar from '../components/StickyCartBar';
import { SCREENS, COLORS, LABELS } from '../constants';
import { useShimmer } from '../hooks/useShimmer';
import { vh, vw } from '../utils/dimensions';
import { getAllProducts } from '../domain';
import Header from '../components/Header';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [forYou, setForYou] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const { renderShimmer } = useShimmer(SCREENS.HOME);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data?.products);
        setForYou(data?.forYou);
        setNewArrivals(data?.newArrivals);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearchPress = useCallback(() => {
    navigation.navigate(SCREENS.SEARCH as never);
  }, [navigation]);

  const handleCartPress = useCallback(() => {
    navigation.navigate(SCREENS.CART as never);
  }, [navigation]);

  if (loading) {
    return renderShimmer();
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Custom Header */}
      <Header
        title={LABELS.APP_NAME}
      />

      <View style={styles.searchContainer}>
        <SearchBar
          editable={false}
          onPress={handleSearchPress}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <BannerCarousel banners={BANNERS} />

        <ProductCarousel
          title={LABELS.FEATURED}
          products={products}
        />

         <ThreeCardCarousel
          title={LABELS.THINGS_YOU_MIGHT_LIKE}
          data={forYou}
        />

         <ProductCarousel
          title={LABELS.NEW_ARRIVALS}
          products={newArrivals}
        />

      </ScrollView>
      <StickyCartBar onPressCart={handleCartPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  searchContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || vh(25) : 0,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    paddingHorizontal: vw(8),
    paddingBottom: vh(40),
  },

  floatingSearch: {
    position: 'absolute',
    bottom: vh(20),
    right: vw(16),
  },
});
