import React, { useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { vh, vw } from '../utils/dimensions';
import { COLORS } from '../constants';

type Props = {
  value?: string;
  iconName?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onPressIcon?: () => void;
  placeholder?: string;
  editable?: boolean;
  style?: object;
};

const SearchBar = ({
  value = '',
  onChangeText,
  onPress,
  onPressIcon,
  iconName,
  placeholder = 'Search...',
  editable = true,
  style = {},
}: Props) => {
  const showClear = Boolean(value);

  const handleClear = useCallback(() => {
    onChangeText?.('');
  }, [onChangeText]);

  const Wrapper = editable ? View : Pressable;
  const wrapperProps = editable ? {} : { onPress };

  return (
    <Wrapper style={[styles.container, style]} {...wrapperProps}>
      <Pressable onPress={onPressIcon}>
        <Icon
          name={iconName || 'search-outline'}
          size={vw(20)}
          color={COLORS.GRAY_MEDIUM}
          style={styles.leftIcon}
        />
      </Pressable>

      <TextInput
        style={styles.input}
        editable={editable}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_LIGHTER}
        {...(!editable ? { pointerEvents: 'none' } : { autoFocus: true })}
      />

      {showClear && editable && (
        <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
          <Icon name="close-circle" size={vw(18)} color={COLORS.TEXT_LIGHTER} />
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: vw(12),
    paddingVertical: vh(10),
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    borderRadius: vw(20),
    height: vh(50),
    alignItems: 'center',
    margin: vw(16),
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHTER,
  },
  input: {
    flex: 1,
    paddingLeft: vw(4),
    fontSize: vw(16),
    color: COLORS.BLACK,
    includeFontPadding: false,
  },
  leftIcon: {
    marginRight: vw(6),
  },
  clearBtn: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(4),
  },
});
