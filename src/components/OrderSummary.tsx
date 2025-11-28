import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { vw, vh } from "../utils/dimensions";
import { useCartItem } from "../hooks/useCartItem";
import { COLORS, DELIVERY, TAX, LABELS } from "../constants";
import formatRupees from "../utils/formatAmount";

function OrderSummary() {
  const { totalAmount, totalItems } = useCartItem();

  const deliveryFee = totalItems > 0 ? DELIVERY.FEE : 0;
  const tax = Math.round(totalAmount * TAX.GST_RATE);
  const total = totalAmount + tax + deliveryFee

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{LABELS.ORDER_SUMMARY}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>{LABELS.SUBTOTAL}</Text>
        <Text style={styles.value}>{formatRupees(totalAmount)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{LABELS.DELIVERY_FEE}</Text>
        <Text style={styles.value}>{formatRupees(deliveryFee)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{LABELS.TAX}</Text>
        <Text style={styles.value}>{formatRupees(tax)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{LABELS.TOTAL}</Text>
        <Text style={styles.totalValue}>{formatRupees(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: vw(16),
    borderTopWidth: vh(1),
    borderColor: COLORS.GRAY_LIGHTER,
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    fontSize: vw(15),
    fontWeight: "700",
    color: COLORS.TEXT_SECONDARY,
    marginBottom: vh(12),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vh(8),
  },
  label: {
    fontSize: vw(13),
    color: COLORS.GRAY_MEDIUM,
    fontWeight: "500",
  },
  value: {
    fontSize: vw(13),
    color: COLORS.GRAY_DARK,
    fontWeight: "600",
  },
  divider: {
    height: vh(1),
    backgroundColor: COLORS.GRAY_LIGHTER,
    marginVertical: vh(10),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: vw(16),
    fontWeight: "700",
    color: COLORS.TEXT_SECONDARY,
  },
  totalValue: {
    fontSize: vw(18),
    fontWeight: "700",
    color: COLORS.BLACK,
  },
});

export default React.memo(OrderSummary);
