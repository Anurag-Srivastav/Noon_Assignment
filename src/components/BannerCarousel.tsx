import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Image from "./Image";
import { vw } from "../utils/dimensions";
import { COLORS } from "../constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const H_PADDING = vw(12);
const DEFAULT_BANNER_WIDTH = SCREEN_WIDTH - vw(20) - H_PADDING * 2;
const DEFAULT_BANNER_HEIGHT = SCREEN_HEIGHT * 0.18; // 18% of screen height

type Props = {
  banners: string[];
  bannerWidth?: number;
  bannerHeight?: number;
  autoScroll?: boolean;
  noPadding?: boolean;
};

function BannerCarouselComponent({ 
  banners, 
  bannerWidth, 
  bannerHeight,
  autoScroll = true,
  noPadding = false,
}: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const activeIndexRef = useRef(0);  
  const [activeIndex, setActiveIndex] = useState(0);

  const BANNER_WIDTH = bannerWidth || DEFAULT_BANNER_WIDTH;
  const BANNER_HEIGHT = bannerHeight || DEFAULT_BANNER_HEIGHT;

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      let nextIndex = activeIndexRef.current + 1;

      if (nextIndex >= banners.length) nextIndex = 0;

      scrollRef.current?.scrollTo({
        x: nextIndex * (BANNER_WIDTH + vw(12)),
        animated: true,
      });

      activeIndexRef.current = nextIndex;
    }, 2000);

    return () => clearInterval(interval);
  }, [banners.length, BANNER_WIDTH, autoScroll]);


  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollX / (BANNER_WIDTH + vw(12)));

      if (index !== activeIndex) {
        setActiveIndex(index);
        activeIndexRef.current = index;
      }
    },
    [BANNER_WIDTH, activeIndex]
  );

  const renderBanner = useCallback(
    (banner: string, index: number) => (
      <Image
        key={index}
        source={{ uri: banner }}
        style={[styles.banner, { width: BANNER_WIDTH, height: BANNER_HEIGHT }]}
      />
    ),
    [BANNER_WIDTH, BANNER_HEIGHT]
  );

  return (
    <View style={[styles.container, { height: BANNER_HEIGHT + SCREEN_HEIGHT * 0.04 }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={noPadding ? undefined : styles.scrollContent}
        snapToInterval={BANNER_WIDTH + vw(H_PADDING)}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {banners.map(renderBanner)}
      </ScrollView>

      <View style={styles.dotContainer}>
        {banners.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

export default React.memo(BannerCarouselComponent); 

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.22, // 22% of screen height
  },
  scrollContent: {
    paddingHorizontal: H_PADDING,
  },
  banner: {
    borderRadius: vw(8),
    marginRight: vw(12),
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  dotContainer: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.015, // 1.5% of screen height
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    marginHorizontal: vw(4),
  },
  activeDot: {
    backgroundColor: COLORS.TEXT_SECONDARY,
    width: vw(10),
    height: vw(10),
  },
  inactiveDot: {
    backgroundColor: COLORS.GRAY_LIGHT,
  },
});
