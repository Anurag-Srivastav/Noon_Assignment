import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { vh } from '../utils/dimensions';
import Title from './Title';
import ThreeCardItem from './ThreeCardItem';
import { Product } from '../data/products';

type Props = {
  title?: string;
  data: Product[];
};

function ThreeCardCarousel({title, data }: Props) {
  const renderItem = ({ item }: { item: Product }) => {
    return <ThreeCardItem item={{
      id: item.id,
      name: item.name,
      image: item.images[0],
      price: item.price,
      rating: item.rating,
    }} />;
  };

  return (
    <View>
      <Title>{title}</Title>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

export default React.memo(ThreeCardCarousel);

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: vh(16),
  },
});
