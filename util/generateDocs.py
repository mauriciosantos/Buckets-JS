#!/usr/bin/python
# Creates/updates the documantation in the doc directory using JSDoc-Toolkit to parse the js source file.
# Must be executed from the directory containing the scipt.

import os
os.system("java -jar ../lib/jsdoc-toolkit/jsrun.jar ../lib/jsdoc-toolkit/app/run.js ../buckets.js -d=../doc/ -t=../lib/jsdoc-toolkit/templates/jsdoc")