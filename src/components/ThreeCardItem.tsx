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
import { SCREENS } from '../constants';

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

function ThreeCardItem({ item }: Props) {
  const navigation = useNavigation<NavigationProp>();
  
  // Convert Item to Product for the hook
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
        
        {/* Add/Qty button positioned half on image */}
        <View style={styles.addButtonContainer}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addBtn} onPress={addToCart}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={decrement}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={increment}>
                <Text style={styles.qtyText}>+</Text>
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
}

export default React.memo(ThreeCardItem);

const styles = StyleSheet.create({
  card: {
    width: '31%',
    padding: vw(6),
    borderRadius: vw(10),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    height: vh(150),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: vh(20),
  },
  image: {
    width: '100%',
    height: vh(80),
    borderRadius: vw(6),
    backgroundColor: '#f2f2f2',
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
    width: '100%',
    paddingHorizontal: vw(2),
    marginTop: vh(4),
  },
  price: {
    fontSize: vw(12),
    fontWeight: '700',
    color: '#000',
  },
  addBtn: {
    backgroundColor: '#000',
    paddingHorizontal: vw(8),
    paddingVertical: vh(5),
    borderRadius: vw(6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: vw(13),
    fontWeight: '700',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: vw(6),
    backgroundColor: '#fff',
    paddingVertical: vh(2),
    paddingHorizontal: vw(3),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    gap: vw(3),
  },
  qtyBtn: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
    borderRadius: vw(4),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: vw(12),
    fontWeight: '700',
    color: '#fff',
  },
  qtyNumber: {
    fontSize: vw(11),
    fontWeight: '600',
    color: '#333',
    minWidth: vw(12),
    textAlign: 'center',
  },
});
