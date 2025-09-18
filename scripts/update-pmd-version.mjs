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
  const versions = releaseTags
    .map((releaseTag) => releaseTag.ref.split("/").at(-1))
    .filter((version) => {
      // no -rc1, -SNAPSHOT, etc.
      return !version.includes("-");
    });
  return getHighestVersion(versions);
}

function getHighestVersion(versions) {
  return versions.reduce((max, current) => {
    const maxParts = max.split(".").map(Number);
    const currentParts = current.split(".").map(Number);
    for (let i = 0; i < 3; i++) {
      if (currentParts[i] > maxParts[i]) return current;
      if (currentParts[i] < maxParts[i]) return max;
    }
    return max;
  });
}
