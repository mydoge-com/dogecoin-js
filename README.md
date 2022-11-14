# dogecoin-js libdogecoin wrapper for Javascript / Typescript

## Using the wrapper in Javascript / Typescript

1. Install the module

   ```bash
   npm install @mydogeofficial/dogecoin-js
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

   - Mac M1 (TODO)

     ```bash
     brew install emscripten
     ```

3. Configure and compile `libdogecoin` using `emscripten`

   ```bash
   cd libdogecoin
   ./autogen.sh
   <emsdk path>/emconfigure ./configure CC=<emsdk path>/emcc AR=<emsdk path>/emar --host wasm32-emscripten --disable-net --disable-tools
   <emsdk path>/emmake make
   ```

4. Export `libdogecoin` javascript functions

   ```bash
   cd libdogecoin/.libs
   <emsdk path>/emcc -sEXPORTED_FUNCTIONS=_dogecoin_ecc_start,_dogecoin_ecc_stop,_generatePrivPubKeypair,_free,_malloc -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,allocate libdogecoin.a ../src/secp256k1/.libs/libsecp256k1.a -o ../../lib/libdogecoin.ts
   ```

5. Test bindings

   ```bash
   npm i
   npm test
   ```

## References

- [libdogecoin](github.com/dogecoinfoundation/libdogecoin)
- [emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- [@alamshafil example](https://gist.github.com/alamshafil/383fcb4b9b3bad160a7a988aa9938465)
