import { CounterValueType } from '~/screens/Home/store/types';
import { NutrientsEditable } from '~/utils/nutrients/constants';

export type ProfileType = {
  phoneNumber: string | null;
  fullName: string;
  displayName?: string;
  id: string;
  email: string;
  stripeCustomerId: string;
  shopifySession: string | null;
  avatarUrl?: string;
  deviceToken?: string;
  height: number;
  weight: number;
  age: number;
  gender: Genders;
  activityLevel: ActivityLevel;
};

export type PreferenceType = {
  rank: 1 | 2 | 3;
};

export type UserNutritionPreferenceType = {
  calories: PreferenceType;
  carbs: PreferenceType;
  protein: PreferenceType;
};

export type UserNutritionType = {
  caloriesMax?: number | null;
  caloriesMin?: number | null;
  carbsMax?: number | null;
  carbsMin?: number | null;
  fatsMax?: number | null;
  fatsMin?: number | null;
  proteinMax?: number | null;
  proteinMin?: number | null;
  preference?: UserNutritionPreferenceType;
};

export type UserNutritionDTO = Record<NutrientsEditable, CounterValueType>;

export type UserNutritionImportanceType = {
  id: NutrientsEditable;
  disabled?: boolean;
};

export type UserNutritionRangesType = {
  min: number;
  max: number;
  step: number;
};

export type UserNutritionFormType = Record<NutrientsEditable, UserNutritionRangesType>;

export type NutrientsConfigItemType = UserNutritionRangesType & {
  values: CounterValueType;
  id: NutrientsEditable;
};

export type SecretsType = {
  userId: string;
  token?: string;
};

export type ProfileState = SecretsType & {
  userData: Record<string, never> | ProfileType;
  shopifyData: ShopifyDataType | null;
  userNutrients: UserNutritionType | null;
  isPswResetting: boolean;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
};

export type ShopifyDataType = {
  products: ShopifyProductType[];
};

type ShopifyProductType = {
  variants: ShopifyVariantType[];
};

type ShopifyVariantType = {
  id: number;
};

export enum Genders {
  MALE = 'male',
  FEMALE = 'female',
  NOT_RESPOND = 'not_respond',
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
  EXTREMELY_ACTIVE = 'extremely_active',
}

export type ActualAppVersionType = {
  requiredVer: string;
  latestVer: string;
};

export type ActualAppVersionsDTO = {
  android: ActualAppVersionType;
  ios: ActualAppVersionType;
};
