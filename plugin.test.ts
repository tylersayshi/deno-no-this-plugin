import { assertEquals } from "jsr:@std/assert";
import plugin from "./plugin.ts";

const lintCode = (code: string) => {
  return Deno.lint.runPlugin(plugin, "test.ts", code);
};

Deno.test("no assign this", () => {
  const code = `
function foo() {
  this.thing = 1;
}
`;
  const diagnostics = lintCode(code);
  assertEquals(diagnostics, [
    {
      id: "no-this-plugin/no-this",
      message: "Can't touch `this`",
      range: [20, 24],
      hint: undefined,
      fix: [] as never,
    },
  ]);
});

Deno.test("no call this", () => {
  const code = `
function foo() {
  this.thing();
}
`;
  const diagnostics = lintCode(code);
  assertEquals(diagnostics, [
    {
      id: "no-this-plugin/no-this",
      message: "Can't touch `this`",
      range: [20, 24],
      hint: undefined,
      fix: [] as never,
    },
  ]);
});

Deno.test("no class this", () => {
  const code = `
class Foo {
  constructor() {
    this.thing = 1;
  }
}
`;
  const diagnostics = lintCode(code);
  assertEquals(diagnostics, [
    {
      id: "no-this-plugin/no-this",
      message: "Can't touch `this`",
      range: [35, 39],
      hint: undefined,
      fix: [] as never,
    },
  ]);
});
