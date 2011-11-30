
minify :
	node js/lib/r.js -o name=main out=js/main-built.js baseUrl=js

perm :
	find . -type f ! -path '*.git*' -exec chmod a-x {} +
	chown -R www-data:www-data *

clean :
	find . -type f -name "*~" -exec rm -f {} +
	rm -f js/main-built.js

