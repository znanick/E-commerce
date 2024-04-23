import i18next from '~/utils/localisation';

const { t } = i18next;

export type PreviewConfigType = {
  img: number;
  title: string;
  text: string;
};

export default [
  {
    img: require('~/assets/img/preview/PreviewImg1.png'),
    title: t('preview.title1'),
    text: t('preview.text1'),
  },
  {
    img: require('~/assets/img/preview/PreviewImg2.png'),
    title: t('preview.title2'),
    text: t('preview.text2'),
  },
  {
    img: require('~/assets/img/preview/PreviewImg3.png'),
    title: t('preview.title3'),
    text: t('preview.text3'),
  },
];
