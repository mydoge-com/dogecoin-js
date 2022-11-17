import { expect } from 'chai'
import { DogecoinJS } from '../dist'

// Make a typed wrapper of our distributed bundle
let wrapper: DogecoinJS

describe('Test all wrapped interfaces (mainnet)', () => {
  before(async () => {
    wrapper = await DogecoinJS.init()
  })

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

  it('generateDerivedHDPubkey', async () => {
    const [priv] = await wrapper.generateHDMasterPubKeypair()
    const pub = await wrapper.generateDerivedHDPubkey(priv)

    expect(pub.length).is.equal(34)
  })

  it('verifyPrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair()
    const valid = await wrapper.verifyPrivPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it('verifyHDMasterPubKeypair', async () => {
    const [priv, pub] = await wrapper.generateHDMasterPubKeypair()
    const valid = await wrapper.verifyHDMasterPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it('verifyPrivPubKeypair', async () => {
    const [, pub] = await wrapper.generatePrivPubKeypair()
    const valid = await wrapper.verifyP2pkhAddress(pub)

    expect(valid).not.equal(false)
  })
})

describe('Test all wrapped interfaces (testnet)', () => {
  it('generatePrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair(true)

    expect(pub.length).is.equal(34)
    expect(priv.length).is.equal(52)
  })

  it('generateHDMasterPubKeypair', async () => {
    const [priv, pub] = await wrapper.generateHDMasterPubKeypair(true)

    expect(pub.length).is.equal(34)
    expect(priv.length).is.gt(1)
    expect(priv.length).is.lt(200)
  })

  it('generateDerivedHDPubkey', async () => {
    const [priv] = await wrapper.generateHDMasterPubKeypair(true)
    const pub = await wrapper.generateDerivedHDPubkey(priv)

    expect(pub.length).is.equal(34)
  })

  it.skip('verifyPrivPubKeypair', async () => {
    const [priv, pub] = await wrapper.generatePrivPubKeypair(true)
    const valid = await wrapper.verifyPrivPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it.skip('verifyHDMasterPubKeypair', async () => {
    const [priv, pub] = await wrapper.generateHDMasterPubKeypair(true)
    const valid = await wrapper.verifyHDMasterPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it('verifyPrivPubKeypair', async () => {
    const [, pub] = await wrapper.generatePrivPubKeypair(true)
    const valid = await wrapper.verifyP2pkhAddress(pub)

    expect(valid).not.equal(false)
  })
})
