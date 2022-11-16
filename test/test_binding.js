const wrapper = require("../dist");
const assert = require("assert");

assert(wrapper, "The wrapper is undefined");

async function run() {
  const [pub, priv] = await wrapper.generatePrivPubKeypair();
  console.log("pub", pub);
  console.log("priv", priv);
}

assert.doesNotThrow(run, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
