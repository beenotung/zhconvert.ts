import { expect } from 'chai'
import {
  Converter,
  translate,
  translateIntoSimplified,
  translateIntoTraditional,
} from './index'

let zh_cn = '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干'
let zh_hk = '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾'

describe('translateIntoTraditional', () => {
  it('should translate zh_cn into zh_hk', async () => {
    let result = await translateIntoTraditional(zh_cn)
    expect(result).to.equal(zh_hk)
  })
})

describe('translateIntoSimplified', () => {
  it('should translate zh_hk into zh_cn', async () => {
    let result = await translateIntoSimplified(zh_hk)
    expect(result).to.equal(zh_cn)
  })
})

describe('translate to all variants', () => {
  let text = zh_cn

  async function test(converter: Converter) {
    let result = await translate({ text, converter })
    expect(result.data.converter).to.equal(converter)
    return result.data.text
  }

  it('should translate into Simplified variant (簡體化)', async () => {
    let result = await test('Simplified')
    expect(result).to.equal(zh_cn)
  })

  it('should translate into Traditional variant (繁體化)', async () => {
    let result = await test('Traditional')
    expect(result).to.equal(
      '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾',
    )
  })

  it('should translate into China variant (中國化)', async () => {
    let result = await test('China')
    expect(result).to.equal(
      '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干',
    )
  })

  it('should translate into Hongkong variant (香港化)', async () => {
    let result = await test('Hongkong')
    expect(result).to.equal(
      '幹，快乾杯，芒果乾好吃干他甚麼事，別干擾我吃芒果乾',
    )
  })

  it('should translate into Taiwan variant (台灣化)', async () => {
    let result = await test('Taiwan')
    expect(result).to.equal(
      '幹，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾',
    )
  })

  it('should translate into Pinyin variant (拼音化)', async () => {
    let result = await test('Pinyin')
    expect(result).to.equal(
      'gan1，kuai4 gan1 bei1，mang2 guo3 gan4 hao4 chi1 gan1 ta1 shen2 me5 shi4，bie2 gan1 rao3 wo3 chi1 mang2 guo3 gan4',
    )
  })

  it('should translate into Bopomofo variant (注音化)', async () => {
    let result = await test('Bopomofo')
    expect(result).to.equal(
      'ㄍㄢˋ ， ㄎㄨㄞˋ ㄍㄢ ㄅㄟ ， ㄇㄤˊ ㄍㄨㄛˇ ㄍㄢ ㄏㄠˋ ㄔ ㄍㄢ ㄊㄚ ㄕㄣˊ ㄇㄜ˙ ㄕˋ ， ㄅㄧㄝˊ ㄍㄢ ㄖㄠˇ ㄨㄛˇ ㄔ ㄇㄤˊ ㄍㄨㄛˇ ㄍㄢ',
    )
  })

  it('should translate into Mars variant (火星化)', async () => {
    let result = await test('Mars')
    let variants = [
      '幹，快乾杯，芒果乾毫ㄘ干ㄊ什ㄇ事，別干擾偶ㄘ芒果乾',
      '幹，快乾杯，芒果乾毫ㄘ干ㄊ什ㄇ事，別干擾窩ㄘ芒果乾',
    ]
    expect(variants).to.include(result)
  })

  it('should translate into WikiSimplified variant (維基簡體化)', async () => {
    let result = await test('WikiSimplified')
    expect(result).to.equal(
      '干，快干杯，芒果干好吃干他什么事，别干扰我吃芒果干',
    )
  })

  it('should translate into WikiTraditional variant (維基繁體化)', async () => {
    let result = await test('WikiTraditional')
    expect(result).to.equal(
      '干，快乾杯，芒果乾好吃干他什麼事，別干擾我吃芒果乾',
    )
  })
})
