import { expect } from 'chai'

import * as dogecoin_js from '../dist'
import { DogecoinJS } from '../lib'

// Make a typed wrapper of our distributed bundle
const wrapper: DogecoinJS = dogecoin_js as DogecoinJS

describe('Test all wrapped interfaces', () => {
  it('generatePrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair()

    expect(pub.length).is.equal(34)
    expect(priv.length).is.equal(52)
  })

  it('generateHDMasterPubKeypair', async () => {
    const [priv, pub] = await wrapper.generateHDMasterPubKeypair()

    expect(pub.length).is.equal(34)
    expect(priv.length).is.gt(1)
    expect(priv.length).is.lt(200)
  })

  it.skip('generateDerivedHDPubkey', async () => {
    const [priv] = await wrapper.generateHDMasterPubKeypair()
    const pub = await wrapper.generateDerivedHDPubkey(priv)

    expect(priv.length).is.gt(1)
    expect(priv.length).is.lt(200)
    expect(pub.length).is.equal(34)
  })

  it.skip('verifyPrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair()
    const valid = await wrapper.verifyPrivPubKeypair(priv, pub)

    expect(valid).not.equal(0)
  })
})
