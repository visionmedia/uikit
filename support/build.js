#!/usr/bin/env node


/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path');

// lib dir

var lib = 'lib/components';

// js

var js = fs.createWriteStream('build/ui.js', { flags: 'a' });

// components to build

var components = process.argv.slice(2);

function next(i) {
  var name = components[i];
  if (!name) return;
  build(name, function(){
    next(++i);
  });
}

// build em!

console.log();
js.write('var ui = {};\n');
next(0);
process.on('exit', function(){
  console.log();
});

/**
 * Build the given component.
 */

function build(name, fn) {
  // javascript
  var js = path.join(lib, name, name + '.js');
  read(js, function(js){

    // with template
    var html = path.join(lib, name, name + '.html');
    if (path.existsSync(html)) {
      read(html, function(html){
        js = '\n;(function(exports, html){\n'
          + js
          + '\n})(ui, ' + JSON.stringify(html) + ');';
        append('build/ui.js', js, function(){
          console.log('  \033[90mbuild \033[36m%s\033[m', name);
          fn();
        });
      });
    // without template
    } else {
      js = '\n;(function(exports){\n'
        + js
        + '\n})(ui);';
      append('build/ui.js', js, function(){
        console.log('  \033[90mbuild \033[36m%s\033[m', name);
        fn();
      });
    }
  });

  // style
  var css = path.join(lib, name, name + '.css');
  if (path.existsSync(css)) {
    read(css, function(css){
      css = css
        .replace(/transition/g, '-webkit-transition')
        .replace(/box-shadow/g, '-webkit-box-shadow')
        .replace(/border-radius/g, '-webkit-border-radius')
        .replace(/linear-gradient/g, '-webkit-linear-gradient');
      append('build/ui.css', css);
    });
  }
}

/**
 * Append to `file`.
 */

function append(file, str, fn) {
  fs.createWriteStream(file, { flags: 'a' })
    .write(str);
  fn && fn();
}

/**
 * Read the given `file`.
 */

function read(file, fn) {
  fs.readFile(file, 'utf8', function(err, str){
    if (err) throw err;
    fn(str);
  });
}