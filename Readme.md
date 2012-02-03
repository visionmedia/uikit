
 ![UIKit JavaScript component framework](http://f.cl.ly/items/2j0m3D1l1T041S1k463L/Grab.png)

  UIKit is a small collection of flexible, cohesive, decoupled components for the modern web. With an emphasis on (mostly) structure-only styling making it simple to apply application specific styling. UIKit is _not_ a replacement for larger UI frameworks, nor is it a CSS framework such as Bootstrap.

## Components

  - [ui.Emitter](https://github.com/visionmedia/uikit/tree/master/lib/components/emitter) an event emitter used throughout various components
  - [ui.Card](https://github.com/visionmedia/uikit/tree/master/lib/components/card) a double-sided "card" powered by 3d transforms
  - [ui.ColorPicker](https://github.com/visionmedia/uikit/tree/master/lib/components/color-picker) an elegant scalable color picker
  - [ui.Overlay](https://github.com/visionmedia/uikit/tree/master/lib/components/overlay) an overlay used by `ui.Dialog`
  - [ui.Dialog](https://github.com/visionmedia/uikit/tree/master/lib/components/dialog) a dialog component sporting optional modal and overlay functionality
  - [ui.Confirmation](https://github.com/visionmedia/uikit/tree/master/lib/components/confirmation) a confirmation dialog building on `ui.Dialog`
  - [ui.Notification](https://github.com/visionmedia/uikit/tree/master/lib/components/notification) an unobtrusive growl-like notification

## Custom builds

  Each release includes a pre-built `./build` directory containing _ui.js_ and _ui.css_,
  however if you wish you may re-build with `make`, by default including all components:

  ![UIKit build](http://f.cl.ly/items/0Z040x2E2g2v2E1M2l38/Grab.png)

  You may specify the list of components to build, and their markup, styles, and javascript will be added to `./build/ui.{js,css}`:
  
  ![UIKit custom build](http://f.cl.ly/items/1B3C3g293y03372I1q1b/Grab.png)