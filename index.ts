import { TaskQueue } from '@beenotung/tslib/task/task-queue'
import { array, enums, literal, object, ParseResult, string } from 'cast.ts'

// zh_cn -> zh_hk
let zhTaskQueue = new TaskQueue()

let converterParser = enums([
  'Simplified', // 簡體化
  'Traditional', // 繁體化
  'China', // 中國化
  'Hongkong', // 香港化
  'Taiwan', // 台灣化
  'Pinyin', // 拼音化
  'Bopomofo', // 注音化
  'Mars', // 火星化
  'WikiSimplified', // 維基簡體化
  'WikiTraditional', // 維基繁體化
])

export type Converter = ParseResult<typeof converterParser>

let zhConvertResultParser = object({
  code: literal(0),
  data: object({
    converter: converterParser,
    text: string(),
    textFormat: literal('PlainText'),
    usedModules: array(string()),
  }),
  revisions: object({ build: string(), msg: string() }),
})

export type ConvertResult = ParseResult<typeof zhConvertResultParser>

export async function translateIntoTraditional(zh_cn: string): Promise<string> {
  if (zh_cn.trim() === '') return zh_cn
  let result = await translate({ text: zh_cn, converter: 'Traditional' })
  return result.data.text
}

export async function translateIntoSimplified(zh_hk: string): Promise<string> {
  if (zh_hk.trim() === '') return zh_hk
  let result = await translate({ text: zh_hk, converter: 'Simplified' })
  return result.data.text
}

export async function translate(input: { text: string; converter: Converter }) {
  let { text, converter } = input

  // use task queue to avoid overload the external service with concurrent requests
  return zhTaskQueue.runTask(() =>
    fetch('https://api.zhconvert.org/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, converter }),
    })
      .then(res => res.json())
      .then(json => zhConvertResultParser.parse(json)),
  )
}
