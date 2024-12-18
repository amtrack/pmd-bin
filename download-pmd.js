async function cleanDist() {
  const fs = require('fs/promises');
  return fs.rm("dist", { recursive: true, force: true });
}

async function downloadPmd() {
  const pmdVer = require("./package.json").pmd.version;
  const url = `https://github.com/pmd/pmd/releases/download/pmd_releases%2F${pmdVer}/pmd-dist-${pmdVer}-bin.zip`;
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer(), "binary");
}

async function extractPmd(buffer) {
  const Zip = require("adm-zip");

  const pmdZip = new Zip(buffer);
  pmdZip.extractAllTo("dist", true, true);
}

async function movePmd() {
  const pmdVer = require("./package.json").pmd.version;
  const fs = require("fs/promises");

  return fs.rename(`dist/pmd-bin-${pmdVer}`, "dist/pmd-bin");
}

async function installPmd() {
  return cleanDist().then(downloadPmd).then(extractPmd).then(movePmd);
}

async function main() {
  await installPmd();
}

main();
