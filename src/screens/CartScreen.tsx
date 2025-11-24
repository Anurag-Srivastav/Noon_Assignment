
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItemGrid from "../components/CartItemGrid";
import OrderSummary from "../components/OrderSummary";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { SCREENS, LABELS, COLORS, ICONS, DELIVERY } from "../constants";
import { useShimmer } from "../hooks/useShimmer";
import { vh, vw } from "../utils/dimensions";
import { getCartData } from "../domain";

// DeliveryHeader component to remove inline styles
const DeliveryHeader = React.memo(function DeliveryHeader({ deliveryMinutes }: { deliveryMinutes: number }) {
  return (
    <View style={styles.deliveryHeader}>
      <Icon name={ICONS.FLASH} size={18} color={COLORS.BLACK} />
      <Text style={styles.deliveryText}>
        {LABELS.DELIVERY_IN} {deliveryMinutes} {LABELS.MINUTES}
      </Text>
    </View>
  );
});


export default function CartScreen() {
  const items = useSelector((state: RootState) => state.cart.items);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const { renderShimmer } = useShimmer(SCREENS.CART);

  useEffect(() => {
    const loadCart = async () => {
      try {
        await getCartData();
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  // Memoize random delivery time between 8-15 minutes for each render
  const deliveryMinutes = React.useMemo(() => {
    return Math.floor(Math.random() * (DELIVERY.MAX_MINUTES - DELIVERY.MIN_MINUTES + 1)) + DELIVERY.MIN_MINUTES;
  }, []);

  const renderItem = ({ item }: { item: typeof items[number] }) => (
    <CartItemGrid item={item} />
  );

  const handleContinueShopping = () => {
    navigation.navigate(SCREENS.HOME);
  };

  const handlePayAndPlaceOrder = () => {
    navigation.navigate(SCREENS.CART_REVIEW);
  };

  if (loading) {
    return renderShimmer();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader title={LABELS.YOUR_CART} />
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            <Icon name={ICONS.CART} size={80} color={COLORS.BLACK} />
            <Text style={styles.emptyText}>{LABELS.EMPTY_CART}</Text>
          </View>

          <View style={styles.emptyFooter}>
            <CustomButton
              title={LABELS.CONTINUE_SHOPPING}
              onPress={handleContinueShopping}
            />
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<DeliveryHeader deliveryMinutes={deliveryMinutes} />}
            ListFooterComponent={<View style={styles.footerSpacer} />}
          />

          <View style={styles.footer}>
            <OrderSummary />
            <View style={styles.checkoutBtn}>
              <CustomButton
                title={LABELS.PAY_AND_PLACE_ORDER}
                onPress={handlePayAndPlaceOrder}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },

  /* Empty State */
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  emptyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: vh(16),
  },
  emptyText: {
    fontSize: vw(18),
    fontWeight: "600",
    color: COLORS.GRAY_DARK,
  },
  emptyFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: vw(16),
    paddingVertical: vh(12),
    paddingBottom: vh(20),
    borderTopWidth: vh(1),
    borderTopColor: COLORS.BORDER_LIGHT,
  },

  /* List Grid Layout */
  listContent: {
    paddingHorizontal: vw(16),
    paddingBottom: vh(24),
  },

  deliveryHeader: {
    paddingVertical: vh(8),
    paddingHorizontal: vw(12),
    marginBottom: vh(20),
    borderRadius: vw(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(6),
  },
  deliveryText: {
    fontSize: vw(14),
    fontWeight: '700',
    color: COLORS.BLACK,
  },

  footerSpacer: {
    height: vh(220),
  },

  /* Footer Summary + Checkout */
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: vh(1),
    borderColor: COLORS.BORDER_LIGHT,
  },
  checkoutBtn: {
    paddingHorizontal: vw(16),
    paddingVertical: vh(12),
    marginBottom: vh(20),
  },
});
