import React, { useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, LABELS } from "../constants";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants";

export default function ConfirmationScreen() {
  const navigation = useNavigation();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Auto-play animation on mount
    animationRef.current?.play();
  }, []);

  const handleShopMore = () => {
    navigation.navigate(SCREENS.HOME as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        {/* Lottie Success Animation */}
        <LottieView
          ref={animationRef}
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
        <Text style={styles.title}>{LABELS.ORDER_CONFIRMED}</Text>
        <Text style={styles.subtitle}>{LABELS.PAYMENT_SUCCESSFUL}</Text>
      </View>
      {/* Sticky Shop More Button */}
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity
          onPress={handleShopMore}
          style={styles.shopMoreButton}
        >
          <Text style={styles.shopMoreText}>{LABELS.CONTINUE_SHOPPING}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: COLORS.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_LIGHT,
    marginTop: 8,
    textAlign: 'center',
  },
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_LIGHT,
    marginBottom: 20,
  },
  shopMoreButton: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  shopMoreText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
});
