
ui:
	@rm -fr build
	@mkdir build
	@./support/build.js dialog overlay confirmation

.PHONY: ui