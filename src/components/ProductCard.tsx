import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../data/products";
import Image from "./Image";
import { vh, vw } from "../utils/dimensions";
import Tag from "./Tag";
import StarRating from "./StarRating";
import { COLORS, LABELS, SCREENS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import QuantityControl from "./QuantityControl";
import formatRupees from "../utils/formatAmount";

type Props = {
  product: Product;
  cardColor?: string;
};

function ProductCard({
  product,
  cardColor = COLORS.WHITE,
}: Props) {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, {
      productId: product.id,
    } as never);
  };

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: cardColor }]}
    >
      <Image source={{ uri: product?.images[0] }} style={styles.image} />

      <Text numberOfLines={1} style={styles.name}>
        {product?.name}
      </Text>

      <View style={styles.priceRatingContainer}>
        <Text style={styles.price}>{formatRupees(product?.price)}</Text>
        <StarRating rating={product?.rating} size={vw(7)} />
      </View>

      <View style={styles.tagContainer}>
        {product?.tags?.slice(0, 2).map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </View>

      <View style={styles.bottomSection}>        
        <QuantityControl
          product={product}
          addButtonText={LABELS.ADD_TO_CART}
          addButtonStyle={styles.addToCartBtn}
          addButtonTextStyle={styles.addToCartText}
          containerStyle={styles.qtyContainer}
          buttonStyle={styles.qtyButton}
          textStyle={styles.qtyText}
          quantityTextStyle={styles.qtyNumber}
        />
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    width: vw(160),
    marginRight: vw(12),
    borderRadius: vw(12),
    padding: vw(10),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    justifyContent: "flex-start",
  },
  image: {
    height: vh(120),
    borderRadius: vw(10),
    backgroundColor: COLORS.BACKGROUND_GRAY,
    width: vw(140),
  },
  name: {
    marginTop: vh(8),
    fontWeight: "600",
    fontSize: vw(14),
    color: COLORS.TEXT_SECONDARY,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(4),
    width: vw(140),
  },
  price: {
    fontSize: vw(15),
    fontWeight: "700",
    color: COLORS.TEXT_SECONDARY,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: vh(6),
  },

  bottomSection: {
    marginTop: "auto",   
  },

  addToCartBtn: {
    paddingVertical: vh(8),
    borderRadius: vw(8),
    backgroundColor: COLORS.BLACK,
    alignItems: "center",
    width: vw(140),
  },
  addToCartText: {
    color: COLORS.WHITE,
    fontSize: vw(13),
    fontWeight: "600",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: vw(8),
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    paddingHorizontal: vw(4),
    height: vh(30),  
    width: vw(140),
  },
  qtyButton: {
    width: vw(22),
    height: vw(22),
    borderRadius: vw(6),
    backgroundColor: COLORS.BLACK,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: vw(16),
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  qtyNumber: {
    fontSize: vw(14),
    fontWeight: "600",
    color: COLORS.TEXT_SECONDARY,
  },
});
