import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Text from '~/components/Text';
import { RootStackParams, Routes } from '~/navigation/routes';
import { setPreviewShown } from '~/store/onboardingStates/onboardingStatesReducer';
import withScreenWrapper from '~/utils/hocs/withScreenWrapper';
import { useAppDispatch } from '~/utils/hooks/store';
import useNavigation from '~/utils/hooks/useNavigation';
import createStyles from '~/utils/styles/createStyles';
import previewConfig, { PreviewConfigType } from '../utils/previewConfig';

const PreviewModal: React.FC<
  NativeStackScreenProps<RootStackParams, Routes.PREVIEW_MODAL>
> = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const { goBack } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSkip = () => {
    dispatch(setPreviewShown(true));
    goBack();
  };

  const renderItem = useCallback(
    ({ item }: { item: PreviewConfigType }) => {
      return (
        <View style={styles.itemWrapper}>
          <Image source={item.img} />

          <View style={styles.textWrapper}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      );
    },
    [previewConfig],
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={width}
        height={height - 200}
        data={previewConfig}
        scrollAnimationDuration={500}
        onSnapToItem={setCurrentIndex}
        renderItem={renderItem}
      />

      <View style={[styles.bottomBlock, { marginBottom: bottom + 12 }]}>
        <View style={styles.pagination}>
          {previewConfig.map((_, index) => (
            <View key={index} style={[styles.dot, index === currentIndex && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity style={styles.actionTextWrapper} onPress={handleSkip}>
          <Text style={styles.actionText}>{t('preview.skip')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  itemWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  textWrapper: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 21,
  },

  bottomBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.text,
  },
  actionTextWrapper: {
    position: 'absolute',
    right: 12,
  },
  actionText: {},
}));

export default withScreenWrapper(PreviewModal);
