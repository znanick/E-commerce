import { patchProfileThunk } from '~/store/profile/profileThunks';
import { useMutation } from './useQuery';
import { showDefaultError } from '../helpers/errorUtils';
import { useAppDispatch } from './store';
import { ProfileType } from '~/store/profile/types';

type PatchProfileHookType = {
  onSuccess?: () => void;
} | void;

export const usePatchProfile = (args: PatchProfileHookType) => {
  const dispatch = useAppDispatch();

  const { mutate: patchProfile, isPending } = useMutation({
    mutationFn: (data: Partial<ProfileType>) => dispatch(patchProfileThunk(data)),
    onSuccess: args?.onSuccess,
    onError: showDefaultError,
  });

  return { patchProfile, isPending };
};
