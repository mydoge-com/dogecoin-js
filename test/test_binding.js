const wrapper = require("../dist");
const assert = require("assert");

assert(wrapper, "The wrapper is undefined");

async function run() {
  const [pub, priv] = await wrapper.generatePrivPubKeypair();

  assert(pub.length, "generatePrivPubKeypair failed invalid pub");
  assert(priv.length, "generatePrivPubKeypair failed invalid priv");

  console.log(`generatePrivPubKeypair ${pub} ${priv}`);
}

assert.doesNotThrow(run, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
