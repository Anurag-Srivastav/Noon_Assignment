import React, { useRef, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}>
        {/* Lottie Success Animation */}
        <LottieView
          ref={animationRef}
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          style={{
            width: 200,
            height: 200,
          }}
        />

        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          marginTop: 20,
          color: '#000',
        }}>
          Order Confirmed!
        </Text>

        <Text style={{
          fontSize: 16,
          color: '#666',
          marginTop: 8,
          textAlign: 'center',
        }}>
          Your order has been placed successfully
        </Text>
      </View>

      {/* Sticky Shop More Button */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginBottom: 20,
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.HOME)}
          style={{
            backgroundColor: '#000',
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
            Shop More
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
