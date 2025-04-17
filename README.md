# zhconvert.ts

使用[繁化姬 API](https://docs.zhconvert.org) 轉換繁體中文／簡體中文

Convert traditional Chinese / simplified Chinese with [zhconvert.org API](https://docs.zhconvert.org)

[![npm Package Version](https://img.shields.io/npm/v/zhconvert.ts)](https://www.npmjs.com/package/zhconvert.ts)
[![Minified Package Size](https://img.shields.io/bundlephobia/min/zhconvert.ts)](https://bundlephobia.com/package/zhconvert.ts)
[![Minified and Gzipped Package Size](https://img.shields.io/bundlephobia/minzip/zhconvert.ts)](https://bundlephobia.com/package/zhconvert.ts)

## Features

- Convert between Simplified and Traditional Chinese
- Support multiple variants (Simplified, Traditional, China, Hong Kong, Taiwan, Pinyin, Bopomofo, etc.)
- Type-safe API response parsing with runtime validation
- Built-in request throttling to avoid overloading the API Server
- Isomorphic package: works in Node.js and browsers

## Installation

```bash
npm install zhconvert.ts
```

You can also install `zhconvert.ts` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

Basic usage with helper functions:

```typescript
import { translateIntoSimplified, translateIntoTraditional } from 'zhconvert.ts'

// Convert Simplified Chinese to Traditional Chinese
let zh_cn = '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干'
let result = await translateIntoTraditional(zh_cn)
// result: '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾'

// Convert Traditional Chinese to Simplified Chinese
let zh_hk = '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾'
let result2 = await translateIntoSimplified(zh_hk)
// result2: '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干'
```

Advanced usage with custom converter:

```typescript
import { translate, Converter } from 'zhconvert.ts'

// Convert to Hong Kong variant (note the difference in "什麼" vs "甚麼")
let result = await translate({
  text: '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干',
  converter: 'Hongkong',
})
// result.data.text: '幹，快乾杯，芒果乾好吃干他甚麼事，別干擾我吃芒果乾'

// Convert to Pinyin
let result2 = await translate({
  text: '干，快干杯，芒果干好吃干他什么事',
  converter: 'Pinyin',
})
// result2.data.text: 'gan1，kuai4 gan1 bei1，mang2 guo3 gan4 hao4 chi1 gan1 ta1 shen2 me5 shi4'
```

## Typescript Signature

```typescript
// 繁體化: Convert Simplified Chinese to Traditional Chinese
export function translateIntoTraditional(zh_cn: string): Promise<string>

// 簡體化: Convert Traditional Chinese to Simplified Chinese
export function translateIntoSimplified(zh_hk: string): Promise<string>

// 轉換至特定變體: Convert text to a specific variant
export function translate(input: {
  text: string
  converter: Converter
}): Promise<ConvertResult>

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

export type ConvertResult = {
  code: 0
  data: {
    converter: Converter
    text: string
    textFormat: 'PlainText'
    usedModules: string[]
  }
  revisions: {
    build: string
    msg: string
  }
}
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
