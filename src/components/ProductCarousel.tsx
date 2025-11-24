import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
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
  const renderProductCard = ({ item }: { item: Product }) => <ProductCard product={item} />;

  return (
    <View style={styles.container}>
      {title && <Title>{title}</Title>}
      <FlatList
        data={products}
        keyExtractor={(product: Product) => product.id}
        renderItem={renderProductCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
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
