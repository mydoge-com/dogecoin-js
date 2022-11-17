import loadWASM from './libdogecoin'

export interface DogecoinJS {
  generatePrivPubKeypair(): Promise<string[]>
  generateHDMasterPubKeypair(): Promise<string[]>
  generateDerivedHDPubkey(masterPrivKey): Promise<string>
  verifyPrivPubKeypair(privKey, pubKey): Promise<boolean>
}

export async function generatePrivPubKeypair(): Promise<string[]> {
  const libdogecoin = await loadWASM()
  const {
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _generatePrivPubKeypair,
    allocateUTF8,
    UTF8ToString,
  } = libdogecoin

  _dogecoin_ecc_start()

  const privatePtr = allocateUTF8('')
  const publicPtr = allocateUTF8('')

  _generatePrivPubKeypair(privatePtr, publicPtr, false)

  const privKey = UTF8ToString(privatePtr)
  const pubKey = UTF8ToString(publicPtr)

  _dogecoin_ecc_stop()

  return [privKey, pubKey]
}

export async function generateHDMasterPubKeypair(): Promise<string[]> {
  const libdogecoin = await loadWASM()
  const {
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _generateHDMasterPubKeypair,
    UTF8ToString,
    allocateUTF8,
  } = libdogecoin

  _dogecoin_ecc_start()

  const privatePtr = allocateUTF8('')
  const publicPtr = allocateUTF8('')

  _generateHDMasterPubKeypair(privatePtr, publicPtr, false)

  const privKey = UTF8ToString(privatePtr)
  const pubKey = UTF8ToString(publicPtr)

  _dogecoin_ecc_stop()

  return [privKey, pubKey]
}

export async function generateDerivedHDPubkey(masterPrivKey): Promise<string> {
  const libdogecoin = await loadWASM()
  const {
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _generateDerivedHDPubkey,
    UTF8ToString,
    intArrayFromString,
    _malloc,
  } = libdogecoin

  _dogecoin_ecc_start()

  let pub = _malloc(35)

  _generateDerivedHDPubkey(masterPrivKey, pub)

  _dogecoin_ecc_stop()

  return UTF8ToString(pub)
}

export async function verifyPrivPubKeypair(privKey, pubKey): Promise<boolean> {
  const libdogecoin = await loadWASM()
  const { _dogecoin_ecc_start, _dogecoin_ecc_stop, _verifyPrivPubKeypair } =
    libdogecoin

  _dogecoin_ecc_start()

  let result = _verifyPrivPubKeypair(privKey, pubKey, false)

  _dogecoin_ecc_stop()

  // const { ccall, _dogecoin_ecc_start, _dogecoin_ecc_stop } = libdogecoin

  // _dogecoin_ecc_start()

  // var result = ccall(
  //   'verifyPrivPubKeypair', // name of C function
  //   'number', // return type
  //   ['string', 'string', 'boolean'], // argument types
  //   [privKey, pubKey, false] // arguments
  // )

  // _dogecoin_ecc_stop()

  return result
}
