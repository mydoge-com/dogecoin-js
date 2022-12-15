# dogecoin-js libdogecoin wrapper for Javascript / Typescript

## Using the wrapper in Javascript / Typescript

1. Install the module

   ```bash
   npm install @mydogeofficial/dogecoin-js
   ```

2. Import and use

   ```js
   import { DogecoinJS } from '@mydogeofficial/dogecoin-js'

   async function run() {
     const dogecoin_js = await DogecoinJS.init()
     const [privKey, pubKey] = dogecoin_js.generatePrivPubKeypair()
     console.log(`generated: ${privKey} ${pubKey}`)
   }
   ```

## Compiling and testing the wrapper

1. Init submodules `libdogecoin` and `emsdk`

   ```bash
   git submodule init
   git submodule update
   ```

2. Init `emsdk`

   - Linux

     ```bash
     cd emsdk
     ./emsdk install latest
     ./emsdk activate latest
     source ./emsdk_env.sh
     ```

   - Mac M1

     ```bash
     brew install --ignore-dependencies emscripten
     ```

3. Configure and compile `libdogecoin` using `emscripten`

   ```bash
   cd libdogecoin
   ./autogen.sh
   emconfigure ./configure CC=emcc AR=emar --host wasm32 --disable-net --disable-tools --disable-dependency-tracking
   emmake make
   ```

4. Export `libdogecoin` javascript functions

   ```bash
   cd libdogecoin/.libs
   emcc -sSTRICT=1 -sEXPORTED_FUNCTIONS=_dogecoin_ecc_start,_dogecoin_ecc_stop,_generatePrivPubKeypair,_generateHDMasterPubKeypair,_generateDerivedHDPubkey,_getDerivedHDAddressByPath,_getDerivedHDAddress,_verifyPrivPubKeypair,_verifyHDMasterPubKeypair,_verifyP2pkhAddress,_start_transaction,_add_utxo,_add_output,_finalize_transaction,_get_raw_transaction,_clear_transaction,_sign_raw_transaction,_sign_transaction,_store_raw_transaction,_free,_malloc -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,stackAlloc,UTF8ToString,intArrayFromString,stringToUTF8,allocateUTF8,setValue,getValue -sMODULARIZE=1 -sENVIRONMENT='web,worker,node' -sEXPORT_NAME=loadWASM -sSINGLE_FILE=1 libdogecoin.a ../src/secp256k1/.libs/libsecp256k1.a -o ../../lib/libdogecoin.js
   ```

5. Test bindings

   ```bash
   npm i
   npm test
   ```

## References

- [libdogecoin](https://github.com/dogecoinfoundation/libdogecoin)
- [emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- [@alamshafil example](https://gist.github.com/alamshafil/383fcb4b9b3bad160a7a988aa9938465)
