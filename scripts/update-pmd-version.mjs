#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});

async function main() {
  const latestPmdVersion = await getLatestPmdVersion();
  console.log(latestPmdVersion);
  const pjson = JSON.parse(await readFile("package.json", "utf8"));
  pjson.pmd.version = latestPmdVersion;
  await writeFile("package.json", JSON.stringify(pjson, null, 2) + "\n");
}

async function getLatestPmdVersion() {
  const response = await fetch(
    "https://api.github.com/repos/pmd/pmd/git/matching-refs/tags/pmd_releases"
  );
  const releaseTags = await response.json();

  const versions = releaseTags.map((releaseTag) =>
    releaseTag.ref.split("/").at(-1)
  );
  return versions.at(-1);
}
