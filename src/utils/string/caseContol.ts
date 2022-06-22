import { forOwn, camelCase, snakeCase, isPlainObject } from 'lodash';

/**
 * @description Walk in deep over all keys of obj or array of objects and apply the cb to each key
 * @param {Object | Array} obj
 * @param {Function} cb - callback
 * @returns {Object | Array}
 */
export function walk<T>(obj: T | Array<T>, cb: Function): any {
  const x: any = Array.isArray(obj) ? [] : {};
  forOwn(obj, (v: any, k) => {
    // eslint-disable-next-line no-param-reassign
    if (isPlainObject(v) || Array.isArray(v)) v = walk(v, cb);
    x[cb(k)] = v;
  });

  return x;
}

/**
 * @description Converts all keys (deeply) of object to camelCase string
 * @param {Object} obj Object to convert its keys
 * @returns {Object} Object with keys in camelCase format
 */
export function toCamel<T>(obj: Object): T | undefined {
  if (!obj) return undefined;
  return walk(obj, (k: string) => camelCase(k));
}

/**
 * @description Converts all keys (deeply) of object to snakeCase string
 * @param {Object} obj Object to convert its keys
 * @returns {Object} Object with keys in snakeCase format
 */
export function toSnake<T>(obj: Object): T | undefined {
  if (!obj) return undefined;
  return walk(obj, (k: string) => snakeCase(k));
}
