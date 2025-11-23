import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useToast } from "../context/ToastContext";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cart/cartSlice";
import { SCREENS, COLORS, LABELS, ANIMATION, SPACING, FONT_SIZES, FONT_WEIGHTS } from "../constants";
import { processPaymentRequest } from "../domain";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PaymentProcessingRouteProp = RouteProp<RootStackParamList, "PaymentProcessing">;

export default function PaymentProcessingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaymentProcessingRouteProp>();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { cardNumber, amount, paymentMethodId } = route.params;

  useEffect(() => {
    const handlePayment = async () => {
      try {
        // Call the domain layer to process payment
        const result = await processPaymentRequest(cardNumber, amount, paymentMethodId);
        
        if (result.success) {
          // Clear cart on success
          dispatch(clearCart());
          // Navigate to confirmation screen
          navigation.navigate(SCREENS.CONFIRMATION);
        } else {
          // Navigate back to CartReview on failure
          navigation.goBack();
          
          // Show error toast after navigation
          setTimeout(() => {
            showToast(
              result.message || "Payment failed. Please try again.",
              "error",
              4000
            );
          }, 300);
        }
      } catch (error) {
        console.error('Payment processing error:', error);
        navigation.goBack();
        setTimeout(() => {
          showToast(
            "An error occurred during payment processing. Please try again.",
            "error",
            4000
          );
        }, 300);
      }
    };

    handlePayment();
  }, [navigation, showToast, dispatch, cardNumber, amount, paymentMethodId]);

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/animations/timer.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <Text style={styles.text}>{LABELS.PROCESSING_PAYMENT}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    width: ANIMATION.CONTAINER_SIZE,
    height: ANIMATION.CONTAINER_SIZE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.MARGIN_BOTTOM_SMALL,
  },
  lottie: {
    width: ANIMATION.LOTTIE_SIZE,
    height: ANIMATION.LOTTIE_SIZE,
  },
  text: {
    marginTop: ANIMATION.TEXT_MARGIN_TOP,
    fontSize: FONT_SIZES.XLARGE,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.BLACK,
  },
});
