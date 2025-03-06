# no-this-plugin

A Deno plugin to disallow `this` in your code.

## Rule Details

The rule is named `no-this` and it will error if you use `this` in any of the
following ways:

- In a function call
- In an assignment
- In a class constructor

```console
error[no-this-plugin/no-this]: Can't touch `this`
 --> /Users/tylerlawson/gitspace/deno-plugin/main.ts:2:3
  |
2 |   this.thing = 1;
  |   ^^^^


Found 1 problem
```

## Installation

deno.json:

```json
{
  "lint": {
    "plugins": ["jsr:@tyler/no-this-plugin"]
  }
}
```

## Invalid Code

```ts
function foo() {
  this.thing = 1;
}
```

```ts
function foo() {
  this.thing();
}
```

```ts
class Foo {
  constructor() {
    this.thing = 1;
  }
}
class Foo {
  thing() {
    this.thing = 1;
  }
}
```

## Valid Code

```ts
class Thing {
  thing = 1;
}

const foo = () => {
  const notThis = 1;
};
```
