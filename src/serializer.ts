import { JsonataASTNode, ObjectUnaryNode, ArrayUnaryNode } from "./types";

// TODO: Should eventually replace this with types from the `jsonata` package once they're complete.
type AST = JsonataASTNode;

export function escapeString(name:string){
  if (
    /\s/.test(name) 
    || ["null", "false", "true"].includes(name) 
    || /^\d/.test(name)
    || !(/^[a-zA-Z().]+$/.test(name))
  ) {
    return "`" + name + "`";
  }
  return name;
}

export default function serializer(node: AST): string {
  if(!node) return undefined;
  if (node.type === "binary") {
    return serializer(node.lhs) + " " + node.value + " " + serializer(node.rhs);
  } else if (node.type === "function") {
    /*{
        "type": "function",
        "value": "(",
        "position": 9,
        "arguments": [
          {
            "value": 10,
            "type": "number",
            "position": 11
          }
        ],
        "procedure": {
          "value": "revenue",
          "type": "variable",
          "position": 8
        }
    }
    */
    return (
      serializer(node.procedure) +
      "(" +
      (node.arguments ? node.arguments.map(serializer).join(", ") : "") +
      ")"
    );
  } else if (node.type === "variable") {
    let stages = "";
    if (node.stages) {
      stages = node.stages.map(serializer).join("");
    }
    const predicate = node.predicate
      ? node.predicate.map(serializer).join()
      : "";
    return "$" + node.value + predicate + stages;
  } else if (node.type === "wildcard") {
    return node.value;
  } else if (node.type === "descendant") {
    return node.value;
  } else if (node.type === "number") {
    return JSON.stringify(node.value);
  } else if (node.type === "string") {
    return JSON.stringify(node.value);
  } else if (node.type === "name") {
    let stages = "";
    if (node.stages) {
      stages = node.stages.map(serializer).join("");
    }
    let bind = "";
    if (node.focus){
      let index = node.index ? "$" + node.index : "";
      let focus = node.focus ? "$" + node.focus : "";
      bind = "@" + index + focus
    }
    let name = node.value;
    name = escapeString(name);
    return name + bind + stages;
  } else if (node.type === "filter") {
    return "[" + serializer(node.expr) + "]";
  } else if (node.type === "bind") {
    return serializer(node.lhs) + " " + node.value + " " + serializer(node.rhs);
  } else if (node.type === "lambda") {
    return (
      "function (" +
      node.arguments.map(arg => serializer(arg)).join(", ") +
      ") {" +
      serializer(node.body) +
      "}"
    );
  } else if (node.type === "condition") {
    return (`${serializer(node.condition)} ? ${serializer(node.then)}${node.else ? ` : ${serializer(node.else)}` : ''}`);
  } else if (node.type === "value") {
    if (node.value === null) return "null";
    if (node.value === false) return "false";
    if (node.value === true) return "true";
    throw Error("Unhandled value node " + node.value);
  } else if (node.type === "block") {
    return "(" + node.expressions.map(serializer).join("; ") + ")";
  } else if (node.type === "path") {
    return node.steps.reduce((arr,c) => [ ...(arr.length?[...arr, c.type ==="sort" ? "^":"."]:[]), serializer(c)], []).join("");
  } else if (node.type === "apply") {
    return serializer(node.lhs) + " " + node.value + " " + serializer(node.rhs);
  } else if (node.type === "sort") {
    return "(" + node.terms.map( t=> t.descending?">":"<" + serializer(t.expression)) + ")";
  } else if (node.type === "unary") {
    if (node.value === "{" && node.type === "unary") {
      let o = node as ObjectUnaryNode;
      return (
        node.value +
        "\n\t" +
        o.lhs
          .map(
            (set: JsonataASTNode[]) =>
              serializer(set[0]) + ":" + serializer(set[1])
          )
          .join(",\n\t") +
        "\n}"
      );
    } else if (node.value === "[") {
      let a = node as ArrayUnaryNode;
      return node.value + a.expressions.map(serializer).join(", ") + "]";
    } else {
      throw Error("Unhandled unary node " + node.value);
    }
  }

  return "Error: Invalid node type.";
}
