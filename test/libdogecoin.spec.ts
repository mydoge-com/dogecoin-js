import { expect } from 'chai'
import * as dogecoin_js from '../dist'

describe('Test all wrapped interfaces', () => {
  it('generatePrivPubKeypair', async () => {
    const [pub, priv] = await dogecoin_js.generatePrivPubKeypair()

    expect(pub).length.gt(0)
    expect(priv).length.gt(0)
  })
})
