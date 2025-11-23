import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
import Title from "./Title";
import { Product } from "../data/products";
import { vh, vw } from "../utils/dimensions";

type Props = {
  title?: string;
  products: Product[];
};

function ProductCarousel({
  title,
  products,
}: Props) {
  return (
    <View style={styles.container}>
      {title && <Title>{title}</Title>}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: vh(16),
    backgroundColor : 'transparent'
  },
  scrollContent: {
    paddingHorizontal: vw(4),
  },
});

export default React.memo(ProductCarousel);
