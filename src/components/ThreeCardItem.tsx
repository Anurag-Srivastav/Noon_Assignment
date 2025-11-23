import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useCartItem } from '../hooks/useCartItem';
import { vw, vh } from '../utils/dimensions';
import Image from './Image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
import { Product } from '../data/products';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import StarRating from './StarRating';
import { SCREENS, COLORS, LABELS } from '../constants';

type Item = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
};

type Props = {
  item: Item;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ThreeCardItem({ item }: Props) {
  const navigation = useNavigation<NavigationProp>();
  
  const product: Product = {
    id: item.id,
    name: item.name,
    images: [item.image],
    price: item.price,
    rating: item.rating,
    description: '',
  };

  const { quantity, addToCart, increment, decrement } = useCartItem(product);

  const handleCardPress = () => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId: item.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        
        <View style={styles.addButtonContainer}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addBtn} onPress={addToCart}>
              <Text style={styles.addBtnText}>{LABELS.ADD}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={decrement}>
                <Text style={styles.qtyText}>{LABELS.DECREMENT}</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={increment}>
                <Text style={styles.qtyText}>{LABELS.INCREMENT}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.priceRatingContainer}>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        <StarRating rating={item.rating} size={vw(7)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '31%',
    padding: vw(6),
    borderRadius: vw(10),
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.08,
    height: vh(150),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.31 - vw(12),
    position: 'relative',
    marginBottom: vh(20),
  },
  image: {
    width: SCREEN_WIDTH * 0.31 - vw(12),
    height: vh(80),
    borderRadius: vw(6),
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: -vh(15),
    right: 0,
    zIndex: 10,
  },
  priceRatingContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: SCREEN_WIDTH * 0.31 - vw(12),
    paddingHorizontal: vw(2),
    marginTop: vh(4),
  },
  price: {
    fontSize: vw(12),
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  addBtn: {
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: vw(8),
    paddingVertical: vh(5),
    borderRadius: vw(6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  addBtnText: {
    color: COLORS.WHITE,
    fontSize: vw(13),
    fontWeight: '700',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: vw(6),
    backgroundColor: COLORS.WHITE,
    paddingVertical: vh(3),
    paddingHorizontal: vw(4),
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    gap: vw(4),
  },
  qtyBtn: {
    paddingHorizontal: vw(6),
    paddingVertical: vh(2),
    borderRadius: vw(4),
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: vw(12),
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  qtyNumber: {
    fontSize: vw(11),
    fontWeight: '600',
    color: COLORS.GRAY_DARK,
    minWidth: vw(12),
    textAlign: 'center',
  },
});
