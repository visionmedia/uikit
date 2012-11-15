 ![UIKit JavaScript component framework](http://f.cl.ly/items/2j0m3D1l1T041S1k463L/Grab.png)

  UIKit is a small (4kb minified / gzipped) collection of flexible, cohesive, decoupled components for the modern web. With an emphasis on structure-only styling making it simple to apply application specific styling. UIKit is _not_ a replacement for larger UI frameworks, nor is it a CSS framework such as Bootstrap. UIKit is still a work in progress, check the [Issues](https://github.com/visionmedia/uikit/issues).

  __NOTE__: all of these components now live in their own individual repos found here [github.com/component](https://github.com/component). I will still accept patches for UIKit, however active development has moved to components, as they're fundamentally superior to existing js sharing techniques.

## Components

  - [ui.Emitter](https://github.com/visionmedia/uikit/tree/master/lib/components/emitter/emitter.js) an event emitter used throughout various components
  - [ui.Card](https://github.com/visionmedia/uikit/tree/master/lib/components/card/card.js) a double-sided "card" powered by 3d transforms
  - [ui.ColorPicker](https://github.com/visionmedia/uikit/tree/master/lib/components/color-picker/color-picker.js) an elegant scalable color picker
  - [ui.Overlay](https://github.com/visionmedia/uikit/tree/master/lib/components/overlay/overlay.js) an overlay used by `ui.Dialog`
  - [ui.Dialog](https://github.com/visionmedia/uikit/tree/master/lib/components/dialog/dialog.js) a dialog component sporting optional modal and overlay functionality
  - [ui.Confirmation](https://github.com/visionmedia/uikit/tree/master/lib/components/confirmation/confirmation.js) a confirmation dialog building on `ui.Dialog`
  - [ui.Notification](https://github.com/visionmedia/uikit/tree/master/lib/components/notification/notification.js) an unobtrusive growl-like notification

## Custom builds

  Each release includes a pre-built `./build` directory containing _ui.js_ and _ui.css_,
  however if you wish you may re-build with `make`, by default including all components:

  ![UIKit build](http://f.cl.ly/items/0Z040x2E2g2v2E1M2l38/Grab.png)

  You may specify the list of components to build, and their markup, styles, and javascript will be added to `./build/ui.{js,css}`:
  
  ![UIKit custom build](http://f.cl.ly/items/1B3C3g293y03372I1q1b/Grab.png)

## Running tests

  Tests are run with Mocha, first install the node.js deps:
  
      $ npm install

  Then run the tests:
  
      $ make test