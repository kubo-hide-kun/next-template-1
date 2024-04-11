/**
 * @description 複数の型パラメーターを取り、それらを交差型（Intersection Type）にする
 */

export type Cross<T> = T extends [infer F, ...infer R] ? F & Cross<R> : unknown;
