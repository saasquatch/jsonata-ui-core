# jsonata-ui-core

Core AST and serializers for jsonata-ui

```
npm install jsonata-ui-core
```

The core library includes a serializer to turning JSONata ASTs back into strings.

```
import {serializer} from "jsonata-ui-core";
import jsonata from "jsonata"

const input = `a.b.c = "foo"`;
const ast = jsonata(input).ast();
const output = serializer(ast);
console.log("There and back again", input, output);
```