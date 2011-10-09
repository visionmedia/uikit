
ui:
	@rm -fr build
	@mkdir build
	@./support/build.js dialog confirmation

.PHONY: ui