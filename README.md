# zhconvert.ts

使用[繁化姬 API](https://docs.zhconvert.org) 轉換繁體中文／簡體中文

Convert traditional Chinese / simplified Chinese with [zhconvert.org API](https://docs.zhconvert.org)

[![npm Package Version](https://img.shields.io/npm/v/zhconvert.ts)](https://www.npmjs.com/package/zhconvert.ts)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/zhconvert.ts)](https://bundlephobia.com/package/zhconvert.ts)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/zhconvert.ts)](https://bundlephobia.com/package/zhconvert.ts)

## Features

- Typescript support
- Isomorphic package: works in Node.js and browsers

## Installation

```bash
npm install zhconvert.ts
```

You can also install `zhconvert.ts` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { translateIntoSimplified, translateIntoTraditional } from 'zhconvert.ts'

// Convert Simplified Chinese to Traditional Chinese (HK)
let zh_cn = '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干'
let result = await translateIntoTraditional(zh_cn)
// result: '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾'

// Convert Traditional Chinese to Simplified Chinese
let zh_hk = '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾'
let result2 = await translateIntoSimplified(zh_hk)
// result2: '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干'

// Advanced usage with custom converter
import { translate, Converter } from 'zhconvert.ts'
await translate({
  text: '你好',
  converter: 'Taiwan', // Convert to Taiwan style
})
```

## Typescript Signature

```typescript
// 繁體化: Convert Simplified Chinese to Traditional Chinese
export function translateIntoTraditional(zh_cn: string): Promise<string>

// 簡體化: Convert Traditional Chinese to Simplified Chinese
export function translateIntoSimplified(zh_hk: string): Promise<string>

// Convert to other styles
export function translate(input: {
  text: string
  converter: Converter
}): Promise<string>

export type Converter =
  | 'Simplified' // 簡體化
  | 'Traditional' // 繁體化
  | 'China' // 中國化
  | 'Hongkong' // 香港化
  | 'Taiwan' // 台灣化
  | 'Pinyin' // 拼音化
  | 'Bopomofo' // 注音化
  | 'Mars' // 火星化
  | 'WikiSimplified' // 維基簡體化
  | 'WikiTraditional' // 維基繁體化
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
