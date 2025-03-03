/** plugin for no-this rule */
const plugin: Deno.lint.Plugin = {
  name: "no-this-plugin",
  rules: {
    "no-this": {
      create(context) {
        return {
          CallExpression(node) {
            if (
              node.callee.type === "MemberExpression" &&
              node.callee.object.type === "ThisExpression"
            ) {
              context.report({
                node: node.callee.object,
                message: "Can't touch `this`",
                fix: undefined,
              });
            }
          },
          AssignmentExpression(node) {
            if (
              node.left.type === "MemberExpression" &&
              node.left.object.type === "ThisExpression"
            ) {
              context.report({
                node: node.left.object,
                message: "Can't touch `this`",
                fix: undefined,
              });
            }
          },
        };
      },
    },
  },
};
export default plugin;
