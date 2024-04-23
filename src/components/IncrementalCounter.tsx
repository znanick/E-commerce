import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MinusIcon from '~/assets/svg/MinusIcon';
import PlusIcon from '~/assets/svg/PlusIcon';
import Text from '~/components/Text';
import { CounterValueType } from '~/screens/Home/store/types';
import { NutrientsConfigItemType } from '~/store/profile/types';
import { getNutrientTitle, getNutrientUnit } from '~/utils/nutrients/helpers';

import createStyles from '~/utils/styles/createStyles';

type Props = NutrientsConfigItemType & {
  onValueChange?: (value: CounterValueType) => void;
  style: any;
  disabled?: boolean;
};

const IncrementalCounter: React.FC<Props> = ({
  values,
  step = 10,
  onValueChange,
  style,
  min,
  max,
  disabled,
  id,
}) => {
  const handleDecrement = () => {
    let firstsValue = values.first - step;
    let secondValue = values.second - step;

    if (secondValue <= min) {
      firstsValue = min;
      secondValue = min + step;
    }

    onValueChange?.({ first: firstsValue, second: secondValue });
  };

  const handleIncrement = () => {
    let firstsValue = values.first + step;
    let secondValue = values.second + step;

    if (secondValue >= max) {
      secondValue = max;
      firstsValue = max - step;
    }

    onValueChange?.({ first: firstsValue, second: secondValue });
  };

  return (
    <View style={[styles.container, disabled && styles.disabledContainer, style]}>
      <TouchableOpacity onPress={handleDecrement} disabled={disabled}>
        <MinusIcon />
      </TouchableOpacity>

      <View>
        <Text style={styles.label}>{getNutrientTitle(id)}</Text>

        <Text style={styles.value}>{`${values.first}-${values.second}${getNutrientUnit(id)}`}</Text>
      </View>

      <TouchableOpacity onPress={handleIncrement} disabled={disabled}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = createStyles(({ colors }) => ({
  container: {
    width: '100%',
    height: 64,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  disabledContainer: {
    opacity: 0.5,
  },

  label: {
    color: colors.textMinor,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  value: {
    textAlign: 'center',
    fontWeight: '600',
  },
}));

export default memo(IncrementalCounter);
