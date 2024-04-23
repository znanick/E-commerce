import { MMKV } from 'react-native-mmkv';
import { KeysType, ValueType } from './types';

export class MMKVStorage {
  private storage = new MMKV();

  public reduxAdapter = {
    setItem: (key: KeysType, value: ValueType) => {
      this.setValue(key, value);
      return Promise.resolve(true);
    },
    getItem: (key: KeysType) => {
      const value = this.getValue(key);
      return Promise.resolve(value);
    },
    removeItem: (key: KeysType) => {
      this.delete(key);
      return Promise.resolve();
    },
  };

  getValue = (key: KeysType, forcedType = 'string'): ValueType | undefined => {
    if (!this.storage.contains(key)) return undefined;

    let result: any;

    if (!forcedType || forcedType === 'number') {
      result = this.storage.getNumber(key) as number;

      if (result) {
        return result;
      }
    }

    if (!forcedType || forcedType === 'boolean') {
      result = this.storage.getBoolean(key) as boolean;

      if (result) {
        return result;
      }
    }

    if (!forcedType || forcedType === 'string') {
      result = this.storage.getString(key);

      if (result) {
        return result;
      }
    }

    return undefined;
  };

  setValue = (key: KeysType, value: ValueType) => {
    this.storage.set(key, value);
  };

  clearAll = () => this.storage.clearAll();
  getAllKeys = () => this.storage.getAllKeys();
  delete = (key: string) => this.storage.delete(key);
}

export const mmkvStorage = new MMKVStorage();
