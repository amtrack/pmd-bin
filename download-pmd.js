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

async function movePmd() {
  const pmdVer = require("./package.json").pmd.version;
  const fs = require("fs/promises");

  return fs.rename(`dist/pmd-bin-${pmdVer}`, "dist/pmd-bin");
}

async function installPmd() {
  return downloadPmd().then(extractPmd).then(movePmd);
}

async function main() {
  await installPmd();
}

main();
