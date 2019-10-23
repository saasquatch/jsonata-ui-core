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
[![Edit jsonata serializer demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jsonata-serializer-demo-q67m3?fontsize=14)

## Not Implemented

 - Some operators not yet implemented
 - Complex functions: `λ($f) { λ($x) { $x($x) }( λ($g) { $f( (λ($a) {$g($g)($a)}))})}(λ($f) { λ($n) { $n < 2 ? 1 : $n * $f($n - 1) } })(6)`
 - Apply operator: `Customer.Email ~> $substringAfter("@") ~> $substringBefore(".") ~> $uppercase()`
 - Sort: `foo^(bar)`
 - Regex: `$matcher := /[a-z]*an[a-z]*/i`
 - Position variable binding: `library.books#$ib['Kernighan' in authors]`
 - Context variable binding: `library.loans@$l.books@$b[$l.isbn=$b.isbn]`
 - No tests coverage yet (should be able to re-use tests from jsonata-js)
 - Merged back into main `jsonata-js` package
 
