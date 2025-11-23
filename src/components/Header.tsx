import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";
import { vh, vw } from "../utils/dimensions";

type Props = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  rightBadgeCount?: number;
};

function Header({
  title = "",
  showBack = false,
  onBack,
  rightIcon,
  onRightPress,
  rightBadgeCount,
}: Props) {
  return (
    <View
      style={[
        styles.container
      ]}
    >
      <View style={styles.sideBox}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.touch}>
            <Icon name="chevron-back" size={26} color={COLORS.TEXT_SECONDARY} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.sideBox}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.touch}>
            <Icon name={rightIcon} size={24} color={COLORS.TEXT_SECONDARY} />
            {rightBadgeCount && rightBadgeCount > 0 ? (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{rightBadgeCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: vw(16),
    paddingBottom: vh(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sideBox: {
    width: vw(40),
    alignItems: "center",
    justifyContent: "center",
  },
  touch: {
    padding: vh(4),
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.TEXT_SECONDARY,
  },
  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -2,
    width: vw(16),
    height: vh(16),
    borderRadius:vw(8),
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: "700",
  },
});
