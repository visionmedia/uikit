
COMPONENTS = emitter \
  dialog \
  overlay \
  confirmation \
  color-picker \
  notification \
  context-menu \
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

.PHONY: ui stats