type LengthOfString<S extends string, count extends any[] = [] > =
S extends `${infer F}${infer R}`
  ? LengthOfString<R, [F, ...count]>
  : count['length']

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
