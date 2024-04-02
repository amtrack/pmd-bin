#!/usr/bin/env bash

set -eo errexit

# execute pmd, ignore output and only verify its exit code

ret=0;

echo -n "it should succeed linting valid apex code... "
if ! pmd check --dir ./fixtures/valid --use-version apex-55 --rulesets rulesets/apex/quickstart.xml > /dev/null; then
    echo "failed"
    ret=1;
else
    echo "OK"
fi

echo -n "it should fail linting invalid apex code... "
if pmd check --dir ./fixtures/invalid --use-version apex-55 --rulesets rulesets/apex/quickstart.xml > /dev/null; then
    echo "failed"
    ret=1;
else
    echo "OK"
fi

exit $ret;
