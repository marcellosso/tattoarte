import { useEffect, EffectCallback, DependencyList, useRef } from 'react';

/**
 * This hook gets called only when the dependencies change but not during initial render.
 *
 * @param {EffectCallback} effect The `useEffect` callback function.
 * @param {DependencyList} deps An array of dependencies.
 *
 * @example
 * ```
 *  useEffectWithoutFirst(()=>{
 *      alert("Dependency changed!");
 * },[dependency]);
 * ```
 */
export const useEffectWithoutFirst = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: void | (() => void | undefined) = () => {};

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect() as any;
    }

    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns;
    }
  }, deps);
};
