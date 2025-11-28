// Header component for FlatList
const Header = ({
  selectedCard,
  paymentMethods,
  renderPaymentMethod,
}: {
  selectedCard: string | null;
  paymentMethods: PaymentMethod[];
  renderPaymentMethod: ({
    item,
  }: {
    item: PaymentMethod;
  }) => React.ReactElement;
}) => (
  <View style={styles.listHeaderWrapper}>
    <Text style={styles.sectionTitle}>{LABELS.PAYMENT_METHOD}</Text>
    {!selectedCard && (
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>{LABELS.SELECT_PAYMENT_CARD}</Text>
      </View>
    )}
    <FlatList
      data={paymentMethods}
      keyExtractor={item => item.id.toString()}
      renderItem={renderPaymentMethod}
      scrollEnabled={false}
    />
    <View style={styles.itemsSection}>
      <Text style={styles.sectionTitle}>{LABELS.ORDER_ITEMS}</Text>
    </View>
  </View>
);

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderSummary from '../components/OrderSummary';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useCartItem } from '../hooks/useCartItem';
import { COLORS, LABELS, SCREENS } from '../constants';
import { useShimmer } from '../hooks/useShimmer';
import { vh, vw } from '../utils/dimensions';
import { getPaymentMethods, PaymentMethod } from '../domain';
import formatRupees from '../utils/formatAmount';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CartReviewScreen() {
  const { totalItems, cartItems, totalAmount } = useCartItem();
  const navigation = useNavigation<NavigationProp>();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const { renderShimmer } = useShimmer(SCREENS.CART_REVIEW);

  const handleSelectCard = (cardNumber: string) => {
    setSelectedCard(cardNumber);
  };

  const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleSelectCard(item.cardNumber)}
      style={[
        styles.cardOption,
        selectedCard === item.cardNumber && styles.cardOptionSelected,
      ]}
    >
      <View style={styles.cardContent}>
        <Icon
          name={item.cardIcon}
          size={vw(20)}
          color={selectedCard === item.cardNumber ? COLORS.WHITE : COLORS.BLACK}
        />
        <Text
          style={[
            styles.cardText,
            selectedCard === item.cardNumber && styles.cardTextSelected,
          ]}
        >
          {LABELS.CARD_ENDING} {item.cardNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }: { item: (typeof cartItems)[0] }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemName}>
        {item.product.name} × {item.quantity}
      </Text>
      <Text style={styles.itemPrice}>
        {formatRupees((item.product.price) * item.quantity)}
      </Text>
    </View>
  );

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const methods = await getPaymentMethods();
        setPaymentMethods(methods);
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethods();
  }, []);

  const placeOrder = () => {
    if (!selectedCard) return;

    const selectedMethod = paymentMethods.find(
      card => card.cardNumber === selectedCard,
    );
    if (!selectedMethod) return;

    // Calculate total with delivery fee and tax
    const deliveryFee = totalItems > 0 ? 40 : 0;
    const tax = Math.round(totalAmount * 0.18);
    const total = totalAmount + tax + deliveryFee;

    // Navigate to payment processing screen with payment data
    navigation.navigate(SCREENS.PAYMENT_PROCESSING, {
      cardNumber: selectedCard,
      amount: total,
      paymentMethodId: selectedMethod.id,
    } as never);
  };

  if (loading) {
    return renderShimmer();
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={LABELS.REVIEW_ORDER} />
      <FlatList
        data={cartItems}
        keyExtractor={item => item.product.id.toString()}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Header
            selectedCard={selectedCard}
            paymentMethods={paymentMethods}
            renderPaymentMethod={renderPaymentMethod}
          />
        }
        contentContainerStyle={styles.scrollContent}
      />
      <View style={styles.orderSummaryWrapper}>
        <OrderSummary />
      </View>
      <View style={styles.stickyFooter}>
        <CustomButton
          title={LABELS.PLACE_ORDER}
          onPress={placeOrder}
          disabled={totalItems === 0 || !selectedCard}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listHeaderWrapper: {
    paddingBottom: vh(10),
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: vw(16),
    // paddingBottom: vh(90),
  },
  sectionTitle: {
    fontSize: vw(18),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  warningBox: {
    backgroundColor: COLORS.WARNING_BG,
    padding: vw(12),
    borderRadius: vw(8),
    marginTop: vh(10),
    borderLeftWidth: vw(4),
    borderLeftColor: COLORS.WARNING_BORDER,
  },
  warningText: {
    color: COLORS.WARNING_TEXT,
    fontSize: vw(14),
  },
  cardOption: {
    marginTop: vh(10),
    padding: vw(14),
    borderWidth: vh(2),
    borderColor: COLORS.GRAY_LIGHT,
    borderRadius: vw(10),
    backgroundColor: COLORS.WHITE,
  },
  cardOptionSelected: {
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.BLACK,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: vw(10),
  },
  cardText: {
    fontSize: vw(15),
    color: COLORS.BLACK,
  },
  cardTextSelected: {
    color: COLORS.WHITE,
  },
  itemsSection: {
    marginTop: vh(20),
  },
  orderItem: {
    paddingVertical: vh(10),
    borderBottomWidth: vh(1),
    borderColor: COLORS.BORDER_LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: vw(15),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  itemPrice: {
    marginTop: vh(4),
    fontSize: vw(15),
    color: COLORS.BLACK,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    padding: vw(16),
    borderTopWidth: vh(1),
    borderTopColor: COLORS.BORDER_LIGHT,
    marginBottom: vh(20),
  },
  orderSummaryWrapper: {
    marginBottom: vh(65),
  },
});
