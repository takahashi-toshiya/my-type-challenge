type KebabCase<S, Fst extends boolean = true> =
  S extends `${infer F}${infer R}`
    ? F extends Uppercase<F>
      ? F extends Lowercase<F>
        ? `${F}${KebabCase<R, false>}` // 英字でない: そのまま
        : Fst extends true
          ? `${Lowercase<F>}${KebabCase<R, false>}` // 先頭の大文字: ハイフンなしで小文字化
          : `-${Lowercase<F>}${KebabCase<R, false>}` // 先頭以外の大文字: ハイフン付けて小文字化
      : `${F}${KebabCase<R, false>}` // 小文字・その他
    : S

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]
