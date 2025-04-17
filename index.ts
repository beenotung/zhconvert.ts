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

export async function translateIntoTraditional(zh_cn: string): Promise<string> {
  return translate({ text: zh_cn, converter: 'Traditional' })
}

export async function translateIntoSimplified(zh_hk: string): Promise<string> {
  return translate({ text: zh_hk, converter: 'Simplified' })
}

export async function translate(input: { text: string; converter: Converter }) {
  let { text, converter } = input

  if (text.trim() === '') return text

  // use task queue to avoid overload the external service with concurrent requests
  return zhTaskQueue.runTask(() => {
    return fetch('https://api.zhconvert.org/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, converter }),
    })
      .then(res => res.json())
      .then(json => zhConvertResultParser.parse(json).data.text)
      .then(zh_hk => {
        return zh_hk
      })
  })
}
