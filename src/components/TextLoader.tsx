import React, { memo } from 'react';
import ContentLoader, { IContentLoaderProps, Rect } from 'react-content-loader/native';

import useTheme from '~/utils/hooks/useTheme';

type Props = IContentLoaderProps;

const TextLoader: React.FC<Props> = props => {
  const { colors } = useTheme();

  const { width = 50, height = 10 } = props;

  return (
    <ContentLoader
      height={height}
      width={width}
      foregroundColor={colors.textMinor}
      backgroundColor={colors.secondary}
      {...props}
    >
      <Rect x="0" y="0" rx="3" ry="3" width={width} height={height} />
    </ContentLoader>
  );
};

export default memo(TextLoader);
