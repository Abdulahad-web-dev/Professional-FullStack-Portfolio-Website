import { ESLint } from "eslint";
import fs from "fs";

(async function main() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["src/**/*.jsx"]);
  let output = "";
  results.forEach(result => {
    if (result.errorCount > 0) {
      result.messages.filter(m => m.severity === 2).forEach(msg => {
        output += `${result.filePath}:${msg.line} - ${msg.message} [${msg.ruleId}]\n`;
      });
    }
  });
  fs.writeFileSync("eslint_node_output.txt", output || "CLEAN!");
})().catch(console.error);
