#!/bin/sh

# This is a script to build libdogecoin WASM wrapper.

echo "==> Building libdogecoin WASM wrapper..."

# Build libunistring
echo "==> Building libunistring..."
LIBUNISTRING_VER=libunistring-1.1
LIBUNISTRING_FULL_PATH="$(pwd)/libunistring-1.1"

if [ -d "${LIBUNISTRING_VER}" ]; then
    echo "==> ${LIBUNISTRING_VER} already exists."
else
    wget https://ftp.gnu.org/gnu/libunistring/${LIBUNISTRING_VER}.tar.gz
    tar -xvf ${LIBUNISTRING_VER}.tar.gz
    rm -r ${LIBUNISTRING_VER}.tar.gz
fi

cd ${LIBUNISTRING_VER}
mkdir build

emconfigure ./configure \
    CC=emcc CXX=em++ AR=emar \
    ac_cv_have_decl_alarm=no gl_cv_func_sleep_works=yes \
    --host wasm32 --prefix=$(pwd)/build

emmake make -j$(nproc) && make install

cd ..

# Build libdogecoin
echo "==> Building libdogecoin..."
cd libdogecoin
./autogen.sh

# Patch to add support for __EMSCRIPTEN__ platform for WASM compilation 
sed -i '/#if defined(__linux__) || defined(__CYGWIN__)/s/$/ || defined(__EMSCRIPTEN__)/' ./include/dogecoin/portable_endian.h

emconfigure ./configure \
    CC=emcc AR=emar \
    CPPFLAGS="-I${LIBUNISTRING_FULL_PATH}/build/include" \
    LDFLAGS="-L${LIBUNISTRING_FULL_PATH}/build/lib" \
    --host wasm32 --disable-net --disable-tools --disable-dependency-tracking \

emmake make clean
emmake make -j$(nproc)

# Build WASM
echo "==> Building WASM..."
cd .libs
emcc -sSTRICT=1 \
    -sEXPORTED_FUNCTIONS=_dogecoin_ecc_start,_dogecoin_ecc_stop,_generatePrivPubKeypair,_generateHDMasterPubKeypair,_generateDerivedHDPubkey,_getDerivedHDAddressByPath,_getDerivedHDAddress,_verifyPrivPubKeypair,_verifyHDMasterPubKeypair,_verifyP2pkhAddress,_start_transaction,_add_utxo,_add_output,_finalize_transaction,_get_raw_transaction,_clear_transaction,_sign_raw_transaction,_sign_transaction,_store_raw_transaction,_generateEnglishMnemonic,_generateRandomEnglishMnemonic,_dogecoin_seed_from_mnemonic,_getDerivedHDAddressFromMnemonic,_qrgen_p2pkh_to_qrbits,_qrgen_p2pkh_to_qr_string,_qrgen_p2pkh_consoleprint_to_qr,_qrgen_string_to_qr_pngfile,_qrgen_string_to_qr_jpgfile,_sign_message,_verify_message,_free,_malloc \
    -sEXPORTED_RUNTIME_METHODS=ccall,cwrap,stackAlloc,UTF8ToString,intArrayFromString,stringToUTF8,allocateUTF8,setValue,getValue \
    -sMODULARIZE=1 -sENVIRONMENT='web,worker,node' -sEXPORT_NAME=loadWASM -sSINGLE_FILE=1 \
    libdogecoin.a ../src/secp256k1/.libs/libsecp256k1.a ../../${LIBUNISTRING_VER}/build/lib/libunistring.a -o ../../lib/libdogecoin.js

cd ../..
rm -rf ${LIBUNISTRING_VER}

echo "Script done."
