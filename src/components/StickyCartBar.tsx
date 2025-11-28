import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from "./CustomButton";
import { COLORS, ICONS, LABELS, SCREENS } from "../constants";
import { vh, vw } from "../utils/dimensions";
import { useCartItem } from "../hooks/useCartItem";
import { useNavigation } from "@react-navigation/native";
import formatRupees from "../utils/formatAmount";

const StickyCartBar = () => {
  const insets = useSafeAreaInsets();
  const navigation= useNavigation();

  const { totalAmount, totalItems } = useCartItem();

  const handleCartPress = useCallback(() => {
    navigation.navigate(SCREENS.CART as never);
  }, [navigation]);

  if (totalItems === 0) return null;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.leftSection}>
        <Icon name={ICONS.CART_OUTLINE} size={20} color={COLORS.GRAY_DARK} />
        <View>
          <Text style={styles.items}>{totalItems} {LABELS.ITEMS}</Text>
          <Text style={styles.price}>{formatRupees(totalAmount)}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <CustomButton title={`${LABELS.VIEW_CART}   `} onPress={handleCartPress} />
        <Icon name={ICONS.CART_OUTLINE} size={18} color={COLORS.WHITE} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: vw(16),
    paddingVertical: vh(14),
    borderTopWidth: vh(1.5),
    borderTopColor: COLORS.BORDER_LIGHT,
    elevation: 12,
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: vh(-3) },
    shadowRadius: vw(8),
  },
  items: {
    fontSize: vw(13),
    fontWeight: "600",
    color: COLORS.GRAY_MEDIUM,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: vw(18),
    fontWeight: "800",
    marginTop: vh(3),
    color: COLORS.BLACK,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: vw(10),
  },
  buttonWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: vw(12),
  },
});

export default StickyCartBar;
