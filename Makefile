SHELL := /bin/bash
PATH := ./node_modules/.bin/:$(PATH)

LICENSE := Droppy v0.5.2 | (c) 2014 by Arnaud Ceccaldi | MIT License
CSS_MIN = $(shell cat build/droppy.min.css)

build: js theme

develop: build
	$(MAKE) livereload
	serve . &
	watch $(MAKE) --quiet reload

js: build/droppy.js build/droppy.min.js
theme: build/theme.min.css

clean:
	rm build/droppy.tmp.js build/droppy.min.css

gzip-size: build/droppy.min.js
	gzip -c $< | wc -c

build/droppy.min.css: src/droppy.less
	lessc --clean-css $< $@
	autoprefixer $@

build/theme.min.css: src/theme.less
	lessc --clean-css $< $@
	autoprefixer $@

build/droppy.tmp.js: src/droppy.js build/droppy.min.css
	sed -e "s/{{droppy\.min\.css}}/$(CSS_MIN)/g" $< > $@

build/droppy.js: build/droppy.tmp.js
	uglifyjs src/utils.js $< --enclose --preamble "/* $(LICENSE) */" --beautify > $@

build/droppy.min.js: build/droppy.tmp.js
	uglifyjs src/utils.js $< --enclose --preamble "/* $(LICENSE) */" --compress --mangle --screw-ie8 > $@

.PHONY: build develop js theme autoprefixer clean

LIVERELOAD_DIR = ./build
include ./node_modules/make-livereload/index.mk
