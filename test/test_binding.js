const wrapper = require("../dist");
const assert = require("assert");

assert(wrapper, "The wrapper is undefined");

async function run() {
  await wrapper.generatePrivPub();
}

assert.doesNotThrow(run, undefined, "testBasic threw an expection");

console.log("Tests passed- everything looks OK!");
