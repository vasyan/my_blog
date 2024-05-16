.DEFAULT_GOAL := watch-js

watch-js:
	@echo "Watch JS"
	@bun build src/app/lab/script.ts --outdir ./public --watch --target browser --entry-naming [dir]/[name].[ext]

