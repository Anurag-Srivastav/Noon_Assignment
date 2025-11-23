import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { vw, vh } from '../utils/dimensions';
import { COLORS } from '../constants';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: string;
  iconSize?: number;
};

function CustomButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
  iconSize = vw(20),
}: Props) {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.DISABLED;
    switch (variant) {
      case 'primary':
        return COLORS.BLACK;
      case 'secondary':
        return COLORS.WHITE;
      case 'danger':
        return COLORS.BLACK;
      default:
        return COLORS.BLACK;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.WHITE} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <Icon name={icon} size={iconSize} color={COLORS.WHITE} style={styles.icon} />}
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: vh(14),
    paddingHorizontal: vw(20),
    borderRadius: vw(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.SHADOW,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: vw(6),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: vw(16),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default React.memo(CustomButton);
