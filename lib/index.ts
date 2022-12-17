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

  getDerivedHDAddressByPath(
    masterPrivKey: string,
    derivedPath: string,
    isPriv: boolean
  ): string {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _getDerivedHDAddressByPath,
      _malloc,
      UTF8ToString,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const masterPrivatePtr = allocateUTF8(masterPrivKey)
    const pathPtr = allocateUTF8(derivedPath)
    const outPtr = _malloc(200)

    _getDerivedHDAddressByPath(masterPrivatePtr, pathPtr, outPtr, isPriv)

    const outKey = UTF8ToString(outPtr)

    _dogecoin_ecc_stop()

    _free(masterPrivatePtr)
    _free(pathPtr)
    _free(outPtr)

    return outKey
  }

  // getDerivedHDAddress(
  //   masterPrivKey: string,
  //   account: number,
  //   isChange: boolean,
  //   index: number,
  //   isPriv: boolean
  // ): string {
  //   const {
  //     _dogecoin_ecc_start,
  //     _dogecoin_ecc_stop,
  //     _free,
  //     _getDerivedHDAddressByPath,
  //     _malloc,
  //     UTF8ToString,
  //     allocateUTF8,
  //   } = this.libdogecoin

  //   _dogecoin_ecc_start()

  //   const masterPrivatePtr = allocateUTF8(masterPrivKey)
  //   const pathPtr = allocateUTF8(derivedPath)
  //   const outPtr = _malloc(200)

  //   _getDerivedHDAddressByPath(masterPrivatePtr, pathPtr, outPtr, isPriv)

  //   const outKey = UTF8ToString(outPtr)

  //   _dogecoin_ecc_stop()

  //   _free(masterPrivatePtr)
  //   _free(pathPtr)
  //   _free(outPtr)

  //   return outKey
  // }

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
    const { _start_transaction } = this.libdogecoin

    const result = _start_transaction()

    return result
  }

  addUTXO(txIndex: number, txId: string, outputIndex: number): boolean {
    const { _free, _add_utxo, allocateUTF8 } = this.libdogecoin

    const txIdPtr = allocateUTF8(txId)
    const result = _add_utxo(txIndex, txIdPtr, outputIndex)

    _free(txIdPtr)

    return !!result
  }

  addOutput(txIndex: number, address: string, amount: string): boolean {
    const { _free, _add_output, allocateUTF8 } = this.libdogecoin

    const addrPtr = allocateUTF8(address)
    const amountPtr = allocateUTF8(amount)
    const result = _add_output(txIndex, addrPtr, amountPtr)

    _free(addrPtr)
    _free(amountPtr)

    return !!result
  }

  finalizeTransaction(
    txIndex: number,
    destAddr: string,
    fee: string,
    outputSum: string,
    changeAddr: string
  ): string {
    const { _free, _finalize_transaction, allocateUTF8 } = this.libdogecoin

    const destPtr = allocateUTF8(destAddr)
    const feePtr = allocateUTF8(fee)
    const sumPtr = allocateUTF8(outputSum)
    const changePtr = allocateUTF8(outputSum)

    const result = _finalize_transaction(
      txIndex,
      destPtr,
      feePtr,
      sumPtr,
      changePtr
    )

    _free(destPtr)
    _free(feePtr)
    _free(sumPtr)
    _free(changePtr)

    return result
  }
}
