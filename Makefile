
minify :
	node js/lib/r.js -o name=main out=js/main-built.js baseUrl=js

perm :
	find . -type f ! -path '*.git*' -exec chmod a-x {} +
	chown -R www-data:www-data *


bar.png:
	convert -size 100x4 xc:#222222 img/$@



clean :
	find . -type f -name "*~" -exec rm -f {} +
	rm -f js/main-built.js

