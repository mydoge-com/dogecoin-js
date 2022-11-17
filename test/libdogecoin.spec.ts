import { expect } from 'chai'
import { truncate } from 'fs'
import * as dogecoin_js from '../dist'
import { DogecoinJS } from '../lib'

// Make a typed wrapper of our distributed bundle
const wrapper: DogecoinJS = dogecoin_js as DogecoinJS

describe('Test all wrapped interfaces', () => {
  it('generatePrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair()

    expect(pub.length).is.equal(34)
    expect(priv.length).is.equal(50)
  })

  it('generateHDMasterPubKeypair', async () => {
    const [priv, pub] = await wrapper.generateHDMasterPubKeypair()

    expect(pub.length).is.equal(34)
    expect(priv.length).is.equal(50)
  })

  it.skip('generateDerivedHDPubkey', async () => {
    const [priv] = await wrapper.generateHDMasterPubKeypair()
    const childKey = await wrapper.generateDerivedHDPubkey(priv)

    expect(priv.length).is.equal(50)
    expect(childKey.length).is.equal(34)
  })

  it.skip('verifyPrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair()
    const valid = await wrapper.verifyPrivPubKeypair(priv, pub)

    expect(valid).not.equal(0)
  })
})
