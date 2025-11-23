import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { vw, vh } from '../utils/dimensions';
import { COLORS, ICONS } from '../constants';

type Props = {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
  titleAlignment?: 'left' | 'center';
};

function CustomHeader({
  title,
  showBackButton = true,
  onBackPress,
  rightIcon,
  onRightIconPress,
  titleAlignment = 'left',
}: Props) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && titleAlignment === 'left' ? (
          <TouchableOpacity 
            onPress={handleBackPress} 
            style={styles.leftTouchable}
          >
            <Icon name={ICONS.CHEVRON_BACK} size={24} color={COLORS.BLACK} />
            <Text style={styles.titleLeft}>{title}</Text>
          </TouchableOpacity>
        ) : showBackButton ? (
          <TouchableOpacity onPress={handleBackPress} style={styles.iconButton}>
            <Icon name={ICONS.CHEVRON_BACK} size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
        ) : null}
      </View>

      {titleAlignment === 'center' && (
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        {rightIcon && onRightIconPress && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconButton}>
            <Icon name={rightIcon} size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vh(70),
    paddingHorizontal: vw(8),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || vh(25) : 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: vw(12),
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: vw(1),
  },
  leftTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: vw(1),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  titleLeft: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginLeft: vw(2),
  },
});

export default React.memo(CustomHeader);
