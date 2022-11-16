import loadWASM = require("./libdogecoin");

export async function generatePrivPubKeypair(): Promise<string[]> {
  const libdogecoin = await loadWASM();
  const {
    ALLOC_NORMAL,
    UTF8ToString,
    _dogecoin_ecc_start,
    _dogecoin_ecc_stop,
    _free,
    _generatePrivPubKeypair,
    allocate,
    intArrayFromString,
  } = libdogecoin;

  _dogecoin_ecc_start();

  const privatePtr = allocate(intArrayFromString(""), ALLOC_NORMAL);
  const publicPtr = allocate(intArrayFromString(""), ALLOC_NORMAL);

  _generatePrivPubKeypair(privatePtr, publicPtr, false);

  const privKey = `${UTF8ToString(privatePtr)}`;
  const pubKey = `${UTF8ToString(publicPtr)}`;

  _dogecoin_ecc_stop();

  return [pubKey, privKey];
}
