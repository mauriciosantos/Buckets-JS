#!/usr/bin/python
# Creates/updates the documantation in the doc directory using JSDoc-Toolkit 
# to parse the js source file.
# Requires Java 1.5+.
# Must be executed from the directory containing the scipt.

import os
os.system("java -jar ../lib/jsdoc-toolkit/jsrun.jar ../lib/jsdoc-toolkit/app/run.js ../buckets.js -d=../doc/ -s -D=\"noGlobal:true\" -D=\"title:Buckets\" -t=../lib/jsdoc-toolkit/templates/jsdoc")