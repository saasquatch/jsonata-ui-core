# jsonata-ui-core

[![npm version](https://badge.fury.io/js/jsonata-ui-core.svg)](https://badge.fury.io/js/jsonata-ui-core)

Core AST and serializers for jsonata-ui

```sh
npm install jsonata-ui-core
```

The core library includes a serializer to turning JSONata ASTs back into strings.

```js
import {serializer} from "jsonata-ui-core";
import jsonata from "jsonata"

const input = `a.b.c = "foo"`;
const ast = jsonata(input).ast();
const output = serializer(ast);
console.log("There and back again", input, output);
```

## Not Implemented

 - Some operators not yet implemented
 - No tests coverage yet (should be able to re-use tests from jsonata-js)
 - Merged back into main `jsonata-js` package
 
