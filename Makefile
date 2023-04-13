install:
	npm ci
	
publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

gendifftest:
	gendiff  __fixtures__/file1.json __fixtures__/file2.json

lint:
	npx eslint .

test: 
	NODE_OPTIONS=--experimental-vm-modules npx jest

coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage