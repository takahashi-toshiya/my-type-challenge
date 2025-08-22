type PercentageParser<A extends string> =
  // ① 末尾 %
  A extends `${infer Body}%`
    ? [...PercentageParser<Body>] extends [infer S, infer N, any]
        ? [S, N, '%']
        : never
    // ② 先頭符号
    : A extends `${infer F}${infer R}`
      ? F extends '+' | '-'
        ? PercentageParser<R> extends [any, infer N, infer P]
          ? [F, N, P] // 符号を置き換え、残りは数値・%
          : never
        : ['', A, '']
      // ③ 空文字
      : ['', '', '']

import type { Equal, Expect } from '@type-challenges/utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]
