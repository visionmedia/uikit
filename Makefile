
ui:
	@rm -fr build
	@mkdir build
	@./support/build.js emitter dialog overlay confirmation

.PHONY: ui