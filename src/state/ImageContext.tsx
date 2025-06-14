
import React, {useState, useEffect} from 'react';
import {Image, View, ActivityIndicator, Pressable} from 'react-native';

type DynamicImageProps = {
  uri?: string;
  width?: number;
  onPress?: () => void;
};

const DynamicImage: React.FC<DynamicImageProps> = ({uri, width, onPress}) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const screenWidth = width ?? 300;

  useEffect(() => {
    if (!uri || !uri.includes('http')) {
      return;
    }

    setLoading(true);
    Image.getSize(
      uri,
      (imgWidth, imgHeight) => {
        const aspectRatio = imgHeight / imgWidth;
        const calculatedHeight = screenWidth * aspectRatio;
        setImageSize({width: screenWidth, height: calculatedHeight});
        setLoading(false);
      },
      error => {
        console.error('Image load error:', error);
        setLoading(false);
      },
    );
  }, [uri, screenWidth]);

  if (!uri || !imageSize) {
    return null;
  }

  const imageElement = (
    <Image
      source={{uri}}
      style={{
        width: imageSize.width,
        height: imageSize.height,
        resizeMode: 'contain',
      }}
    />
  );

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : onPress ? (
        <Pressable onPress={onPress}>
          {imageElement}
        </Pressable>
      ) : (
        imageElement
      )}
    </View>
  );
};

export default DynamicImage;
