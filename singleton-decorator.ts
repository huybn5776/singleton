/**
 * Let service singleton that didn't "providedIn: 'root'".
 * Modify from https://github.com/keenondrums/singleton
 *
 * Note: Need "import 'reflect-metadata'" in polyfill.ts
 */
export function Singleton<T extends new (...args: any[]) => any>(classTarget: T) {
  const paramTypes = Reflect.getOwnMetadata('design:paramtypes', classTarget);

  // noinspection JSUnusedLocalSymbols
  return new Proxy(classTarget, {
    construct(target: Singleton<T>, argumentsList, newTarget) {
      // Skip proxy for children
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argumentsList, newTarget);
      }
      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget);
      }
      return target[SINGLETON_KEY];
    },
    // Proxy when getting any value on it. We need to let Angular DI know the original class's parameters.
    get(target: T, p: string | number | symbol, receiver: any): any {
      if (p === 'parameters') {
        return paramTypes;
      }
      return classTarget[p];
    },
  });
}

export const SINGLETON_KEY = Symbol();

export type Singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never
};
