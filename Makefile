SHELL := /bin/bash
PATH := ./node_modules/.bin/:$(PATH)

LICENSE := Droppy v0.5.2 | (c) 2014 by Arnaud Ceccaldi | MIT License
CSS_MIN = $(shell cat build/droppy.min.css)

build: js theme

js: build/droppy.js build/droppy.min.js
theme: build/theme.min.css

clean:
	rm build/droppy.tmp.js build/droppy.min.css

build/droppy.min.css: src/droppy.less
	lessc --clean-css $< $@

build/theme.min.css: src/theme.less
	lessc --clean-css $< $@

build/droppy.tmp.js: src/droppy.js build/droppy.min.css
	sed -e "s/{{droppy\.min\.css}}/$(CSS_MIN)/g" $< > $@

autoprefixer: $(wildcard **/*.min.css)
	autoprefixer $<

build/droppy.js: build/droppy.tmp.js
	uglifyjs src/utils.js $< --enclose --preamble "/* $(LICENSE) */" --beautify > $@

build/droppy.min.js: build/droppy.tmp.js
	uglifyjs src/utils.js $< --enclose --preamble "/* $(LICENSE) */" --compress --mangle --screw-ie8 > $@

.PHONY: build js theme clean
