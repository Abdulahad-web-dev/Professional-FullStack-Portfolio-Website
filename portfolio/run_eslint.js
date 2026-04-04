const { ESLint } = require("eslint");

(async function main() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["src/**/*.jsx"]);
  let hasErrors = false;
  results.forEach(result => {
    if (result.errorCount > 0 || result.warningCount > 0) {
      console.log(result.filePath);
      result.messages.forEach(msg => {
        console.log(`  ${msg.line}:${msg.column} - ${msg.message} [${msg.ruleId}]`);
      });
      hasErrors = true;
    }
  });
  if (!hasErrors) console.log("CLEAN!");
})().catch(console.error);
