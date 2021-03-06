
jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});

jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};

jade.templates["pastyche-background"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<img');
buf.push(attrs({ 'id':('pastiche-background'), 'src':('http://farm' + (farm) + '.staticflickr.com/' + (server) + '/' + (id) + '_' + (secret) + '_b.jpg'), "class": ('background-image') }, {"src":true}));
buf.push('/><div id="shade" class="shade"></div>');
}
return buf.join("");
}
jade.templates["pastyche"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="list-inline list-unstyled">');
// iterate photo
;(function(){
  if ('number' == typeof photo.length) {
    for (var $index = 0, $$l = photo.length; $index < $$l; $index++) {
      var image = photo[$index];

buf.push('<li><image');
buf.push(attrs({ 'src':('http://farm' + (image.farm) + '.staticflickr.com/' + (image.server) + '/' + (image.id) + '_' + (image.secret) + '.jpg'), 'data-id':('' + (image.id) + ''), "class": ('img-thumbnail') + ' ' + ('img-small') }, {"src":true,"data-id":true}));
buf.push('></image></li>');
    }
  } else {
    for (var $index in photo) {
      var image = photo[$index];

buf.push('<li><image');
buf.push(attrs({ 'src':('http://farm' + (image.farm) + '.staticflickr.com/' + (image.server) + '/' + (image.id) + '_' + (image.secret) + '.jpg'), 'data-id':('' + (image.id) + ''), "class": ('img-thumbnail') + ' ' + ('img-small') }, {"src":true,"data-id":true}));
buf.push('></image></li>');
   }
  }
}).call(this);

buf.push('</ul>');
}
return buf.join("");
}
jade.templates["slides-home"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
// iterate photos            
;(function(){
  if ('number' == typeof photos            .length) {
    for (var $index = 0, $$l = photos            .length; $index < $$l; $index++) {
      var image = photos            [$index];

buf.push('<div><img');
buf.push(attrs({ 'src':('http://farm' + (image.farm) + '.staticflickr.com/' + (image.server) + '/' + (image.id) + '_' + (image.secret) + '_b.jpg'), 'data-id':('' + (image.id) + ''), "class": ('background-image') }, {"src":true,"data-id":true}));
buf.push('/></div>');
    }
  } else {
    for (var $index in photos            ) {
      var image = photos            [$index];

buf.push('<div><img');
buf.push(attrs({ 'src':('http://farm' + (image.farm) + '.staticflickr.com/' + (image.server) + '/' + (image.id) + '_' + (image.secret) + '_b.jpg'), 'data-id':('' + (image.id) + ''), "class": ('background-image') }, {"src":true,"data-id":true}));
buf.push('/></div>');
   }
  }
}).call(this);

}
return buf.join("");
}
jade.templates["tag-cloud-template"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="list-inline">');
// iterate weights
;(function(){
  if ('number' == typeof weights.length) {
    for (var key = 0, $$l = weights.length; key < $$l; key++) {
      var val = weights[key];

buf.push('<li class="list-item"><a');
buf.push(attrs({ 'href':('#'), 'style':("font-size:" + (val) + ""), "class": ('btn') + ' ' + ('btn-default') + ' ' + ('tag') + ' ' + ('tag-btn') }, {"href":true,"style":true}));
buf.push('>' + escape((interp = key) == null ? '' : interp) + '</a></li>');
    }
  } else {
    for (var key in weights) {
      var val = weights[key];

buf.push('<li class="list-item"><a');
buf.push(attrs({ 'href':('#'), 'style':("font-size:" + (val) + ""), "class": ('btn') + ' ' + ('btn-default') + ' ' + ('tag') + ' ' + ('tag-btn') }, {"href":true,"style":true}));
buf.push('>' + escape((interp = key) == null ? '' : interp) + '</a></li>');
   }
  }
}).call(this);

buf.push('</ul>');
}
return buf.join("");
}
jade.templates["tags-link-template"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="nav navbar-nav"><li><a id="tags-link" href="#"><span class="glyphicon glyphicon-tags"> </span></a></li><li><a id="save-pastyche" href="/save" class="main-nav-link">Save Pastyche  </a></li></ul>');
}
return buf.join("");
}