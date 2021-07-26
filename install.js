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

async function downloadPmd() {
  const pmdVer = require("./package.json").pmd.version;
  const url = `https://github.com/pmd/pmd/releases/download/pmd_releases%2F${pmdVer}/pmd-bin-${pmdVer}.zip`;
  const got = require("got");

  let response = await got(url).buffer();

  return response;
}

async function extractPmd(buffer) {
  const Zip = require("adm-zip");

  const pmdZip = new Zip(buffer);
  pmdZip.extractAllTo("dist", true);
}

async function installPmd() {
  return downloadPmd().then(extractPmd);
}

async function main() {
  await Promise.all([installJava(), installPmd()]);
}

main();
