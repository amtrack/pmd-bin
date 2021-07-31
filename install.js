async function installJava() {
  const jre = require("node-java-connector");
  return jre
    .install(15, { type: "jre", allow_system_java: false })
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
  await installJava();
}

main();