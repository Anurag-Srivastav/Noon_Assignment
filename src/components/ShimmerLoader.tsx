import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { vh, vw } from '../utils/dimensions';
import { SHIMMER_DIMENSIONS, WIDTH_PERCENTAGES, DEFAULTS, ANIMATION } from '../constants/shimmerConstants';

interface ShimmerLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

export const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({
  width = DEFAULTS.WIDTH,
  height = DEFAULTS.HEIGHT,
  borderRadius = SHIMMER_DIMENSIONS.BORDER_RADIUS_SM,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: ANIMATION.DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: ANIMATION.DURATION,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [ANIMATION.OPACITY_MIN, ANIMATION.OPACITY_MAX],
  });

  return (
    <Animated.View
      style={[
        styles.shimmer,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const ProductCardShimmer = () => (
  <View style={styles.productCard}>
    <ShimmerLoader height={SHIMMER_DIMENSIONS.PRODUCT_IMAGE_HEIGHT} borderRadius={SHIMMER_DIMENSIONS.BORDER_RADIUS_LG} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_MD} width={WIDTH_PERCENTAGES.LARGE} style={styles.productTitle} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_SM} width={WIDTH_PERCENTAGES.SMALL} style={styles.productPrice} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_LARGE_BUTTON} borderRadius={SHIMMER_DIMENSIONS.BORDER_RADIUS_MD} style={styles.productButton} />
  </View>
);

export const CartItemShimmer = () => (
  <View style={styles.cartItem}>
    <ShimmerLoader width={SHIMMER_DIMENSIONS.IMAGE_SIZE} height={SHIMMER_DIMENSIONS.IMAGE_SIZE} borderRadius={SHIMMER_DIMENSIONS.BORDER_RADIUS_LG} />
    <View style={styles.cartItemContent}>
      <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_MD} width={WIDTH_PERCENTAGES.MEDIUM} />
      <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_SM} width={WIDTH_PERCENTAGES.EXTRA_SMALL} style={styles.cartItemSubtext} />
      <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_BUTTON} width={SHIMMER_DIMENSIONS.QUANTITY_WIDTH} style={styles.cartItemQuantity} />
    </View>
  </View>
);

export const BannerShimmer = () => (
  <ShimmerLoader height={SHIMMER_DIMENSIONS.BANNER_HEIGHT} borderRadius={SHIMMER_DIMENSIONS.BORDER_RADIUS_LG} style={styles.banner} />
);

export const OrderSummaryShimmer = () => (
  <View style={styles.orderSummary}>
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_LG} width={WIDTH_PERCENTAGES.EXTRA_SMALL} style={styles.summaryTitle} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_SM} width={WIDTH_PERCENTAGES.FULL} style={styles.summaryRow} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_SM} width={WIDTH_PERCENTAGES.FULL} style={styles.summaryRow} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_SM} width={WIDTH_PERCENTAGES.FULL} style={styles.summaryRow} />
    <ShimmerLoader height={SHIMMER_DIMENSIONS.HEIGHT_LG} width={WIDTH_PERCENTAGES.SMALL} style={styles.summaryTotal} />
  </View>
);

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: COLORS.GRAY_LIGHTER,
  },
  productCard: {
    width: WIDTH_PERCENTAGES.CARD,
    marginBottom: vh(16),
  },
  productTitle: {
    marginTop: vh(8),
  },
  productPrice: {
    marginTop: vh(6),
  },
  productButton: {
    marginTop: vh(8),
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: vh(16),
    backgroundColor: COLORS.BACKGROUND_TERTIARY,
    padding: vw(12),
    borderRadius: vw(8),
  },
  cartItemContent: {
    flex: 1,
    marginLeft: vw(12),
  },
  cartItemSubtext: {
    marginTop: vh(6),
  },
  cartItemQuantity: {
    marginTop: vh(8),
  },
  banner: {
    marginBottom: vh(16),
  },
  orderSummary: {
    marginTop: vh(20),
    padding: vw(16),
    backgroundColor: COLORS.BACKGROUND_LIGHT_GRAY,
    borderRadius: vw(8),
  },
  summaryTitle: {
    marginBottom: vh(12),
  },
  summaryRow: {
    marginBottom: vh(8),
  },
  summaryTotal: {
    marginTop: vh(8),
  },
});
