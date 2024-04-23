import { useTranslation } from 'react-i18next';
import { ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import Toast from '~/components/ToastMessage';
import { Routes } from '~/navigation/routes';
import useNavigation from '~/utils/hooks/useNavigation';
import { profileAPI, UploadAvatarGto } from '../API/profileAPI';
import { MAX_AVATAR_SIZE, MediaPickerType } from '../helpers/constants';
import { showDefaultError } from '../helpers/errorUtils';
import { usePatchProfile } from './useProfile';
import { useMutation } from './useQuery';

const IMAGE_PICKER_OPTIONS: ImageLibraryOptions = { mediaType: 'photo' };

export default function useUploadAvatar() {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const { mutate: selectAvatar, isPending: isSelecting } = useMutation({
    mutationFn: (mediaType: MediaPickerType) =>
      mediaType === MediaPickerType.GALLERY
        ? launchImageLibrary(IMAGE_PICKER_OPTIONS)
        : launchCamera(IMAGE_PICKER_OPTIONS),

    onSuccess: async res => {
      const { type, uri, fileSize } = res.assets?.[0] || {};

      if (!!fileSize && fileSize > MAX_AVATAR_SIZE) {
        Toast.show({ type: 'error', message: t('profile.avatarMaxSizeError') });
        return;
      }

      if (!type || !uri) return;

      deleteAvatar({ uri, type });
    },
  });

  const onDelete = (_: void, variables: UploadAvatarGto) => {
    uploadAvatar(variables);
  };

  const { mutate: deleteAvatar, isPending: isDeleting } = useMutation({
    mutationFn: () => profileAPI.deleteAvatar(),
    onSuccess: onDelete,
    onError: onDelete,
  });

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    mutationFn: profileAPI.uploadAvatar,
    onSuccess: res => {
      patchProfile({ avatarUrl: res.url });
    },
    onError: showDefaultError,
  });

  const { patchProfile, isPending: isPatching } = usePatchProfile();

  const handleOpenMediaTypePicker = () => {
    navigate(Routes.MEDIA_TYPE_MODAL, { onSelect: selectAvatar });
  };

  return {
    selectAvatar: handleOpenMediaTypePicker,
    isPending: isSelecting || isDeleting || isUploading || isPatching,
  };
}
