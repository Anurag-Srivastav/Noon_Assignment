import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem } from '../store/cart/cartSlice';
import { vw, vh } from '../utils/dimensions';
import Image from './Image';
import { useCartItem } from '../hooks/useCartItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import StarRating from './StarRating';
import { SCREENS, COLORS, LABELS } from '../constants';

type Props = {
  item: CartItem;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function CartItemGrid({ item }: Props) {
  const { product, quantity } = item;
  const { increment, decrement } = useCartItem(product);
  const navigation = useNavigation<NavigationProp>();

  const handleCardPress = useCallback(() => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId: product?.id });
  }, [navigation, product?.id]);

  const handleDecrement = useCallback((e: any) => {
    e.stopPropagation();
    decrement();
  }, [decrement]);

  const handleIncrement = useCallback((e: any) => {
    e.stopPropagation();
    increment();
  }, [increment]);

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handleCardPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      </View>

      <View style={styles.detailsContainer}>
        <Text numberOfLines={2} style={styles.name}>
          {product?.name}
        </Text>

        <Text style={styles.price}>₹{product?.price.toFixed(2)}</Text>

        <StarRating rating={product?.rating} size={vw(7)} />

        <View style={styles.qtyContainer}>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={handleDecrement}
          >
            <Text style={styles.qtyText}>{LABELS.DECREMENT}</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={handleIncrement}
          >
            <Text style={styles.qtyText}>{LABELS.INCREMENT}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: vw(8),
    padding: vw(6),
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: vh(8),
  },
  imageContainer: {
    width: vw(70),
    height: vw(70),
    marginRight: vw(8),
  },
  image: {
    width: vw(70),
    height: vw(70),
    borderRadius: vw(6),
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: vw(11),
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
    marginBottom: vh(2),
  },
  price: {
    fontSize: vw(12),
    fontWeight: '700',
    color: COLORS.BLACK,
    marginBottom: vh(2),
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: vw(5),
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    paddingHorizontal: vw(2),
    paddingVertical: vh(2),
    backgroundColor: COLORS.BACKGROUND_TERTIARY,
    alignSelf: 'flex-end',
    minWidth: vw(75),
  },
  qtyBtn: {
    paddingVertical: vh(1),
    borderRadius: vw(3),
    backgroundColor: COLORS.BLACK,
    minWidth: vw(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: vw(12),
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  qtyNumber: {
    fontSize: vw(12),
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
  },
});

export default React.memo(CartItemGrid);
