import loadWASM from './libdogecoin'

export interface DogecoinJS {
  generatePrivPubKeypair(): Promise<string[]>
  generateHDMasterPubKeypair(): Promise<string[]>
  generateDerivedHDPubkey(masterPrivKey: string): Promise<string>
  verifyPrivPubKeypair(privKey: string, pubKey: string): Promise<boolean>
}

export async function generatePrivPubKeypair(): Promise<string[]> {
  const libdogecoin = await loadWASM()
  const {
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _free,
    _generatePrivPubKeypair,
    _malloc,
    UTF8ToString,
  } = libdogecoin

  _dogecoin_ecc_start()

  const privatePtr = _malloc(53)
  const publicPtr = _malloc(35)

  _generatePrivPubKeypair(privatePtr, publicPtr, false)

  const privKey = UTF8ToString(privatePtr)
  const pubKey = UTF8ToString(publicPtr)

  _dogecoin_ecc_stop()

  _free(privatePtr)
  _free(publicPtr)

  return [privKey, pubKey]
}

export async function generateHDMasterPubKeypair(): Promise<string[]> {
  const libdogecoin = await loadWASM()
  const {
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _free,
    _generateHDMasterPubKeypair,
    _malloc,
    UTF8ToString,
  } = libdogecoin

  _dogecoin_ecc_start()

  const privatePtr = _malloc(200)
  const publicPtr = _malloc(35)

  _generateHDMasterPubKeypair(privatePtr, publicPtr, false)

  const privKey = UTF8ToString(privatePtr)
  const pubKey = UTF8ToString(publicPtr)

  _dogecoin_ecc_stop()

  _free(privatePtr)
  _free(publicPtr)

  return [privKey, pubKey]
}

export async function generateDerivedHDPubkey(masterPrivKey): Promise<string> {
  const libdogecoin = await loadWASM()
  const {
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _free,
    _generateDerivedHDPubkey,
    _malloc,
    UTF8ToString,
  } = libdogecoin

  _dogecoin_ecc_start()

  let publicPtr = _malloc(35)

  _generateDerivedHDPubkey(masterPrivKey, publicPtr)

  const pubKey = UTF8ToString(publicPtr)

  _dogecoin_ecc_stop()

  _free(publicPtr)

  return pubKey
}

export async function verifyPrivPubKeypair(privKey, pubKey): Promise<boolean> {
  const libdogecoin = await loadWASM()
  const { _dogecoin_ecc_start, _dogecoin_ecc_stop, _verifyPrivPubKeypair } =
    libdogecoin

  _dogecoin_ecc_start()

  let result = _verifyPrivPubKeypair(privKey, pubKey, false)

  _dogecoin_ecc_stop()

  return !!result
}
