#!/usr/bin/python
# Creates/updates the documantation in the doc directory using JSDoc-Toolkit 
# to parse the js source file.
# Requires Node.js. https://nodejs.org/
# Must be executed from the directory containing the scipt.

import os
os.system("node ../lib/jsdoc2/app/run.js ../buckets.js -d=../doc/ -s -D=\"noGlobal:true\" -D=\"title:Buckets\" -t=../lib/jsdoc2/templates/jsdoc-buckets")