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

    const privatePtr = _malloc(52)
    const publicPtr = _malloc(34)

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

    const privatePtr = _malloc(111)
    const publicPtr = _malloc(34)

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
    const publicPtr = _malloc(34)

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
    const outPtr = _malloc(111)

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
  //   const outPtr = _malloc(111)

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

  generateEnglishMnemonic(entropy: string, size: string): string {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _generateEnglishMnemonic,
      _malloc,
      UTF8ToString,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const entropyPtr = allocateUTF8(entropy)
    const sizePtr = allocateUTF8(size)
    const mnemonicPtr = _malloc(1024)

    _generateEnglishMnemonic(entropyPtr, sizePtr, mnemonicPtr)

    const mnemonic = UTF8ToString(mnemonicPtr)

    _dogecoin_ecc_stop()

    _free(entropyPtr)
    _free(sizePtr)
    _free(mnemonicPtr)

    return mnemonic
  }

  generateRandomEnglishMnemonic(size: string): string {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _generateRandomEnglishMnemonic,
      _malloc,
      UTF8ToString,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const sizePtr = allocateUTF8(size)
    const mnemonicPtr = _malloc(1024)

    _generateRandomEnglishMnemonic(sizePtr, mnemonicPtr)

    const mnemonic = UTF8ToString(mnemonicPtr)

    _dogecoin_ecc_stop()

    _free(sizePtr)
    _free(mnemonicPtr)

    return mnemonic
  }

  getDerivedHDAddressFromMnemonic(account: number, index: number, changeLevel: string, mnemonic: string, password: string, isTestnet: boolean): string {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _getDerivedHDAddressFromMnemonic,
      _malloc,
      UTF8ToString,
      allocateUTF8,
    } = this.libdogecoin

    _dogecoin_ecc_start()

    const changePtr = allocateUTF8(changeLevel)
    const mnemonicPtr = allocateUTF8(mnemonic)
    const passwordPtr = allocateUTF8(password)

    const pubPtr = _malloc(34)

    const isTestnetInt = (isTestnet == true) ? 1 : 0;

    _getDerivedHDAddressFromMnemonic(account, index, changePtr, mnemonicPtr, passwordPtr, pubPtr, isTestnetInt)

    const pub = UTF8ToString(pubPtr)

    _dogecoin_ecc_stop()

    _free(changePtr)
    _free(mnemonicPtr)
    _free(passwordPtr)
    _free(pubPtr)

    return pub
  }

  p2pkhToQrString(inP2pkh: string): string {
    const {
      _free,
      _qrgen_p2pkh_to_qr_string,
      _malloc,
      UTF8ToString,
      allocateUTF8,
    } = this.libdogecoin


    const inPtr = allocateUTF8(inP2pkh)
    const outPtr = _malloc(3918 * 4) // Max QR code size

    _qrgen_p2pkh_to_qr_string(inPtr, outPtr)

    const string = UTF8ToString(outPtr)

    _free(inPtr)
    _free(outPtr)

    return string
  }

  // Filesystem not supported in the web browser.
  // qrgen_string_to_qr_pngfile(outFilename: string, in_p2pkh: string, sizeMultiplier: number): void {
  //   const {
  //     _free,
  //     _qrgen_string_to_qr_pngfile,
  //     allocateUTF8,
  //   } = this.libdogecoin

  //   const filePtr = allocateUTF8(outFilename)
  //   const inPtr = allocateUTF8(in_p2pkh)

  //   _qrgen_string_to_qr_pngfile(filePtr, inPtr, sizeMultiplier)

  //   _free(filePtr)
  //   _free(inPtr)
  // }

  // qrgen_string_to_qr_jpgfile(outFilename: string, in_p2pkh: string, sizeMultiplier: number): void {
  //   const {
  //     _free,
  //     _qrgen_string_to_qr_jpgfile,
  //     allocateUTF8,
  //   } = this.libdogecoin

  //   const filePtr = allocateUTF8(outFilename)
  //   const inPtr = allocateUTF8(in_p2pkh)

  //   _qrgen_string_to_qr_jpgfile(filePtr, inPtr, sizeMultiplier)

  //   _free(filePtr)
  //   _free(inPtr)
  // }

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
    const { _free, _finalize_transaction, allocateUTF8, UTF8ToString } =
      this.libdogecoin

    const destPtr = allocateUTF8(destAddr)
    const feePtr = allocateUTF8(fee)
    const sumPtr = allocateUTF8(outputSum)
    const changePtr = allocateUTF8(changeAddr)

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

    return UTF8ToString(result)
  }

  getRawTransaction(txIndex: number): string {
    const { _get_raw_transaction, UTF8ToString } = this.libdogecoin

    const result = _get_raw_transaction(txIndex)

    return UTF8ToString(result)
  }

  signMessage(privkey: string, msg: string): string {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _sign_message,
      allocateUTF8,
      UTF8ToString
    } = this.libdogecoin;

    const privkeyPtr = allocateUTF8(privkey);
    const msgPtr = allocateUTF8(msg);

    _dogecoin_ecc_start()

    const result = _sign_message(privkeyPtr, msgPtr);

    _dogecoin_ecc_stop()

    _free(privkeyPtr);
    _free(msgPtr);

    return UTF8ToString(result);
  }

  verifyMessage(sig: string, msg: string, address: string): boolean {
    const {
      _dogecoin_ecc_start,
      _dogecoin_ecc_stop,
      _free,
      _verify_message,
      allocateUTF8,
    } = this.libdogecoin;

    const sigPtr = allocateUTF8(sig);
    const msgPtr = allocateUTF8(msg);
    const addressPtr = allocateUTF8(address);

    _dogecoin_ecc_start()

    const result = _verify_message(sigPtr, msgPtr, addressPtr);

    _dogecoin_ecc_stop()

    _free(sigPtr);
    _free(msgPtr);
    _free(addressPtr);

    return (result == 1) ? true : false;
  }
}
