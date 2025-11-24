import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  ProductCardShimmer,
  BannerShimmer,
  CartItemShimmer,
  OrderSummaryShimmer,
  ShimmerLoader,
} from '../components/ShimmerLoader';
import SearchBar from '../components/SearchBar';
import CustomHeader from '../components/CustomHeader';
import { LABELS, COLORS, SCREENS } from '../constants';
import { vh, vw } from '../utils/dimensions';

const { width } = Dimensions.get('window');
const CAROUSEL_SIZE = width - 24;

type ShimmerScreen = typeof SCREENS.HOME | typeof SCREENS.SEARCH | typeof SCREENS.CART | typeof SCREENS.PRODUCT_DETAILS | typeof SCREENS.CART_REVIEW;

interface UseShimmerReturn {
  renderShimmer: () => React.ReactElement;
}

export const useShimmer = (screen: ShimmerScreen): UseShimmerReturn => {
  const renderShimmer = (): React.ReactElement => {
    switch (screen) {
      case SCREENS.HOME:
        return (
          <SafeAreaView style={styles.homeSafe}>
            <SearchBar editable={false} onPress={() => {}} />
            <ScrollView
              contentContainerStyle={styles.homeScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <BannerShimmer />
              <View style={styles.homeSection}>
                <View style={styles.productGrid}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ProductCardShimmer key={`home-shimmer-1-${index}`} />
                  ))}
                </View>
              </View>
              <View style={styles.homeSectionSpaced}>
                <View style={styles.productGrid}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <ProductCardShimmer key={`home-shimmer-2-${index}`} />
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        );

      case SCREENS.SEARCH:
        return (
          <SafeAreaView style={styles.searchSafe}>
            <SearchBar
              editable={false}
              iconName={'chevron-back-outline'}
              value=""
              onChangeText={() => {}}
              onPressIcon={() => {}}
              style={styles.searchBarNoMargin}
            />
            <View style={styles.searchGrid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductCardShimmer key={`search-shimmer-${index}`} />
              ))}
            </View>
          </SafeAreaView>
        );

      case SCREENS.CART:
        return (
          <SafeAreaView style={styles.cartSafe}>
            <CustomHeader title={LABELS.YOUR_CART} />
            <View style={styles.cartContent}>
              {Array.from({ length: 3 }).map((_, index) => (
                <CartItemShimmer key={`cart-shimmer-${index}`} />
              ))}
              <OrderSummaryShimmer />
            </View>
          </SafeAreaView>
        );

      case SCREENS.PRODUCT_DETAILS:
        return (
          <SafeAreaView style={styles.productDetailsSafe}>
            <CustomHeader title={LABELS.LOADING} />
            <ScrollView contentContainerStyle={styles.productDetailsContent}>
              <View style={[styles.productDetailsImage, { width: CAROUSEL_SIZE, height: CAROUSEL_SIZE }]} />
              <ShimmerLoader height={28} width="80%" style={styles.productDetailsSpacing1} />
              <ShimmerLoader height={16} width="100%" style={styles.productDetailsSpacing2} />
              <ShimmerLoader height={16} width="90%" style={styles.productDetailsSpacing1} />
              <ShimmerLoader height={24} width="30%" style={styles.productDetailsSpacing3} />
              <ShimmerLoader height={20} width="40%" style={styles.productDetailsSpacing4} />
              <ShimmerLoader height={60} width="100%" style={styles.productDetailsSpacing1} />
              <ShimmerLoader height={20} width="40%" style={styles.productDetailsSpacing4} />
              <ShimmerLoader height={40} width="100%" />
              <ShimmerLoader height={40} width="100%" style={styles.productDetailsSpacing4} />
              <ShimmerLoader height={40} width="100%" style={styles.productDetailsSpacing4} />
            </ScrollView>
          </SafeAreaView>
        );

      case SCREENS.CART_REVIEW:
        return (
          <SafeAreaView style={styles.cartReviewSafe}>
            <CustomHeader title={LABELS.REVIEW_ORDER} />
            <ScrollView contentContainerStyle={styles.cartReviewContent}>
              <ShimmerLoader height={20} width="50%" style={styles.cartReviewSpacing1} />
              <ShimmerLoader height={60} borderRadius={10} style={styles.cartReviewSpacing2} />
              <ShimmerLoader height={60} borderRadius={10} style={styles.cartReviewSpacing3} />
              
              <ShimmerLoader height={20} width="40%" style={styles.cartReviewSpacing1} />
              <ShimmerLoader height={50} style={styles.cartReviewSpacing2} />
              <ShimmerLoader height={50} style={styles.cartReviewSpacing2} />
              <ShimmerLoader height={50} style={styles.cartReviewSpacing3} />
              
              <OrderSummaryShimmer />
            </ScrollView>
          </SafeAreaView>
        );

      default:
        return <View />;
    }
  };

  return { renderShimmer };
};

const styles = StyleSheet.create({
  // Home Screen Styles
  homeSafe: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  homeScrollContent: {
    paddingHorizontal: vw(8),
    paddingBottom: vh(40),
  },
  homeSection: {
    marginTop: vh(20),
    marginBottom: vh(10),
  },
  homeSectionSpaced: {
    marginTop: vh(20),
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  // Search Screen Styles
  searchSafe: {
    flex: 1,
  },
  searchGrid: {
    marginTop: vh(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  // Cart Screen Styles
  cartSafe: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  cartContent: {
    padding: vw(16),
  },

  // Product Details Screen Styles
  productDetailsSafe: {
    flex: 1,
  },
  productDetailsContent: {
    padding: vw(12),
  },
  productDetailsImage: {
    backgroundColor: COLORS.GRAY_LIGHTER,
    borderRadius: vw(8),
    marginBottom: vh(16),
  },
  productDetailsSpacing1: {
    marginBottom: vh(12),
  },
  productDetailsSpacing2: {
    marginBottom: vh(6),
  },
  productDetailsSpacing3: {
    marginBottom: vh(20),
  },
  productDetailsSpacing4: {
    marginTop: vh(10),
  },

  // Cart Review Screen Styles
  cartReviewSafe: {
    flex: 1,
  },
  cartReviewContent: {
    padding: vw(16),
  },
  cartReviewSpacing1: {
    marginBottom: vh(12),
  },
  cartReviewSpacing2: {
    marginBottom: vh(10),
  },
  cartReviewSpacing3: {
    marginBottom: vh(20),
  },
  searchBarNoMargin: {
    marginHorizontal: 0,
  },
});
