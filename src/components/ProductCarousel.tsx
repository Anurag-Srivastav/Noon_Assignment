import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
import { Product } from "../data/products";
import { vh, vw } from "../utils/dimensions";

type Props = {
  title?: string;
  products: Product[];
  onPressProduct?: (product: Product) => void;
};

export default function ProductCarousel({
  title,
  products,
  onPressProduct,
}: Props) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onPress={() => onPressProduct?.(product)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: vh(16),
  },
  title: {
    fontSize: vw(18),
    fontWeight: "600",
    marginBottom: vh(10),
    paddingHorizontal: vw(4),
  },
  scrollContent: {
    paddingHorizontal: vw(4),
  },
});
