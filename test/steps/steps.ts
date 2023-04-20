import { Given, When, Then } from "cucumber";
import * as jsonata from "jsonata";
import { expect } from "chai";

import { World } from ".";
import { serializer } from "../../src/index";

Given("a jsonata expression", async function(this: World, expr) {
  this.setState({ expr });
});

When("I parse it to an AST", async function(this: World) {
  const ast = jsonata(this.state.expr).ast();
  this.setState({ ast });
});

When("serialize the AST", async function(this: World) {
  const serialized = serializer(this.state.ast);
  console.log("serialized", serialized);
  this.setState({ serialized });
});

Then("parse the serialized value", async function(this: World) {
  const ast2 = jsonata(this.state.serialized).ast();
  this.setState({ ast2 });
});

function filterClone(obj: any, key: string) {
  const clone = JSON.parse(JSON.stringify(obj));
  return filterObject(clone, key);
}
function filterObject(obj: any, key: string) {
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == "object") {
      filterObject(obj[i], key);
    } else if (i == key) {
      delete obj[key];
    }
  }
  return obj;
}

Then("the ASTs should match", async function(this: World) {
  const one = filterClone(this.state.ast, "position");
  const two = filterClone(this.state.ast2, "position");
  expect(one).to.be.deep.equals(two);
});

When("I serialize the new AST", async function(this: World) {
    const serialized2 = serializer(this.state.ast2);
    this.setState({ serialized2 });
});

Then(
  "the new serialized copy should match the first serialized copy",
  async function(this: World) {
    expect(this.state.serialized).to.be.equal(this.state.serialized2);
  }
);

Then(
  "the serialized version won't match the original jsonata expression",
  async function(this: World) {
    // Since this only maybe happens, nothing to implemented
  }
);
