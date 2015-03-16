JSDOC FOR NODEJS
======================================================================

This version of JsDoc have been modified to run on NodeJs instead of
Rhino. The reason is simple: performance. NodeJs uses Google's V8 
JavaScript engine with far better performance than Mozilla's Rhino.

Users have reported that it is possible to compile documentation in
about 10 seconds running NodeJs instead of 250 seconds running Rhino.
See test_result.txt for more details.

Utilizing NodeJs brings another advantage: there is no need for Java
nor the Java runtime. Which means less to download and less to 
distribute. It also decreases the startup time of JsDoc which means
that the documentation for small project can now be generated much 
faster than before.

This is not an official JsDoc release. For the official version of 
JsDoc that runs ontop of Rhino, please visit
http://code.google.com/p/jsdoc-toolkit/


DESCRIPTION
======================================================================

This is the source code for JsDoc Toolkit, an automatic documentation
generation tool for JavaScript. It is written in JavaScript and is run
from a command line (or terminal) using NodeJS.

Using this tool you can automatically turn JavaDoc-like comments in
your JavaScript source code into published output files, such as HTML
or XML.

For more information, to report a bug, or to browse the technical
documentation for this tool please visit the official JsDoc Toolkit
project homepage at http://code.google.com/p/jsdoc-toolkit/

For the most up-to-date documentation on JsDoc Toolkit see the 
official wiki at http://code.google.com/p/jsdoc-toolkit/w/list


REQUIREMENTS
======================================================================

Running JsDoc Toolkit requires you to have NodeJS installed on your
computer. For more information see http://nodejs.org/

 * NodeJS http://nodejs.org/


INSTALLATION
======================================================================

Use NPM to download and install the page

	$ [sudo] npm install -g jsdoc2

USAGE
======================================================================

On a computer running Windows a valid command line to run JsDoc
Toolkit might look like this:

	$ jsdoc2 -a -t=templates/jsdoc mycode.js

If you have manually downloaded and installed JsDoc instead of using
NPM, the same command might look like this:

	$ node app/run.js -a -t=templates/jsdoc mycode.js

The above assumes your current working directory contains the
"templates" subdirectories from the standard JsDoc Toolkit
distribution and that the relative path to the code you wish to
document is "mycode.js".

The output documentation files will be saved to a new directory named
"out" (by default) in the current directory, or if you specify a
-d=somewhere_else option, to the somewhere_else directory.

For help (usage notes) enter this on the command line:

	$ jsdoc2 --help

More information about the various command line options used by JsDoc
Toolkit are available on the project wiki.


TESTING
======================================================================

To run the suite of unit tests included with JsDoc Toolkit enter this
on the command line:

	$ jsdoc2 -T

To see a dump of the internal data structure that JsDoc Toolkit has
built from your source files use this command:

	$ jsdoc2 mycode.js -Z


LICENSE
======================================================================

JSDoc.pm
----------------------------------------------------------------------

This project is based on the JSDoc.pm tool, created by Michael
Mathews and Gabriel Reid. More information on JsDoc.pm can
be found on the JSDoc.pm homepage: http://jsdoc.sourceforge.net/

Complete documentation on JsDoc Toolkit can be found on the project
wiki at http://code.google.com/p/jsdoc-toolkit/w/list


JsDoc Toolkit
----------------------------------------------------------------------

All code specific to JsDoc Toolkit are free, open source and licensed
for use under the X11/MIT License.

JsDoc Toolkit is Copyright (c)2009 Michael Mathews <micmath@gmail.com>

This program is free software; you can redistribute it and/or
modify it under the terms below.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions: The above copyright notice and this
permission notice must be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
