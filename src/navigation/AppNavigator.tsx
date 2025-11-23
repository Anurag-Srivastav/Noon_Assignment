import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import CartReviewScreen from "../screens/CartReviewScreen";
import PaymentProcessingScreen from "../screens/PaymentProcessingScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import { SCREENS } from "../constants";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  CartReview: undefined;
  PaymentProcessing: { 
    cardNumber: string;
    amount: number;
    paymentMethodId: string;
  };
  Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.HOME}>
        {/* Home */}
        <Stack.Screen
          name={SCREENS.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Search */}
        <Stack.Screen
          name={SCREENS.SEARCH}
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        {/* Product Details */}
        <Stack.Screen
          name={SCREENS.PRODUCT_DETAILS}
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />

        {/* Cart */}
        <Stack.Screen
          name={SCREENS.CART}
          component={CartScreen}
          options={{ headerShown: false }}
        />

        {/* Checkout Review */}
        <Stack.Screen
          name={SCREENS.CART_REVIEW}
          component={CartReviewScreen}
          options={{ headerShown: false }}
        />

        {/* Payment Processing */}
        <Stack.Screen
          name={SCREENS.PAYMENT_PROCESSING}
          component={PaymentProcessingScreen}
          options={{ headerShown: false }}
        />

        {/* Confirmation */}
        <Stack.Screen
          name={SCREENS.CONFIRMATION}
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
