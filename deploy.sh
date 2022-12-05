#!/bin/bash

google-closure-compiler --compilation_level SIMPLE --strict_mode_input --assume_function_wrapper ./index.js > ./out.js
mv /Users/dillonjeffers/workspace/check-md-11/out.js /Users/dillonjeffers/scripts/check-md-11/
