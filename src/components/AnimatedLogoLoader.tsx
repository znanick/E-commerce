import React, { memo, useEffect, useRef, useState } from 'react';
import { Image, LayoutAnimation, View } from 'react-native';

import createStyles from '~/utils/styles/createStyles';

type Props = {
  visible: boolean;
};

const AnimatedLogoLoader: React.FC<Props> = ({ visible }) => {
  const interval = useRef<NodeJS.Timeout>();
  const [frameIndex, setFrameIndex] = useState(0);

  const animationFrames = [
    require('~/assets/img/LogoLoaderFrame1.png'),
    require('~/assets/img/LogoLoaderFrame2.png'),
    require('~/assets/img/LogoLoaderFrame3.png'),
  ];

  useEffect(() => {
    if (visible) {
      interval.current = setInterval(() => {
        LayoutAnimation.easeInEaseOut();

        setFrameIndex(prevIndex => (prevIndex + 1) % animationFrames.length);
      }, 250);
    }
    return () => clearInterval(interval.current);
  }, [visible]);

  return visible ? (
    <View style={styles.container}>
      <Image source={animationFrames[frameIndex]} style={styles.animationImage} />
    </View>
  ) : null;
};

const styles = createStyles(() => ({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationImage: {
    marginLeft: 10,
  },
}));

export default memo(AnimatedLogoLoader);
