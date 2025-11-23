import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Image from "./Image";
import { vh, vw } from "../utils/dimensions";
import { COLORS } from "../constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
  title: string;
  image: string;
  onPress?: () => void;
};

function CategoryGridItem({ title, image, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.5,
    paddingRight: vw(10),
    marginBottom: vh(14),
  },
  image: {
    width: SCREEN_WIDTH * 0.5 - vw(10),
    height: vh(90),
    borderRadius: vw(12),
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  label: {
    marginTop: vh(6),
    fontSize: vw(14),
    fontWeight: "500",
    color: COLORS.GRAY_DARK,
  },
});

export default React.memo(CategoryGridItem);
