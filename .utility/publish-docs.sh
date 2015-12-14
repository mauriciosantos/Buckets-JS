#!/bin/bash
# This script publishes JS-DOC documentation to the gh-pages branch

if [ "$TRAVIS_BRANCH" == "master" ]; then
	
	set -e # exit with nonzero exit code if anything fails
	echo -e "Publishing documentation...\n"
	
	cd $TRAVIS_BUILD_DIR
	git config --global user.email "travis@travis-ci.org"
	git config --global user.name "travis-ci"
	git clone --quiet --branch=gh-pages https://${GH_TOKEN}@${GH_REF} gh-pages > /dev/null
	
	rm -rf ./gh-pages/*
	cp -Rf ./doc ./gh-pages
	cd gh-pages
	git add -f .
	git commit -m "Lastest javadoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
	git push -fq origin gh-pages > /dev/null
	
fi
