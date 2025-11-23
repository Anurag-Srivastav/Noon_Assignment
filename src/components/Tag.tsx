import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { vw, vh } from '../utils/dimensions';
import { COLORS } from '../constants';

interface TagProps {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Tag: React.FC<TagProps> = ({
  text,
  onPress,
  style,
  textStyle,
}) => {
  const containerStyle = [styles.container, style];
  const textStyleCombined = [styles.text, textStyle];

  if (onPress) {
    return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Text style={textStyleCombined}>{text}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      <Text style={textStyleCombined}>{text}</Text>
    </View>
  );
};

export default React.memo(Tag);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingHorizontal: vw(8),
    paddingVertical: vh(4),
    borderRadius: vw(10),
    alignSelf: 'flex-start',
    marginRight: vw(8),
    marginBottom: vh(8),
  },
  text: {
    fontSize: vw(13),
    color: COLORS.BLACK,
  },
});
