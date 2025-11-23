import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Product } from "../data/products";
import { RootStackParamList } from "../navigation/AppNavigator";
import CustomHeader from "../components/CustomHeader";
import BannerCarousel from "../components/BannerCarousel";
import CustomButton from "../components/CustomButton";
import Tag from "../components/Tag";
import StarRating from "../components/StarRating";
import { vh, vw } from "../utils/dimensions";
import { COLORS, LABELS, SCREENS, ICONS } from "../constants";
import { useShimmer } from "../hooks/useShimmer";
import { getProductById } from "../domain";
import QuantityControl from "../components/QuantityControl";
import { useCartItem } from "../hooks/useCartItem";

const { width } = Dimensions.get('window');
const CAROUSEL_SIZE = width - 24; // Square dimensions

type Route = RouteProp<RootStackParamList, "ProductDetails">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductDetailsScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const { renderShimmer } = useShimmer(SCREENS.PRODUCT_DETAILS);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await getProductById(route.params.productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [route.params.productId]);

  const { quantity, addToCart } = useCartItem(product!);

  if (loading || !product) {
    return renderShimmer();
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={product.name} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image Carousel */}
        <BannerCarousel 
          banners={product.images} 
          bannerWidth={CAROUSEL_SIZE}
          bannerHeight={CAROUSEL_SIZE}
          autoScroll={false}
          noPadding={true}
        />

        {/* Title */}
        <Text style={styles.title}>
          {product.name}
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          {product.description}
        </Text>

        {/* Price */}
        <Text style={styles.price}>
          ₹{product.price}
        </Text>

        {/* Rating */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>
            {LABELS.RATING}
          </Text>
          <StarRating rating={product.rating} size={20} showRatingText />
        </View>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.sectionTitle}>
              {LABELS.FEATURES}
            </Text>
            <View style={styles.tagsList}>
              {product.tags.map((tag, index) => (
                <Tag
                  key={index}
                  text={`• ${tag}`}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Sticky Add to Cart Button */}
      <View style={styles.stickyFooter}>
        {quantity === 0 ? (
          <CustomButton
            title={LABELS.ADD_TO_CART}
            onPress={addToCart}
            icon={ICONS.CART_OUTLINE}
          />
        ) : (
          <View style={styles.twoButtonContainer}>
            <QuantityControl
              product={product}
              addButtonText={LABELS.ADD_TO_CART}
              containerStyle={styles.quantityContainer}
              buttonStyle={styles.quantityButton}
              textStyle={styles.quantityButtonText}
              quantityTextStyle={styles.quantityText}
            />
            <View style={styles.viewCartButtonWrapper}>
              <CustomButton
                title={LABELS.VIEW_CART}
                onPress={() => navigation.navigate(SCREENS.CART)}
                icon={ICONS.CART_OUTLINE}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: vw(12),
    paddingBottom: vh(90),
  },
  title: {
    fontSize: vw(22),
    fontWeight: "700",
    marginTop: vh(16),
    color: COLORS.BLACK,
  },
  description: {
    marginTop: vh(10),
    fontSize: vw(15),
    color: COLORS.TEXT_SECONDARY,
    lineHeight: vh(20),
  },
  price: {
    fontSize: vw(20),
    fontWeight: "700",
    marginTop: vh(20),
    color: COLORS.BLACK,
  },
  ratingSection: {
    marginTop: vh(16),
  },
  sectionTitle: {
    fontSize: vw(16),
    fontWeight: '600',
    marginBottom: vh(8),
    color: COLORS.BLACK,
  },
  tagsSection: {
    marginTop: vh(16),
  },
  tagsList: {
    flexDirection: 'column',
    gap: vh(6),
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    padding: vw(16),
    borderTopWidth: vh(1),
    borderTopColor: COLORS.BORDER_LIGHT,
  },
  twoButtonContainer: {
    flexDirection: 'row',
    gap: vw(10),
    alignItems: 'center',
  },
  viewCartButtonWrapper: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: vw(10),
    borderWidth: vh(1),
    borderColor: COLORS.BLACK,
    paddingHorizontal: vw(10),
    paddingVertical: vh(10),
    backgroundColor: COLORS.BACKGROUND_LIGHT_GRAY,
    flex: 1,
  },
  quantityButton: {
    paddingVertical: vh(4),
    paddingHorizontal: vw(12),
    borderRadius: vw(6),
    backgroundColor: COLORS.BLACK,
  },
  quantityButtonText: {
    fontSize: vw(16),
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  quantityText: {
    fontSize: vw(16),
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
});
