#!/usr/bin/env bash

rm -rf dist > /dev/null
mkdir -p dist > /dev/null
pushd dist > /dev/null || true
# shellcheck disable=SC2154
curl -SL "https://github.com/pmd/pmd/releases/download/pmd_releases%2F${npm_package_pmd_version}/pmd-bin-${npm_package_pmd_version}.zip" | jar xf /dev/stdin
mv "pmd-bin-${npm_package_pmd_version}" pmd-bin
popd > /dev/null || true
