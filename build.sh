#!/bin/sh
LESSC="node_modules/.bin/lessc"
UGLIFY="node_modules/.bin/uglifyjs"
LICENSE='Droppy v0.5.0 | (c) 2014 by Arnaud Ceccaldi | MIT License'

# Ensures we're running from the right folder
[ ! -f "build.sh" ] && echo "Could not find build.sh in current folder. Please run this script from the project root folder!" && exit
[ ! -f "src/droppy.js" ] && echo "Could not find droppy.js in current folder. Please run this script from the project root folder!" && exit
[ ! -f "src/droppy.less" ] && echo "Could not find droppy.less in current folder. Please run this script from the project root folder!" && exit

# Create the build folder if it doesn't exist yet
mkdir -p build

# Cleanup build folder if needed
rm -rf build/* build/.* 2> /dev/null

# Minifies all LESS assets
$LESSC --clean-css "src/droppy.less" "build/droppy.min.css"
$LESSC --clean-css "src/theme.less" "build/theme.min.css"

# Inject droppy.min.css content inside droppy.js
DROPPY_MIN_CSS=$(cat "build/droppy.min.css")
sed -e "s/{{droppy\.min\.css}}/${DROPPY_MIN_CSS}/g" "src/droppy.js" > "build/droppy.tmp.js"

# Minifies JS assets
$UGLIFY "build/droppy.tmp.js" --enclose --preamble "/* $LICENSE */" --beautify > "build/droppy.js"
$UGLIFY "build/droppy.tmp.js" --enclose --preamble "/* $LICENSE */" --compress --mangle --screw-ie8 > "build/droppy.min.js"

# Cleanup build folder
rm "build/droppy.tmp.js" "build/droppy.min.css"
