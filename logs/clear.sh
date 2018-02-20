#!/usr/bin/env bash

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

cd "$(dirname "$0")" || exit 1

echo "delete file in ${PWD}"
rm -r ./*.log 2>/dev/null
rm -r ./*.error 2>/dev/null
