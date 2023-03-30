install:
	npm ci
	
publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

gendifftest:
	gendiff  files/file1.json files/file2.json