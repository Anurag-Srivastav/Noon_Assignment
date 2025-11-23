import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { vw, vh } from '../utils/dimensions';
import { COLORS } from '../constants';

type Props = {
  rating: number;
  size?: number;
  showRatingText?: boolean;
  style?: ViewStyle;
  starStyle?: TextStyle;
};

function StarRating({ 
  rating, 
  size = 10, 
  showRatingText = false,
  style,
  starStyle,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text
          key={star}
          style={[
            styles.star,
            { fontSize: size },
            star > Math.floor(rating) && styles.emptyStar,
            starStyle,
          ]}
        >
          ⭐
        </Text>
      ))}
      {showRatingText && (
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: COLORS.YELLOW,
  },
  emptyStar: {
    opacity: 0.3,
  },
  ratingText: {
    fontSize: vw(12),
    color: COLORS.GRAY_MEDIUM,
    marginLeft: vw(6),
  },
});

export default React.memo(StarRating);
