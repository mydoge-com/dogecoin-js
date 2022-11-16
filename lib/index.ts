import libdogecoin = require("./libdogecoin");

export async function generatePrivPubKeypair(): Promise<string[]> {
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

  var privatePtr = allocate(intArrayFromString(""), ALLOC_NORMAL);
  var publicPtr = allocate(intArrayFromString(""), ALLOC_NORMAL);

  _generatePrivPubKeypair(privatePtr, publicPtr, false);

  var privKey = UTF8ToString(privatePtr);
  var pubKey = UTF8ToString(publicPtr);

  _dogecoin_ecc_stop();

  _free(privatePtr);
  _free(publicPtr);

  return [pubKey, privKey];
}
