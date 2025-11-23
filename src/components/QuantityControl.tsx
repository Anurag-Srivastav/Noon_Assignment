import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LABELS, COLORS } from '../constants';
import { vw } from '../utils/dimensions';
import { useCartItem } from '../hooks/useCartItem';
import { Product } from '../data/products';

type Props = {
  product: Product;
  addButtonText?: string;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  quantityTextStyle?: TextStyle;
  addButtonStyle?: ViewStyle;
  addButtonTextStyle?: TextStyle;
};

function QuantityControl({
  product,
  addButtonText = LABELS.ADD,
  containerStyle,
  buttonStyle,
  textStyle,
  quantityTextStyle,
  addButtonStyle,
  addButtonTextStyle,
}: Props) {
  const { quantity, addToCart, increment, decrement } = useCartItem(product);

  if (quantity === 0) {
    return (
      <TouchableOpacity 
        onPress={addToCart} 
        style={[styles.addButton, addButtonStyle]}
      >
        <Text style={[styles.addButtonText, addButtonTextStyle]}>
          {addButtonText}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        onPress={decrement} 
        style={[styles.button, buttonStyle]}
      >
        <Text style={[styles.text, textStyle]}>{LABELS.DECREMENT}</Text>
      </TouchableOpacity>
      
      <Text style={[styles.quantity, quantityTextStyle]}>{quantity}</Text>
      
      <TouchableOpacity 
        onPress={increment} 
        style={[styles.button, buttonStyle]}
      >
        <Text style={[styles.text, textStyle]}>{LABELS.INCREMENT}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(QuantityControl);

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: vw(6),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
  quantity: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
