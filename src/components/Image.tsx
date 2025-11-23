import React from "react";
import FastImage, { FastImageProps } from "react-native-fast-image";

function Image(props: FastImageProps) {
  return (
    <FastImage
      {...props}
      resizeMode={props.resizeMode || FastImage.resizeMode.cover}
    />
  );
}

export default React.memo(Image);
