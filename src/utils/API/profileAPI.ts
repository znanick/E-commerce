import { AxiosResponse } from 'axios';
import {
  ActualAppVersionsDTO,
  ProfileType,
  ShopifyDataType,
  UserNutritionType,
} from '~/store/profile/types';
import { baseApiClient, BaseClient } from '~/utils/API/baseClient';

export type UploadAvatarGto = {
  uri: string;
  type: string;
};

export class ProfileAPI {
  constructor(private api: BaseClient) {}

  getProfile = async (id: string) => {
    const result: AxiosResponse<ProfileType> = await this.api.get(`/user/${id}`);

    return result.data;
  };

  patchProfile = async (id: string, data: Partial<ProfileType>) => {
    const result: AxiosResponse<ProfileType> = await this.api.patch(`/user/${id}`, data);

    return result.data;
  };

  deleteProfile = async (id: string) => {
    const result: AxiosResponse<ProfileType> = await this.api.delete(`/user/${id}`);

    return result.data;
  };

  getShopifyProducts = async () => {
    const result: AxiosResponse<ShopifyDataType> = await this.api.get(`/shopify/products`);

    return result.data;
  };

  getUserNutrients = async (id: string) => {
    const result: AxiosResponse<UserNutritionType> = await this.api.get(`/nutrition/user/${id}`);

    return result.data;
  };

  createUserNutrients = async (data: UserNutritionType) => {
    const result: AxiosResponse<UserNutritionType> = await this.api.post(`/nutrition`, data);

    return result.data;
  };

  editUserNutrients = async (data: Partial<UserNutritionType> & { userId: string }) => {
    const result: AxiosResponse<UserNutritionType> = await this.api.patch(`/nutrition/me`, data);

    return result.data;
  };

  deleteAvatar = async () => {
    const result: AxiosResponse<void> = await this.api.delete(`/user/avatar`);

    return result.data;
  };
  uploadAvatar = async ({ uri, type }: UploadAvatarGto) => {
    const formData = new FormData();

    formData.append(
      'file',
      JSON.parse(
        JSON.stringify({
          uri,
          type: type,
          name: `image.${type.split('/')[1]}`,
        }),
      ),
    );

    const result: AxiosResponse<{ url: string }> = await this.api.post(`/user/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result.data;
  };

  getActualAppVersions = async () => {
    const result: AxiosResponse<ActualAppVersionsDTO> = await this.api.get(`/version-history`);

    return result.data;
  };

  checkServerStatus = async () => {
    const result: AxiosResponse<ActualAppVersionsDTO> = await this.api.get(
      `/version-history`,
      undefined,
      { unhandled: true },
    );

    return !!result.data;
  };
}

export const profileAPI = new ProfileAPI(baseApiClient);
