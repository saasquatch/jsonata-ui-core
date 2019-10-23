class TypescriptSnippetSyntax {
    constructor() {}
  
    build({ comment, generatedExpressions, functionName, stepParameterNames }) {
      const functionKeyword = "async function ";
      const implementation = "return 'pending';";
      const worldTypeDef = "this:World";
  
      const definitionChoices = generatedExpressions.map(
        (generatedExpression, index) => {
          const prefix = index === 0 ? "" : "// ";
  
          const generatedParams = generatedExpression.parameterNames.concat(
            stepParameterNames
          );
          const allParameterNames = [worldTypeDef, ...generatedParams];
          return `${prefix + functionName}('${generatedExpression.source.replace(
            /'/g,
            "\\'"
          )}', ${functionKeyword}(${allParameterNames.join(", ")}) {\n`;
        }
      );
  
      return (
        `${definitionChoices.join("")}` +
        `  ${implementation}\n` +
        `});`
      );
    }
  }
  
  module.exports = TypescriptSnippetSyntax;