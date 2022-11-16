const dogecoin_js = require("../dist/dogecoin-js");
const assert = require("assert");

assert(dogecoin_js, "The wrapper is undefined");

async function run() {
  const [pub, priv] = await dogecoin_js.generatePrivPubKeypair();

  assert(pub.length, "generatePrivPubKeypair failed invalid pub");
  assert(priv.length, "generatePrivPubKeypair failed invalid priv");

  console.log(`generatePrivPubKeypair ${pub} ${priv}`);
}

assert.doesNotThrow(run, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
