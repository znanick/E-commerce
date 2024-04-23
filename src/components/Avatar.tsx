import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import PenIcon from '~/assets/svg/PenIcon';
import PlusIcon from '~/assets/svg/PlusIcon';
import useUploadAvatar from '~/utils/hooks/useUploadAvatar';
import createStyles from '~/utils/styles/createStyles';

import FastImage from './FastImage';
import Loader from './Loader';

type Props = {
  url?: string;
};

const Avatar: React.FC<Props> = ({ url }) => {
  const { selectAvatar, isPending } = useUploadAvatar();

  const handleSelectPhoto = () => {
    selectAvatar();
  };

  return (
    <View style={styles.container}>
      {!url ? (
        <TouchableOpacity
          style={styles.emptyBlock}
          onPress={handleSelectPhoto}
          disabled={isPending}
        >
          {isPending ? <Loader /> : <PlusIcon />}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.photoContainer}
          activeOpacity={0.8}
          onPress={handleSelectPhoto}
          disabled={isPending}
        >
          <FastImage url={url} style={styles.photo} />

          <View style={styles.editBlock}>{isPending ? <Loader /> : <PenIcon />}</View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    backgroundColor: colors.border,
    borderRadius: 50,
    width: 80,
    height: 80,
  },

  emptyBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoContainer: {
    flex: 1,
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  editBlock: {
    width: 32,
    height: 32,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    top: -5,
  },
}));

export default memo(Avatar);
