import { expect } from 'chai'
import { DogecoinJS } from '../dist'

// Make a typed wrapper of our distributed bundle
let wrapper: DogecoinJS

describe('Test all address interfaces (mainnet)', () => {
  before(async () => {
    wrapper = await DogecoinJS.init()
  })

  it('generatePrivPubKeypair', () => {
    const [priv, pub] = wrapper.generatePrivPubKeypair()

    expect(pub.length).is.equal(34)
    expect(priv.length).is.equal(52)
  })

  it('generateHDMasterPubKeypair', () => {
    const [priv, pub] = wrapper.generateHDMasterPubKeypair()

    expect(pub.length).is.equal(34)
    expect(priv.length).is.gt(1)
    expect(priv.length).is.lt(200)
  })

  it('generateDerivedHDPubkey', () => {
    const [priv] = wrapper.generateHDMasterPubKeypair()
    const pub = wrapper.generateDerivedHDPubkey(priv)

    expect(pub.length).is.equal(34)
  })

  it('verifyPrivPubKeypair', () => {
    const [priv, pub] = wrapper.generatePrivPubKeypair()
    const valid = wrapper.verifyPrivPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it('verifyHDMasterPubKeypair', () => {
    const [priv, pub] = wrapper.generateHDMasterPubKeypair()
    const valid = wrapper.verifyHDMasterPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it('verifyPrivPubKeypair', () => {
    const [, pub] = wrapper.generatePrivPubKeypair()
    const valid = wrapper.verifyP2pkhAddress(pub)

    expect(valid).not.equal(false)
  })
})

describe('Test all address interfaces (testnet)', () => {
  before(async () => {
    wrapper = await DogecoinJS.init()
  })

  it('generatePrivPubKeypair', () => {
    const [priv, pub] = wrapper.generatePrivPubKeypair(true)

    expect(pub.length).is.equal(34)
    expect(priv.length).is.equal(52)
  })

  it('generateHDMasterPubKeypair', () => {
    const [priv, pub] = wrapper.generateHDMasterPubKeypair(true)

    expect(pub.length).is.equal(34)
    expect(priv.length).is.gt(1)
    expect(priv.length).is.lt(200)
  })

  it('generateDerivedHDPubkey', () => {
    const [priv] = wrapper.generateHDMasterPubKeypair(true)
    const pub = wrapper.generateDerivedHDPubkey(priv)

    expect(pub.length).is.equal(34)
  })

  it.skip('verifyPrivPubKeypair', () => {
    const [priv, pub] = wrapper.generatePrivPubKeypair(true)
    const valid = wrapper.verifyPrivPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it.skip('verifyHDMasterPubKeypair', () => {
    const [priv, pub] = wrapper.generateHDMasterPubKeypair(true)
    const valid = wrapper.verifyHDMasterPubKeypair(priv, pub)

    expect(valid).not.equal(false)
  })

  it('verifyPrivPubKeypair', () => {
    const [, pub] = wrapper.generatePrivPubKeypair(true)
    const valid = wrapper.verifyP2pkhAddress(pub)

    expect(valid).not.equal(false)
  })
})

describe('Test all transaction interfaces', () => {
  before(async () => {
    wrapper = await DogecoinJS.init()
  })

  it('startTransaction', () => {
    const index = wrapper.startTransaction()

    expect(index).is.not.equal(0)
  })

  it('addUTXO', () => {
    const index = wrapper.startTransaction()
    const valid = wrapper.addUTXO(
      index,
      'b4455e7b7b7acb51fb6feba7a2702c42a5100f61f61abafa31851ed6ae076074',
      1
    )

    expect(valid).not.equal(false)
  })
})
