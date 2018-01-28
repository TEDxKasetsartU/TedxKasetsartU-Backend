#!/usr/bin/env bash

# set -x #DEBUG - Display commands and their arguments as they are executed.
# set -v #VERBOSE - Display shell input lines as they are read.
# set -n #EVALUATE - Check syntax of the script but don't execute.

# -------------------------------------------------
# Description:  ...
# Create by:    ...
# Since:        ...
# -------------------------------------------------
# Version:      0.0.1  -- description
#               0.0.2b -- beta-format
# -------------------------------------------------
# Error code    1      -- error
# -------------------------------------------------
# Bug:          ...
# -------------------------------------------------

cd "$(dirname "$0")" || exit 1

[[ $1 == "help" ]] || [[ $1 == "h" ]] &&
    echo "
    Help command... 
    Accept 1 parameter, should be one of this
    - patch x.x.1
    - minor x.1.x
    - major 1.x.x
    - prepatch
    - preminor
    - premajor
    - prerelease
"

npm version "$1"
