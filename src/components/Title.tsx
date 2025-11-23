import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { vw, vh } from "../utils/dimensions";
import { COLORS } from "../constants";

type Props = {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
};

function Title({ children, style, numberOfLines }: Props) {
  return (
    <Text style={[styles.title, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: vw(18),
    fontWeight: "600",
    marginBottom: vh(10),
    paddingHorizontal: vw(4),
    color: COLORS.TEXT_SECONDARY,
  },
});

export default React.memo(Title);
