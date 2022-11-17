import loadWASM from './libdogecoin'

export class DogecoinJS {
  libdogecoin: any

  constructor(libdogecoin: any) {
    this.libdogecoin = libdogecoin
  }

  static async init() {
    const libdogecoin = await loadWASM()
    return new DogecoinJS(libdogecoin)
  }

  generatePrivPubKeypair(testnet: boolean = false): string[] {
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

  generateHDMasterPubKeypair(testnet: boolean = false): string[] {
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

  generateDerivedHDPubkey(masterPrivKey: string): string {
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

  verifyPrivPubKeypair(
    privKey: string,
    pubKey: string,
    testnet: boolean = false
  ): boolean {
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

  verifyHDMasterPubKeypair(
    privKey: string,
    pubKey: string,
    testnet: boolean = false
  ): boolean {
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

  verifyP2pkhAddress(pubKey: string): boolean {
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

  startTransaction(): number {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _start_transaction,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const result = _start_transaction()

    _dogecoin_ecc_stop()

    return result
  }

  addUTXO(txIndex: number, txId: string, outputIndex: number): boolean {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _add_utxo,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const txIdPtr = allocateUTF8(txId)

    const result = _add_utxo(txIndex, txIdPtr, outputIndex)

    _dogecoin_ecc_stop()

    _free(txIdPtr)

    return !!result
  }
}
