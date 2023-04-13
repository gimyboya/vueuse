import type { Ref, ToRef } from 'vue-demi'
import { customRef, readonly, ref, toRef as vueToRef } from 'vue-demi'
import type { MaybeRefOrGetter } from '../utils'
import { noop } from '../utils'

/**
 * Normalize value/ref/getter to `ref` or `computed`.
 */
export function toRef<T>(r: MaybeRefOrGetter<T>): Ref<T>
export function toRef<T>(r: T): Ref<T>
export function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<T[K]>
export function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue: T[K]): ToRef<Exclude<T[K], undefined>>
export function toRef<T>(...args: any[]) {
  if (args.length !== 1)
    return vueToRef(...args as [any, any])
  const r = args[0]
  return typeof r === 'function'
    ? readonly(customRef(() => ({ get: r as any, set: noop })))
    : ref(r)
}

/**
 * @deprecated use `toRef` instead
 */
export const resolveRef = toRef
