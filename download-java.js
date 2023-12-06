async function installJava() {
  const jre = require("node-java-connector");
  return jre
    .install({ feature_version: 17, type: "jre", allow_system_java: false })
    .then((dir) => {
      if (!dir) {
        console.log("using system-wide java installation");
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

async function main() {
  if (process.env["PMD_BIN_SKIP_JAVA_DOWNLOAD"] === "true") {
    console.log("skipped downloading Java");
  } else {
    await installJava();
  }
}

main();
