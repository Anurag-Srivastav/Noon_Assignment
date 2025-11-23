import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { vw, vh } from "../utils/dimensions";
import { COLORS, LABELS, ICONS } from "../constants";

function ConfirmationIndicator() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.checkmark}>{ICONS.CHECKMARK}</Text>
      </View>

      <Text style={styles.message}>
        {LABELS.PAYMENT_SUCCESSFUL}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vh(40),
  },
  iconContainer: {
    width: vw(100),
    height: vw(100),
    borderRadius: vw(50),
    backgroundColor: COLORS.SUCCESS_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: vw(40),
    color: COLORS.SUCCESS_TEXT,
  },
  message: {
    marginTop: vh(20),
    fontSize: vw(18),
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.TEXT_PRIMARY,
  },
});

export default React.memo(ConfirmationIndicator);
