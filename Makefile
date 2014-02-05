
COMPONENTS = emitter \
  dialog \
  overlay \
  confirmation \
  alert \
  color-picker \
  notification \
  split-button \
  menu \
  card

ui:
	@rm -fr build
	@mkdir build
	@./support/build.js $(COMPONENTS)

watch:
	watch --interval=1 $(MAKE)

stats:
	@echo
	@du -hs build/* | sed 's/^/  /'
	@echo

test:
	@./node_modules/.bin/mocha \
		--require should

.PHONY: ui stats test
