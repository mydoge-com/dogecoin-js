import loadWASM from './libdogecoin'

export interface IDogecoinJS {
  libdogecoin: any
  generatePrivPubKeypair(testnet?: boolean): Promise<string[]>
  generateHDMasterPubKeypair(testnet?: boolean): Promise<string[]>
  generateDerivedHDPubkey(masterPrivKey: string): Promise<string>
  verifyPrivPubKeypair(
    privKey: string,
    pubKey: string,
    testnet?: boolean
  ): Promise<boolean>
  verifyHDMasterPubKeypair(
    privKey: string,
    pubKey: string,
    testnet?: boolean
  ): Promise<boolean>
  verifyP2pkhAddress(pubKey: string): Promise<boolean>
}

export class DogecoinJS implements IDogecoinJS {
  libdogecoin: any

  constructor(libdogecoin: any) {
    this.libdogecoin = libdogecoin
  }

  static async init() {
    const libdogecoin = await loadWASM()
    return new DogecoinJS(libdogecoin)
  }

  async generatePrivPubKeypair(testnet: boolean = false): Promise<string[]> {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _generatePrivPubKeypair,
      _malloc,
      UTF8ToString,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const privatePtr = _malloc(53)
    const publicPtr = _malloc(35)

    _generatePrivPubKeypair(privatePtr, publicPtr, testnet)

    const privKey = UTF8ToString(privatePtr)
    const pubKey = UTF8ToString(publicPtr)

    _dogecoin_ecc_stop()

    _free(privatePtr)
    _free(publicPtr)

    return [privKey, pubKey]
  }

  async generateHDMasterPubKeypair(
    testnet: boolean = false
  ): Promise<string[]> {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _generateHDMasterPubKeypair,
      _malloc,
      UTF8ToString,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const privatePtr = _malloc(200)
    const publicPtr = _malloc(35)

    _generateHDMasterPubKeypair(privatePtr, publicPtr, testnet)

    const privKey = UTF8ToString(privatePtr)
    const pubKey = UTF8ToString(publicPtr)

    _dogecoin_ecc_stop()

    _free(privatePtr)
    _free(publicPtr)

    return [privKey, pubKey]
  }

  async generateDerivedHDPubkey(masterPrivKey: string): Promise<string> {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _generateDerivedHDPubkey,
      _malloc,
      UTF8ToString,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const privatePtr = allocateUTF8(masterPrivKey)
    const publicPtr = _malloc(35)

    _generateDerivedHDPubkey(privatePtr, publicPtr)

    const pubKey = UTF8ToString(publicPtr)

    _dogecoin_ecc_stop()

    _free(privatePtr)
    _free(publicPtr)

    return pubKey
  }

  async verifyPrivPubKeypair(
    privKey: string,
    pubKey: string,
    testnet: boolean = false
  ): Promise<boolean> {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _verifyPrivPubKeypair,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const privatePtr = allocateUTF8(privKey)
    const publicPtr = allocateUTF8(pubKey)

    const result = _verifyPrivPubKeypair(privatePtr, publicPtr, testnet)

    _dogecoin_ecc_stop()

    _free(privatePtr)
    _free(publicPtr)

    return !!result
  }

  async verifyHDMasterPubKeypair(
    privKey: string,
    pubKey: string,
    testnet: boolean = false
  ): Promise<boolean> {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _verifyHDMasterPubKeypair,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const privatePtr = allocateUTF8(privKey)
    const publicPtr = allocateUTF8(pubKey)

    const result = _verifyHDMasterPubKeypair(privatePtr, publicPtr, testnet)

    _dogecoin_ecc_stop()

    _free(privatePtr)
    _free(publicPtr)

    return !!result
  }

  async verifyP2pkhAddress(pubKey: string): Promise<boolean> {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _verifyP2pkhAddress,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const publicPtr = allocateUTF8(pubKey)

    const result = _verifyP2pkhAddress(publicPtr, pubKey.length)

    _dogecoin_ecc_stop()

    _free(publicPtr)

    return !!result
  }
}
