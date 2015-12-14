# !/bin/bash
# This script publishes JS-DOC documentation to the gh-pages branch

if [ "$TRAVIS_BRANCH" == "master" ]; then
	
	set -e # exit with nonzero exit code if anything fails
	echo -e "Publishing documentation...\n"
	
	git config --global user.email "travis@travis-ci.org"
	git config --global user.name "travis-ci"
	
	cd $TRAVIS_BUILD_DIR/doc
	git init
	git add .
	git commit -m "Lastest jsdoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
	git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
	
fi
