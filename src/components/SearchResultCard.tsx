import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Image from './Image';
import { Product } from '../data/products';
import { vw, vh } from '../utils/dimensions';
import StarRating from './StarRating';
import { COLORS } from '../constants';

type Props = {
  product: Product;
  onPress: () => void;
};

export default function SearchResultCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <StarRating rating={product.rating} size={10} showRatingText />
        <Text style={styles.price}>₹{product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: vw(8),
    padding: vw(12),
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: vh(1) },
    shadowRadius: vw(3),
    elevation: 2,
    borderWidth: vh(1),
    borderColor: COLORS.GRAY_LIGHTEST,
  },
  image: {
    width: vw(80),
    height: vw(80),
    borderRadius: vw(6),
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  details: {
    flex: 1,
    marginLeft: vw(14),
    justifyContent: 'space-between',
    paddingVertical: vh(2),
  },
  name: {
    fontSize: vw(15),
    fontWeight: '600',
    color: COLORS.BLACK,
    lineHeight: vh(22),
    marginBottom: vh(6),
  },
  price: {
    fontSize: vw(17),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginTop: vh(6),
  },
});
