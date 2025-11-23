import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CartItem as Item } from "../store/cart/cartSlice";
import { COLORS, LABELS } from "../constants";
import { vw, vh } from "../utils/dimensions";

type Props = {
  item: Item;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
};

function CartItem({ item, onInc, onDec, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.product.images[0] }}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text style={styles.name}>
          {item.product.name}
        </Text>

        <Text style={styles.price}>
          ₹{item.product.price}
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={onDec}
            style={styles.quantityButton}
          >
            <Text style={styles.buttonText}>{LABELS.DECREMENT}</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={onInc}
            style={styles.quantityButton}
          >
            <Text style={styles.buttonText}>{LABELS.INCREMENT}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Text style={styles.removeText}>{LABELS.REMOVE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: vh(12),
    paddingHorizontal: vw(10),
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    alignItems: "center",
  },
  image: {
    width: vw(80),
    height: vw(80),
    borderRadius: vw(8),
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  details: {
    flex: 1,
    marginLeft: vw(12),
  },
  name: {
    fontSize: vw(15),
    fontWeight: "600",
    color: COLORS.TEXT_PRIMARY,
  },
  price: {
    marginTop: vh(4),
    fontWeight: "700",
    fontSize: vw(15),
    color: COLORS.TEXT_PRIMARY,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vh(10),
  },
  quantityButton: {
    padding: vw(6),
    borderWidth: 1,
    borderRadius: vw(6),
    borderColor: COLORS.GRAY_LIGHT,
  },
  buttonText: {
    fontSize: vw(18),
    color: COLORS.TEXT_PRIMARY,
  },
  quantityText: {
    marginHorizontal: vw(12),
    fontSize: vw(16),
    color: COLORS.TEXT_PRIMARY,
  },
  removeButton: {
    marginLeft: vw(16),
  },
  removeText: {
    color: COLORS.YELLOW,
    fontSize: vw(14),
  },
});

export default React.memo(CartItem);
