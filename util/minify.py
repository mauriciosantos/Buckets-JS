#!/usr/bin/python
# Compiles the js source file using the Closure Compiler API, 
# creating a minified version in the project's root directory.
# Must be executed from the directory containing the script.

import httplib, urllib, sys

print "\nReading source file"

text_file = open("../buckets.js", "r")
whole_thing = text_file.read()

print "\nCommunicating with Google"

params = urllib.urlencode([
    ('js_code', whole_thing),
    ('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
    ('output_format', 'text'),
    ('output_info', 'compiled_code'),
])

headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = httplib.HTTPConnection('closure-compiler.appspot.com')
conn.request('POST', '/compile', params, headers)
response = conn.getresponse()
data = response.read()

print "\nSaving minified version"

m_File = open("../buckets-minified.js", "w")
m_File.write(data)
m_File.close();
text_file.close()
conn.close