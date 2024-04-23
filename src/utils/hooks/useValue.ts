import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';

type ValueType = string;
type ReturnType<T = TextInput> = [
  value: ValueType,
  setValue: (value: ValueType) => void,
  error: ValueType,
  setError: (value: ValueType) => void,
  ref: React.RefObject<T>,
];

function useInputValue<T = TextInput>(
  initialValue: ValueType,
  initialError?: ValueType,
): ReturnType<T> {
  const ref = useRef<T>(null);

  const [value, setValue] = useState<ValueType>(initialValue);
  const [error, setError] = useState<ValueType>(initialError || '');

  const handleValueChange = useCallback((value: ValueType) => {
    setValue(value);
    setError('');
  }, []);

  return [value, handleValueChange, error, setError, ref];
}

export default useInputValue;
