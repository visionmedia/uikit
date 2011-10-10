
COMPONENTS = emitter \
  dialog \
  overlay \
  confirmation \
  color-picker \
  card

ui:
	@rm -fr build
	@mkdir build
	@./support/build.js $(COMPONENTS)

.PHONY: ui