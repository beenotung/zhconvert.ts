import { expect } from 'chai'
import {
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
  let text = '記憶體不足！沒辦法在視訊聊天時播放影片。'

  it('should translate into Simplified variant (簡體化)', async () => {
    let result = await translate({ text, converter: 'Simplified' })
    expect(result).to.equal('记忆体不足！没办法在视讯聊天时播放影片。')
  })

  it('should translate into Traditional variant (繁體化)', async () => {
    let result = await translate({ text, converter: 'Traditional' })
    expect(result).to.equal('記憶體不足！沒辦法在視訊聊天時播放影片。')
  })

  it('should translate into China variant (中國化)', async () => {
    let result = await translate({ text, converter: 'China' })
    expect(result).to.equal('记忆体不足！没办法在视频聊天时播放视频。')
  })

  it('should translate into Hongkong variant (香港化)', async () => {
    let result = await translate({ text, converter: 'Hongkong' })
    expect(result).to.equal('記憶體不足！沒辦法在視訊聊天時播放影片。')
  })

  it('should translate into Taiwan variant (台灣化)', async () => {
    let result = await translate({ text, converter: 'Taiwan' })
    expect(result).to.equal('記憶體不足！沒辦法在視訊聊天時播放影片。')
  })

  it('should translate into Pinyin variant (拼音化)', async () => {
    let result = await translate({ text, converter: 'Pinyin' })
    expect(result).to.equal(
      'ji4 yi4 ti3 bu4 zu2！mei2 ban4 fa3 zai4 shi4 xun4 liao2 tian1 shi2 bo1 fang4 ying3 pian1。',
    )
  })

  it('should translate into Bopomofo variant (注音化)', async () => {
    let result = await translate({ text, converter: 'Bopomofo' })
    expect(result).to.equal(
      'ㄐㄧˋ ㄧˋ ㄊㄧˇ ㄅㄨˋ ㄗㄨˊ ！ ㄇㄟˊ ㄅㄢˋ ㄈㄚˇ ㄗㄞˋ ㄕˋ ㄒㄩㄣˋ ㄌㄧㄠˊ ㄊㄧㄢ ㄕˊ ㄅㄛˋ ㄈㄤˋ ㄧㄥˇ ㄆㄧㄢˋ 。',
    )
  })

  it('should translate into Mars variant (火星化)', async () => {
    let result = await translate({ text, converter: 'Mars' })
    expect(result).to.equal('記憶體ㄅ足！迷辦法在視訊聊天時播放影片。')
  })

  it('should translate into WikiSimplified variant (維基簡體化)', async () => {
    let result = await translate({ text, converter: 'WikiSimplified' })
    expect(result).to.equal('记忆体不足！没办法在视讯聊天时播放影片。')
  })

  it('should translate into WikiTraditional variant (維基繁體化)', async () => {
    let result = await translate({ text, converter: 'WikiTraditional' })
    expect(result).to.equal('記憶體不足！沒辦法在視訊聊天時播放影片。')
  })
})
