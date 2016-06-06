/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	__webpack_require__(12);

	__webpack_require__(15);

	__webpack_require__(16);

	__webpack_require__(17);

	var noUiSlider = __webpack_require__(22);

	riot.mixin('noUiSlider', { noUiSlider: noUiSlider }, true);
	riot.mount('*');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* Riot v2.4.1, @license MIT */

	;(function (window, undefined) {
	  'use strict';

	  var riot = { version: 'v2.4.1', settings: {} },

	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`

	  // counter to give a unique id to all the Tag instances
	  __uid = 0,

	  // tags instances cache
	  __virtualDom = [],

	  // tags implementation cache
	  __tagImpl = {},


	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',


	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	      RIOT_TAG = RIOT_PREFIX + 'tag',
	      RIOT_TAG_IS = 'data-is',


	  // for typeof == '' comparisons
	  T_STRING = 'string',
	      T_OBJECT = 'object',
	      T_UNDEF = 'undefined',
	      T_FUNCTION = 'function',

	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	      RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,

	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],


	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,


	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger;
	  /* istanbul ignore next */
	  riot.observable = function (el) {

	    /**
	     * Extend the original object or create a new empty one
	     * @type { Object }
	     */

	    el = el || {};

	    /**
	     * Private variables
	     */
	    var callbacks = {},
	        slice = Array.prototype.slice;

	    /**
	     * Private Methods
	     */

	    /**
	     * Helper function needed to get and loop all the events in a string
	     * @param   { String }   e - event string
	     * @param   {Function}   fn - callback
	     */
	    function onEachEvent(e, fn) {
	      var es = e.split(' '),
	          l = es.length,
	          i = 0,
	          name,
	          indx;
	      for (; i < l; i++) {
	        name = es[i];
	        indx = name.indexOf('.');
	        if (name) fn(~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null);
	      }
	    }

	    /**
	     * Public Api
	     */

	    // extend the el object adding the observable methods
	    Object.defineProperties(el, {
	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` each time an event is triggered.
	       * @param  { String } events - events ids
	       * @param  { Function } fn - callback function
	       * @returns { Object } el
	       */
	      on: {
	        value: function value(events, fn) {
	          if (typeof fn != 'function') return el;

	          onEachEvent(events, function (name, pos, ns) {
	            (callbacks[name] = callbacks[name] || []).push(fn);
	            fn.typed = pos > 0;
	            fn.ns = ns;
	          });

	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Removes the given space separated list of `events` listeners
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      off: {
	        value: function value(events, fn) {
	          if (events == '*' && !fn) callbacks = {};else {
	            onEachEvent(events, function (name, pos, ns) {
	              if (fn || ns) {
	                var arr = callbacks[name];
	                for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                  if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1);
	                }
	              } else delete callbacks[name];
	            });
	          }
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` at most once
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      one: {
	        value: function value(events, fn) {
	          function on() {
	            el.off(events, on);
	            fn.apply(el, arguments);
	          }
	          return el.on(events, on);
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Execute all callback functions that listen to
	       * the given space separated list of `events`
	       * @param   { String } events - events ids
	       * @returns { Object } el
	       */
	      trigger: {
	        value: function value(events) {

	          // getting the arguments
	          var arglen = arguments.length - 1,
	              args = new Array(arglen),
	              fns;

	          for (var i = 0; i < arglen; i++) {
	            args[i] = arguments[i + 1]; // skip first argument
	          }

	          onEachEvent(events, function (name, pos, ns) {

	            fns = slice.call(callbacks[name] || [], 0);

	            for (var i = 0, fn; fn = fns[i]; ++i) {
	              if (fn.busy) continue;
	              fn.busy = 1;
	              if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args);
	              if (fns[i] !== fn) {
	                i--;
	              }
	              fn.busy = 0;
	            }

	            if (callbacks['*'] && name != '*') el.trigger.apply(el, ['*', name].concat(args));
	          });

	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      }
	    });

	    return el;
	  }
	  /* istanbul ignore next */
	  ;(function (riot) {

	    /**
	     * Simple client-side router
	     * @module riot-route
	     */

	    var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	        EVENT_LISTENER = 'EventListener',
	        REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	        ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	        HAS_ATTRIBUTE = 'hasAttribute',
	        REPLACE = 'replace',
	        POPSTATE = 'popstate',
	        HASHCHANGE = 'hashchange',
	        TRIGGER = 'trigger',
	        MAX_EMIT_STACK_LEVEL = 3,
	        win = typeof window != 'undefined' && window,
	        doc = typeof document != 'undefined' && document,
	        hist = win && history,
	        loc = win && (hist.location || win.location),
	        // see html5-history-api
	    prot = Router.prototype,
	        // to minify more
	    clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	        started = false,
	        central = riot.observable(),
	        routeFound = false,
	        debouncedEmit,
	        base,
	        current,
	        parser,
	        secondParser,
	        emitStack = [],
	        emitStackLevel = 0;

	    /**
	     * Default parser. You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_PARSER(path) {
	      return path.split(/[/?#]/);
	    }

	    /**
	     * Default parser (second). You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @param {string} filter - filter string (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_SECOND_PARSER(path, filter) {
	      var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	          args = path.match(re);

	      if (args) return args.slice(1);
	    }

	    /**
	     * Simple/cheap debounce implementation
	     * @param   {function} fn - callback
	     * @param   {number} delay - delay in seconds
	     * @returns {function} debounced function
	     */
	    function debounce(fn, delay) {
	      var t;
	      return function () {
	        clearTimeout(t);
	        t = setTimeout(fn, delay);
	      };
	    }

	    /**
	     * Set the window listeners to trigger the routes
	     * @param {boolean} autoExec - see route.start
	     */
	    function start(autoExec) {
	      debouncedEmit = debounce(emit, 1);
	      win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[ADD_EVENT_LISTENER](clickEvent, click);
	      if (autoExec) emit(true);
	    }

	    /**
	     * Router class
	     */
	    function Router() {
	      this.$ = [];
	      riot.observable(this); // make it observable
	      central.on('stop', this.s.bind(this));
	      central.on('emit', this.e.bind(this));
	    }

	    function normalize(path) {
	      return path[REPLACE](/^\/|\/$/, '');
	    }

	    function isString(str) {
	      return typeof str == 'string';
	    }

	    /**
	     * Get the part after domain name
	     * @param {string} href - fullpath
	     * @returns {string} path from root
	     */
	    function getPathFromRoot(href) {
	      return (href || loc.href)[REPLACE](RE_ORIGIN, '');
	    }

	    /**
	     * Get the part after base
	     * @param {string} href - fullpath
	     * @returns {string} path from base
	     */
	    function getPathFromBase(href) {
	      return base[0] == '#' ? (href || loc.href || '').split(base)[1] || '' : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '');
	    }

	    function emit(force) {
	      // the stack is needed for redirections
	      var isRoot = emitStackLevel == 0;
	      if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return;

	      emitStackLevel++;
	      emitStack.push(function () {
	        var path = getPathFromBase();
	        if (force || path != current) {
	          central[TRIGGER]('emit', path);
	          current = path;
	        }
	      });
	      if (isRoot) {
	        while (emitStack.length) {
	          emitStack[0]();
	          emitStack.shift();
	        }
	        emitStackLevel = 0;
	      }
	    }

	    function click(e) {
	      if (e.which != 1 // not left click
	       || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	       || e.defaultPrevented // or default prevented
	      ) return;

	      var el = e.target;
	      while (el && el.nodeName != 'A') {
	        el = el.parentNode;
	      }if (!el || el.nodeName != 'A' // not A tag
	       || el[HAS_ATTRIBUTE]('download') // has download attr
	       || !el[HAS_ATTRIBUTE]('href') // has no href attr
	       || el.target && el.target != '_self' // another window or frame
	       || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	      ) return;

	      if (el.href != loc.href) {
	        if (el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	         || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	         || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	        ) return;
	      }

	      e.preventDefault();
	    }

	    /**
	     * Go to the path
	     * @param {string} path - destination path
	     * @param {string} title - page title
	     * @param {boolean} shouldReplace - use replaceState or pushState
	     * @returns {boolean} - route not found flag
	     */
	    function go(path, title, shouldReplace) {
	      if (hist) {
	        // if a browser
	        path = base + normalize(path);
	        title = title || doc.title;
	        // browsers ignores the second parameter `title`
	        shouldReplace ? hist.replaceState(null, title, path) : hist.pushState(null, title, path);
	        // so we need to set it manually
	        doc.title = title;
	        routeFound = false;
	        emit();
	        return routeFound;
	      }

	      // Server-side usage: directly execute handlers for the path
	      return central[TRIGGER]('emit', getPathFromBase(path));
	    }

	    /**
	     * Go to path or set action
	     * a single string:                go there
	     * two strings:                    go there with setting a title
	     * two strings and boolean:        replace history with setting a title
	     * a single function:              set an action on the default route
	     * a string/RegExp and a function: set an action on the route
	     * @param {(string|function)} first - path / action / filter
	     * @param {(string|RegExp|function)} second - title / action
	     * @param {boolean} third - replace flag
	     */
	    prot.m = function (first, second, third) {
	      if (isString(first) && (!second || isString(second))) go(first, second, third || false);else if (second) this.r(first, second);else this.r('@', first);
	    };

	    /**
	     * Stop routing
	     */
	    prot.s = function () {
	      this.off('*');
	      this.$ = [];
	    };

	    /**
	     * Emit
	     * @param {string} path - path
	     */
	    prot.e = function (path) {
	      this.$.concat('@').some(function (filter) {
	        var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter));
	        if (typeof args != 'undefined') {
	          this[TRIGGER].apply(null, [filter].concat(args));
	          return routeFound = true; // exit from loop
	        }
	      }, this);
	    };

	    /**
	     * Register route
	     * @param {string} filter - filter for matching to url
	     * @param {function} action - action to register
	     */
	    prot.r = function (filter, action) {
	      if (filter != '@') {
	        filter = '/' + normalize(filter);
	        this.$.push(filter);
	      }
	      this.on(filter, action);
	    };

	    var mainRouter = new Router();
	    var route = mainRouter.m.bind(mainRouter);

	    /**
	     * Create a sub router
	     * @returns {function} the method of a new Router object
	     */
	    route.create = function () {
	      var newSubRouter = new Router();
	      // assign sub-router's main method
	      var router = newSubRouter.m.bind(newSubRouter);
	      // stop only this sub-router
	      router.stop = newSubRouter.s.bind(newSubRouter);
	      return router;
	    };

	    /**
	     * Set the base of url
	     * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	     */
	    route.base = function (arg) {
	      base = arg || '#';
	      current = getPathFromBase(); // recalculate current path
	    };

	    /** Exec routing right now **/
	    route.exec = function () {
	      emit(true);
	    };

	    /**
	     * Replace the default router to yours
	     * @param {function} fn - your parser function
	     * @param {function} fn2 - your secondParser function
	     */
	    route.parser = function (fn, fn2) {
	      if (!fn && !fn2) {
	        // reset parser for testing...
	        parser = DEFAULT_PARSER;
	        secondParser = DEFAULT_SECOND_PARSER;
	      }
	      if (fn) parser = fn;
	      if (fn2) secondParser = fn2;
	    };

	    /**
	     * Helper function to get url query as an object
	     * @returns {object} parsed query
	     */
	    route.query = function () {
	      var q = {};
	      var href = loc.href || current;
	      href[REPLACE](/[?&](.+?)=([^&]*)/g, function (_, k, v) {
	        q[k] = v;
	      });
	      return q;
	    };

	    /** Stop routing **/
	    route.stop = function () {
	      if (started) {
	        if (win) {
	          win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	          win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	          doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	        }
	        central[TRIGGER]('stop');
	        started = false;
	      }
	    };

	    /**
	     * Start routing
	     * @param {boolean} autoExec - automatically exec after starting if true
	     */
	    route.start = function (autoExec) {
	      if (!started) {
	        if (win) {
	          if (document.readyState == 'complete') start(autoExec);
	          // the timeout is needed to solve
	          // a weird safari bug https://github.com/riot/route/issues/33
	          else win[ADD_EVENT_LISTENER]('load', function () {
	              setTimeout(function () {
	                start(autoExec);
	              }, 1);
	            });
	        }
	        started = true;
	      }
	    };

	    /** Prepare the router **/
	    route.base();
	    route.parser();

	    riot.route = route;
	  })(riot);
	  /* istanbul ignore next */

	  /**
	   * The riot template engine
	   * @version v2.4.0
	   */
	  /**
	   * riot.util.brackets
	   *
	   * - `brackets    ` - Returns a string or regex based on its parameter
	   * - `brackets.set` - Change the current riot brackets
	   *
	   * @module
	   */

	  var brackets = function (UNDEF) {

	    var REGLOB = 'g',
	        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	        FINDBRACES = {
	      '(': RegExp('([()])|' + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|' + S_QBLOCKS, REGLOB)
	    },
	        DEFAULT = '{ }';

	    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];

	    var cachedBrackets = UNDEF,
	        _regex,
	        _cache = [],
	        _settings;

	    function _loopback(re) {
	      return re;
	    }

	    function _rewrite(re, bp) {
	      if (!bp) bp = _cache;
	      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
	    }

	    function _create(pair) {
	      if (pair === DEFAULT) return _pairs;

	      var arr = pair.split(' ');

	      if (arr.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(pair)) {
	        // eslint-disable-line
	        throw new Error('Unsupported brackets "' + pair + '"');
	      }
	      arr = arr.concat(pair.replace(/(?=[[\]()*+?.^$|])/g, '\\').split(' '));

	      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	      arr[6] = _rewrite(_pairs[6], arr);
	      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	      arr[8] = pair;
	      return arr;
	    }

	    function _brackets(reOrIdx) {
	      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
	    }

	    _brackets.split = function split(str, tmpl, _bp) {
	      // istanbul ignore next: _bp is for the compiler
	      if (!_bp) _bp = _cache;

	      var parts = [],
	          match,
	          isexpr,
	          start,
	          pos,
	          re = _bp[6];

	      isexpr = start = re.lastIndex = 0;

	      while (match = re.exec(str)) {

	        pos = match.index;

	        if (isexpr) {

	          if (match[2]) {
	            re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	            continue;
	          }
	          if (!match[3]) {
	            continue;
	          }
	        }

	        if (!match[1]) {
	          unescapeStr(str.slice(start, pos));
	          start = re.lastIndex;
	          re = _bp[6 + (isexpr ^= 1)];
	          re.lastIndex = start;
	        }
	      }

	      if (str && start < str.length) {
	        unescapeStr(str.slice(start));
	      }

	      return parts;

	      function unescapeStr(s) {
	        if (tmpl || isexpr) {
	          parts.push(s && s.replace(_bp[5], '$1'));
	        } else {
	          parts.push(s);
	        }
	      }

	      function skipBraces(s, ch, ix) {
	        var match,
	            recch = FINDBRACES[ch];

	        recch.lastIndex = ix;
	        ix = 1;
	        while (match = recch.exec(s)) {
	          if (match[1] && !(match[1] === ch ? ++ix : --ix)) break;
	        }
	        return ix ? s.length : recch.lastIndex;
	      }
	    };

	    _brackets.hasExpr = function hasExpr(str) {
	      return _cache[4].test(str);
	    };

	    _brackets.loopKeys = function loopKeys(expr) {
	      var m = expr.match(_cache[9]);

	      return m ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] } : { val: expr.trim() };
	    };

	    _brackets.array = function array(pair) {
	      return pair ? _create(pair) : _cache;
	    };

	    function _reset(pair) {
	      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	        _cache = _create(pair);
	        _regex = pair === DEFAULT ? _loopback : _rewrite;
	        _cache[9] = _regex(_pairs[9]);
	      }
	      cachedBrackets = pair;
	    }

	    function _setSettings(o) {
	      var b;

	      o = o || {};
	      b = o.brackets;
	      Object.defineProperty(o, 'brackets', {
	        set: _reset,
	        get: function get() {
	          return cachedBrackets;
	        },
	        enumerable: true
	      });
	      _settings = o;
	      _reset(b);
	    }

	    Object.defineProperty(_brackets, 'settings', {
	      set: _setSettings,
	      get: function get() {
	        return _settings;
	      }
	    });

	    /* istanbul ignore next: in the browser riot is always in the scope */
	    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	    _brackets.set = _reset;

	    _brackets.R_STRINGS = R_STRINGS;
	    _brackets.R_MLCOMMS = R_MLCOMMS;
	    _brackets.S_QBLOCKS = S_QBLOCKS;

	    return _brackets;
	  }();

	  /**
	   * @module tmpl
	   *
	   * tmpl          - Root function, returns the template value, render with data
	   * tmpl.hasExpr  - Test the existence of a expression inside a string
	   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	   */

	  var tmpl = function () {

	    var _cache = {};

	    function _tmpl(str, data) {
	      if (!str) return str;

	      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr);
	    }

	    _tmpl.haveRaw = brackets.hasRaw;

	    _tmpl.hasExpr = brackets.hasExpr;

	    _tmpl.loopKeys = brackets.loopKeys;

	    _tmpl.errorHandler = null;

	    function _logErr(err, ctx) {

	      if (_tmpl.errorHandler) {

	        err.riotData = {
	          tagName: ctx && ctx.root && ctx.root.tagName,
	          _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
	        };
	        _tmpl.errorHandler(err);
	      }
	    }

	    function _create(str) {
	      var expr = _getTmpl(str);

	      if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr;

	      /* eslint-disable */

	      return new Function('E', expr + ';');
	      /* eslint-enable */
	    }

	    var CH_IDEXPR = '⁗',
	        RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	        RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	        RE_DQUOTE = /\u2057/g,
	        RE_QBMARK = /\u2057(\d+)~/g;

	    function _getTmpl(str) {
	      var qstr = [],
	          expr,
	          parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

	      if (parts.length > 2 || parts[0]) {
	        var i,
	            j,
	            list = [];

	        for (i = j = 0; i < parts.length; ++i) {

	          expr = parts[i];

	          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) list[j++] = expr;
	        }

	        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
	      } else {

	        expr = _parseExpr(parts[1], 0, qstr);
	      }

	      if (qstr[0]) {
	        expr = expr.replace(RE_QBMARK, function (_, pos) {
	          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
	        });
	      }
	      return expr;
	    }

	    var RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };

	    function _parseExpr(expr, asText, qstr) {

	      expr = expr.replace(RE_QBLOCK, function (s, div) {
	        return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s;
	      }).replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

	      if (expr) {
	        var list = [],
	            cnt = 0,
	            match;

	        while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
	          var key,
	              jsb,
	              re = /,|([[{(])|$/g;

	          expr = RegExp.rightContext;
	          key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

	          while (jsb = (match = re.exec(expr))[1]) {
	            skipBraces(jsb, re);
	          }jsb = expr.slice(0, match.index);
	          expr = RegExp.rightContext;

	          list[cnt++] = _wrapExpr(jsb, 1, key);
	        }

	        expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	      }
	      return expr;

	      function skipBraces(ch, re) {
	        var mm,
	            lv = 1,
	            ir = RE_BREND[ch];

	        ir.lastIndex = re.lastIndex;
	        while (mm = ir.exec(expr)) {
	          if (mm[0] === ch) ++lv;else if (! --lv) break;
	        }
	        re.lastIndex = lv ? expr.length : ir.lastIndex;
	      }
	    }

	    // istanbul ignore next: not both
	    var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
	        JS_VARNAME = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

	    function _wrapExpr(expr, asText, key) {
	      var tb;

	      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	        if (mvar) {
	          pos = tb ? 0 : pos + match.length;

	          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	            match = p + '("' + mvar + JS_CONTEXT + mvar;
	            if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '[';
	          } else if (pos) {
	            tb = !JS_NOPROPS.test(s.slice(pos));
	          }
	        }
	        return match;
	      });

	      if (tb) {
	        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	      }

	      if (key) {

	        expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
	      } else if (asText) {

	        expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
	      }

	      return expr;
	    }

	    // istanbul ignore next: compatibility fix for beta versions
	    _tmpl.parse = function (s) {
	      return s;
	    };

	    _tmpl.version = brackets.version = 'v2.4.0';

	    return _tmpl;
	  }();

	  /*
	    lib/browser/tag/mkdom.js
	  
	    Includes hacks needed for the Internet Explorer version 9 and below
	    See: http://kangax.github.io/compat-table/es5/#ie8
	         http://codeplanet.io/dropping-ie8/
	  */
	  var mkdom = function _mkdom() {
	    var reHasYield = /<yield\b/i,
	        reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
	        reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	        reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	    var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	        tblTags = IE_VERSION && IE_VERSION < 10 ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;

	    /**
	     * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	     * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	     *
	     * @param   {string} templ  - The template coming from the custom tag definition
	     * @param   {string} [html] - HTML content that comes from the DOM element where you
	     *           will mount the tag, mostly the original tag in the page
	     * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	     */
	    function _mkdom(templ, html) {
	      var match = templ && templ.match(/^\s*<([-\w]+)/),
	          tagName = match && match[1].toLowerCase(),
	          el = mkEl('div', isSVGTag(tagName));

	      // replace all the yield tags with the tag inner html
	      templ = replaceYield(templ, html);

	      /* istanbul ignore next */
	      if (tblTags.test(tagName)) el = specialTags(el, templ, tagName);else setInnerHTML(el, templ);

	      el.stub = true;

	      return el;
	    }

	    /*
	      Creates the root element for table or select child elements:
	      tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	    */
	    function specialTags(el, templ, tagName) {
	      var select = tagName[0] === 'o',
	          parent = select ? 'select>' : 'table>';

	      // trim() is important here, this ensures we don't have artifacts,
	      // so we can check if we have only one element inside the parent
	      el.innerHTML = '<' + parent + templ.trim() + '</' + parent;
	      parent = el.firstChild;

	      // returns the immediate parent if tr/th/td/col is the only element, if not
	      // returns the whole tree, as this can include additional elements
	      if (select) {
	        parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
	      } else {
	          // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	          var tname = rootEls[tagName];
	          if (tname && parent.childElementCount === 1) parent = $(tname, parent);
	        }
	      return parent;
	    }

	    /*
	      Replace the yield tag from any tag template with the innerHTML of the
	      original tag in the page
	    */
	    function replaceYield(templ, html) {
	      // do nothing if no yield
	      if (!reHasYield.test(templ)) return templ;

	      // be careful with #1343 - string on the source having `$1`
	      var src = {};

	      html = html && html.replace(reYieldSrc, function (_, ref, text) {
	        src[ref] = src[ref] || text; // preserve first definition
	        return '';
	      }).trim();

	      return templ.replace(reYieldDest, function (_, ref, def) {
	        // yield with from - to attrs
	        return src[ref] || def || '';
	      }).replace(reYieldAll, function (_, def) {
	        // yield without any "from"
	        return html || def || '';
	      });
	    }

	    return _mkdom;
	  }();

	  /**
	   * Convert the item looped into an object used to extend the child tag properties
	   * @param   { Object } expr - object containing the keys used to extend the children tags
	   * @param   { * } key - value to assign to the new object returned
	   * @param   { * } val - value containing the position of the item in the array
	   * @returns { Object } - new object containing the values of the original item
	   *
	   * The variables 'key' and 'val' are arbitrary.
	   * They depend on the collection type looped (Array, Object)
	   * and on the expression used on the each tag
	   *
	   */
	  function mkitem(expr, key, val) {
	    var item = {};
	    item[expr.key] = key;
	    if (expr.pos) item[expr.pos] = val;
	    return item;
	  }

	  /**
	   * Unmount the redundant tags
	   * @param   { Array } items - array containing the current items to loop
	   * @param   { Array } tags - array containing all the children tags
	   */
	  function unmountRedundant(items, tags) {

	    var i = tags.length,
	        j = items.length,
	        t;

	    while (i > j) {
	      t = tags[--i];
	      tags.splice(i, 1);
	      t.unmount();
	    }
	  }

	  /**
	   * Move the nested custom tags in non custom loop tags
	   * @param   { Object } child - non custom loop tag
	   * @param   { Number } i - current position of the loop tag
	   */
	  function moveNestedTags(child, i) {
	    Object.keys(child.tags).forEach(function (tagName) {
	      var tag = child.tags[tagName];
	      if (isArray(tag)) each(tag, function (t) {
	        moveChildTag(t, tagName, i);
	      });else moveChildTag(tag, tagName, i);
	    });
	  }

	  /**
	   * Adds the elements for a virtual tag
	   * @param { Tag } tag - the tag whose root's children will be inserted or appended
	   * @param { Node } src - the node that will do the inserting or appending
	   * @param { Tag } target - only if inserting, insert before this tag's first child
	   */
	  function addVirtual(tag, src, target) {
	    var el = tag._root,
	        sib;
	    tag._virts = [];
	    while (el) {
	      sib = el.nextSibling;
	      if (target) src.insertBefore(el, target._root);else src.appendChild(el);

	      tag._virts.push(el); // hold for unmounting
	      el = sib;
	    }
	  }

	  /**
	   * Move virtual tag and all child nodes
	   * @param { Tag } tag - first child reference used to start move
	   * @param { Node } src  - the node that will do the inserting
	   * @param { Tag } target - insert before this tag's first child
	   * @param { Number } len - how many child nodes to move
	   */
	  function moveVirtual(tag, src, target, len) {
	    var el = tag._root,
	        sib,
	        i = 0;
	    for (; i < len; i++) {
	      sib = el.nextSibling;
	      src.insertBefore(el, target._root);
	      el = sib;
	    }
	  }

	  /**
	   * Manage tags having the 'each'
	   * @param   { Object } dom - DOM node we need to loop
	   * @param   { Tag } parent - parent tag instance where the dom node is contained
	   * @param   { String } expr - string contained in the 'each' attribute
	   */
	  function _each(dom, parent, expr) {

	    // remove the each property from the original tag
	    remAttr(dom, 'each');

	    var mustReorder = _typeof(getAttr(dom, 'no-reorder')) !== T_STRING || remAttr(dom, 'no-reorder'),
	        tagName = getTagName(dom),
	        impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	        useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	        root = dom.parentNode,
	        ref = document.createTextNode(''),
	        child = getTag(dom),
	        isOption = tagName.toLowerCase() === 'option',
	        // the option tags must be treated differently
	    tags = [],
	        oldItems = [],
	        hasKeys,
	        isVirtual = dom.tagName == 'VIRTUAL';

	    // parse the each expression
	    expr = tmpl.loopKeys(expr);

	    // insert a marked where the loop tags will be injected
	    root.insertBefore(ref, dom);

	    // clean template code
	    parent.one('before-mount', function () {

	      // remove the original DOM node
	      dom.parentNode.removeChild(dom);
	      if (root.stub) root = parent.root;
	    }).on('update', function () {
	      // get the new items collection
	      var items = tmpl(expr.val, parent),

	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment();

	      // object loop. any changes cause full redraw
	      if (!isArray(items)) {
	        hasKeys = items || false;
	        items = hasKeys ? Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key]);
	        }) : [];
	      }

	      // loop all the new items
	      var i = 0,
	          itemsLength = items.length;

	      for (; i < itemsLength; i++) {
	        // reorder only if the items are objects
	        var item = items[i],
	            _mustReorder = mustReorder && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == T_OBJECT && !hasKeys,
	            oldPos = oldItems.indexOf(item),
	            pos = ~oldPos && _mustReorder ? oldPos : i,

	        // does a tag exist in this position?
	        tag = tags[pos];

	        item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

	        // new tag
	        if (!_mustReorder && !tag // with no-reorder we just update the old tags
	         || _mustReorder && ! ~oldPos || !tag // by default we always try to reorder the DOM elements
	        ) {

	            tag = new Tag(impl, {
	              parent: parent,
	              isLoop: true,
	              hasImpl: !!__tagImpl[tagName],
	              root: useRoot ? root : dom.cloneNode(),
	              item: item
	            }, dom.innerHTML);

	            tag.mount();

	            if (isVirtual) tag._root = tag.root.firstChild; // save reference for further moves or inserts
	            // this tag must be appended
	            if (i == tags.length || !tags[i]) {
	              // fix 1581
	              if (isVirtual) addVirtual(tag, frag);else frag.appendChild(tag.root);
	            }
	            // this tag must be insert
	            else {
	                if (isVirtual) addVirtual(tag, root, tags[i]);else root.insertBefore(tag.root, tags[i].root); // #1374 some browsers reset selected here
	                oldItems.splice(i, 0, item);
	              }

	            tags.splice(i, 0, tag);
	            pos = i; // handled here so no move
	          } else tag.update(item, true);

	        // reorder the tag if it's not located in its previous position
	        if (pos !== i && _mustReorder && tags[i] // fix 1581 unable to reproduce it in a test!
	        ) {
	            // update the DOM
	            if (isVirtual) moveVirtual(tag, root, tags[i], dom.childNodes.length);else root.insertBefore(tag.root, tags[i].root);
	            // update the position attribute if it exists
	            if (expr.pos) tag[expr.pos] = i;
	            // move the old tag instance
	            tags.splice(i, 0, tags.splice(pos, 1)[0]);
	            // move the old item
	            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	            // if the loop tags are not custom
	            // we need to move all their custom tags into the right position
	            if (!child && tag.tags) moveNestedTags(tag, i);
	          }

	        // cache the original item to use it in the events bound to this node
	        // and its children
	        tag._item = item;
	        // cache the real parent tag internally
	        defineProperty(tag, '_parent', parent);
	      }

	      // remove the redundant tags
	      unmountRedundant(items, tags);

	      // insert the new nodes
	      if (isOption) {
	        root.appendChild(frag);

	        // #1374 FireFox bug in <option selected={expression}>
	        if (FIREFOX && !root.multiple) {
	          for (var n = 0; n < root.length; n++) {
	            if (root[n].__riot1374) {
	              root.selectedIndex = n; // clear other options
	              delete root[n].__riot1374;
	              break;
	            }
	          }
	        }
	      } else root.insertBefore(frag, ref);

	      // set the 'tags' property of the parent tag
	      // if child is 'undefined' it means that we don't need to set this property
	      // for example:
	      // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	      // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	      if (child) parent.tags[tagName] = tags;

	      // clone the items array
	      oldItems = items.slice();
	    });
	  }
	  /**
	   * Object that will be used to inject and manage the css of every tag instance
	   */
	  var styleManager = function (_riot) {

	    if (!window) return { // skip injection on the server
	      add: function add() {},
	      inject: function inject() {}
	    };

	    var styleNode = function () {
	      // create a new style element with the correct type
	      var newNode = mkEl('style');
	      setAttr(newNode, 'type', 'text/css');

	      // replace any user node or insert the new one into the head
	      var userNode = $('style[type=riot]');
	      if (userNode) {
	        if (userNode.id) newNode.id = userNode.id;
	        userNode.parentNode.replaceChild(newNode, userNode);
	      } else document.getElementsByTagName('head')[0].appendChild(newNode);

	      return newNode;
	    }();

	    // Create cache and shortcut to the correct property
	    var cssTextProp = styleNode.styleSheet,
	        stylesToInject = '';

	    // Expose the style node in a non-modificable property
	    Object.defineProperty(_riot, 'styleNode', {
	      value: styleNode,
	      writable: true
	    });

	    /**
	     * Public api
	     */
	    return {
	      /**
	       * Save a tag style to be later injected into DOM
	       * @param   { String } css [description]
	       */
	      add: function add(css) {
	        stylesToInject += css;
	      },
	      /**
	       * Inject all previously saved tag styles into DOM
	       * innerHTML seems slow: http://jsperf.com/riot-insert-style
	       */
	      inject: function inject() {
	        if (stylesToInject) {
	          if (cssTextProp) cssTextProp.cssText += stylesToInject;else styleNode.innerHTML += stylesToInject;
	          stylesToInject = '';
	        }
	      }
	    };
	  }(riot);

	  function parseNamedElements(root, tag, childTags, forceParsingNamed) {

	    walk(root, function (dom) {
	      if (dom.nodeType == 1) {
	        dom.isLoop = dom.isLoop || dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each') ? 1 : 0;

	        // custom child tag
	        if (childTags) {
	          var child = getTag(dom);

	          if (child && !dom.isLoop) childTags.push(initChildTag(child, { root: dom, parent: tag }, dom.innerHTML, tag));
	        }

	        if (!dom.isLoop || forceParsingNamed) setNamed(dom, tag, []);
	      }
	    });
	  }

	  function parseExpressions(root, tag, expressions) {

	    function addExpr(dom, val, extra) {
	      if (tmpl.hasExpr(val)) {
	        expressions.push(extend({ dom: dom, expr: val }, extra));
	      }
	    }

	    walk(root, function (dom) {
	      var type = dom.nodeType,
	          attr;

	      // text node
	      if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue);
	      if (type != 1) return;

	      /* element */

	      // loop
	      attr = getAttr(dom, 'each');

	      if (attr) {
	        _each(dom, tag, attr);return false;
	      }

	      // attribute expressions
	      each(dom.attributes, function (attr) {
	        var name = attr.name,
	            bool = name.split('__')[1];

	        addExpr(dom, attr.value, { attr: bool || name, bool: bool });
	        if (bool) {
	          remAttr(dom, name);return false;
	        }
	      });

	      // skip custom tags
	      if (getTag(dom)) return false;
	    });
	  }
	  function Tag(impl, conf, innerHTML) {

	    var self = riot.observable(this),
	        opts = inherit(conf.opts) || {},
	        parent = conf.parent,
	        isLoop = conf.isLoop,
	        hasImpl = conf.hasImpl,
	        item = cleanUpData(conf.item),
	        expressions = [],
	        childTags = [],
	        root = conf.root,
	        tagName = root.tagName.toLowerCase(),
	        attr = {},
	        propsInSyncWithParent = [],
	        dom;

	    // only call unmount if we have a valid __tagImpl (has name property)
	    if (impl.name && root._tag) root._tag.unmount(true);

	    // not yet mounted
	    this.isMounted = false;
	    root.isLoop = isLoop;

	    // keep a reference to the tag just created
	    // so we will be able to mount this tag multiple times
	    root._tag = this;

	    // create a unique id to this tag
	    // it could be handy to use it also to improve the virtual dom rendering speed
	    defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id

	    extend(this, { parent: parent, root: root, opts: opts }, item);
	    // protect the "tags" property from being overridden
	    defineProperty(this, 'tags', {});

	    // grab attributes
	    each(root.attributes, function (el) {
	      var val = el.value;
	      // remember attributes with expressions only
	      if (tmpl.hasExpr(val)) attr[el.name] = val;
	    });

	    dom = mkdom(impl.tmpl, innerHTML);

	    // options
	    function updateOpts() {
	      var ctx = hasImpl && isLoop ? self : parent || self;

	      // update opts from current DOM attributes
	      each(root.attributes, function (el) {
	        var val = el.value;
	        opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val;
	      });
	      // recover those with expressions
	      each(Object.keys(attr), function (name) {
	        opts[toCamel(name)] = tmpl(attr[name], ctx);
	      });
	    }

	    function normalizeData(data) {
	      for (var key in item) {
	        if (_typeof(self[key]) !== T_UNDEF && isWritable(self, key)) self[key] = data[key];
	      }
	    }

	    function inheritFromParent() {
	      if (!self.parent || !isLoop) return;
	      each(Object.keys(self.parent), function (k) {
	        // some properties must be always in sync with the parent tag
	        var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k);
	        if (_typeof(self[k]) === T_UNDEF || mustSync) {
	          // track the property to keep in sync
	          // so we can keep it updated
	          if (!mustSync) propsInSyncWithParent.push(k);
	          self[k] = self.parent[k];
	        }
	      });
	    }

	    /**
	     * Update the tag expressions and options
	     * @param   { * }  data - data we want to use to extend the tag properties
	     * @param   { Boolean } isInherited - is this update coming from a parent tag?
	     * @returns { self }
	     */
	    defineProperty(this, 'update', function (data, isInherited) {

	      // make sure the data passed will not override
	      // the component core methods
	      data = cleanUpData(data);
	      // inherit properties from the parent
	      inheritFromParent();
	      // normalize the tag properties in case an item object was initially passed
	      if (data && isObject(item)) {
	        normalizeData(data);
	        item = data;
	      }
	      extend(self, data);
	      updateOpts();
	      self.trigger('update', data);
	      update(expressions, self);

	      // the updated event will be triggered
	      // once the DOM will be ready and all the re-flows are completed
	      // this is useful if you want to get the "real" root properties
	      // 4 ex: root.offsetWidth ...
	      if (isInherited && self.parent)
	        // closes #1599
	        self.parent.one('updated', function () {
	          self.trigger('updated');
	        });else rAF(function () {
	        self.trigger('updated');
	      });

	      return this;
	    });

	    defineProperty(this, 'mixin', function () {
	      each(arguments, function (mix) {
	        var instance;

	        mix = (typeof mix === 'undefined' ? 'undefined' : _typeof(mix)) === T_STRING ? riot.mixin(mix) : mix;

	        // check if the mixin is a function
	        if (isFunction(mix)) {
	          // create the new mixin instance
	          instance = new mix();
	          // save the prototype to loop it afterwards
	          mix = mix.prototype;
	        } else instance = mix;

	        // loop the keys in the function prototype or the all object keys
	        each(Object.getOwnPropertyNames(mix), function (key) {
	          // bind methods to self
	          if (key != 'init') self[key] = isFunction(instance[key]) ? instance[key].bind(self) : instance[key];
	        });

	        // init method will be called automatically
	        if (instance.init) instance.init.bind(self)();
	      });
	      return this;
	    });

	    defineProperty(this, 'mount', function () {

	      updateOpts();

	      // add global mixins
	      var globalMixin = riot.mixin(GLOBAL_MIXIN);
	      if (globalMixin) for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) self.mixin(globalMixin[i]);
	      } // initialiation
	      if (impl.fn) impl.fn.call(self, opts);

	      // parse layout after init. fn may calculate args for nested custom tags
	      parseExpressions(dom, self, expressions);

	      // mount the child tags
	      toggle(true);

	      // update the root adding custom attributes coming from the compiler
	      // it fixes also #1087
	      if (impl.attrs) walkAttributes(impl.attrs, function (k, v) {
	        setAttr(root, k, v);
	      });
	      if (impl.attrs || hasImpl) parseExpressions(self.root, self, expressions);

	      if (!self.parent || isLoop) self.update(item);

	      // internal use only, fixes #403
	      self.trigger('before-mount');

	      if (isLoop && !hasImpl) {
	        // update the root attribute for the looped elements
	        root = dom.firstChild;
	      } else {
	        while (dom.firstChild) {
	          root.appendChild(dom.firstChild);
	        }if (root.stub) root = parent.root;
	      }

	      defineProperty(self, 'root', root);

	      // parse the named dom nodes in the looped child
	      // adding them to the parent as well
	      if (isLoop) parseNamedElements(self.root, self.parent, null, true);

	      // if it's not a child tag we can trigger its mount event
	      if (!self.parent || self.parent.isMounted) {
	        self.isMounted = true;
	        self.trigger('mount');
	      }
	      // otherwise we need to wait that the parent event gets triggered
	      else self.parent.one('mount', function () {
	          // avoid to trigger the `mount` event for the tags
	          // not visible included in an if statement
	          if (!isInStub(self.root)) {
	            self.parent.isMounted = self.isMounted = true;
	            self.trigger('mount');
	          }
	        });
	    });

	    defineProperty(this, 'unmount', function (keepRootTag) {
	      var el = root,
	          p = el.parentNode,
	          ptag,
	          tagIndex = __virtualDom.indexOf(self);

	      self.trigger('before-unmount');

	      // remove this tag instance from the global virtualDom variable
	      if (~tagIndex) __virtualDom.splice(tagIndex, 1);

	      if (p) {

	        if (parent) {
	          ptag = getImmediateCustomParentTag(parent);
	          // remove this tag from the parent tags object
	          // if there are multiple nested tags with same name..
	          // remove this element form the array
	          if (isArray(ptag.tags[tagName])) each(ptag.tags[tagName], function (tag, i) {
	            if (tag._riot_id == self._riot_id) ptag.tags[tagName].splice(i, 1);
	          });else
	            // otherwise just delete the tag instance
	            ptag.tags[tagName] = undefined;
	        } else while (el.firstChild) {
	          el.removeChild(el.firstChild);
	        }if (!keepRootTag) p.removeChild(el);else {
	          // the riot-tag and the data-is attributes aren't needed anymore, remove them
	          remAttr(p, RIOT_TAG_IS);
	          remAttr(p, RIOT_TAG); // this will be removed in riot 3.0.0
	        }
	      }

	      if (this._virts) {
	        each(this._virts, function (v) {
	          if (v.parentNode) v.parentNode.removeChild(v);
	        });
	      }

	      self.trigger('unmount');
	      toggle();
	      self.off('*');
	      self.isMounted = false;
	      delete root._tag;
	    });

	    // proxy function to bind updates
	    // dispatched from a parent tag
	    function onChildUpdate(data) {
	      self.update(data, true);
	    }

	    function toggle(isMount) {

	      // mount/unmount children
	      each(childTags, function (child) {
	        child[isMount ? 'mount' : 'unmount']();
	      });

	      // listen/unlisten parent (events flow one way from parent to children)
	      if (!parent) return;
	      var evt = isMount ? 'on' : 'off';

	      // the loop tags will be always in sync with the parent automatically
	      if (isLoop) parent[evt]('unmount', self.unmount);else {
	        parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount);
	      }
	    }

	    // named elements available for fn
	    parseNamedElements(dom, this, childTags);
	  }
	  /**
	   * Attach an event to a DOM node
	   * @param { String } name - event name
	   * @param { Function } handler - event callback
	   * @param { Object } dom - dom node
	   * @param { Tag } tag - tag instance
	   */
	  function setEventHandler(name, handler, dom, tag) {

	    dom[name] = function (e) {

	      var ptag = tag._parent,
	          item = tag._item,
	          el;

	      if (!item) while (ptag && !item) {
	        item = ptag._item;
	        ptag = ptag._parent;
	      }

	      // cross browser event fix
	      e = e || window.event;

	      // override the event properties
	      if (isWritable(e, 'currentTarget')) e.currentTarget = dom;
	      if (isWritable(e, 'target')) e.target = e.srcElement;
	      if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode;

	      e.item = item;

	      // prevent default behaviour (by default)
	      if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	        if (e.preventDefault) e.preventDefault();
	        e.returnValue = false;
	      }

	      if (!e.preventUpdate) {
	        el = item ? getImmediateCustomParentTag(ptag) : tag;
	        el.update();
	      }
	    };
	  }

	  /**
	   * Insert a DOM node replacing another one (used by if- attribute)
	   * @param   { Object } root - parent node
	   * @param   { Object } node - node replaced
	   * @param   { Object } before - node added
	   */
	  function insertTo(root, node, before) {
	    if (!root) return;
	    root.insertBefore(before, node);
	    root.removeChild(node);
	  }

	  /**
	   * Update the expressions in a Tag instance
	   * @param   { Array } expressions - expression that must be re evaluated
	   * @param   { Tag } tag - tag instance
	   */
	  function update(expressions, tag) {

	    each(expressions, function (expr, i) {

	      var dom = expr.dom,
	          attrName = expr.attr,
	          value = tmpl(expr.expr, tag),
	          parent = expr.dom.parentNode;

	      if (expr.bool) {
	        value = !!value;
	      } else if (value == null) {
	        value = '';
	      }

	      // #1638: regression of #1612, update the dom only if the value of the
	      // expression was changed
	      if (expr.value === value) {
	        return;
	      }
	      expr.value = value;

	      // textarea and text nodes has no attribute name
	      if (!attrName) {
	        // about #815 w/o replace: the browser converts the value to a string,
	        // the comparison by "==" does too, but not in the server
	        value += '';
	        // test for parent avoids error with invalid assignment to nodeValue
	        if (parent) {
	          if (parent.tagName === 'TEXTAREA') {
	            parent.value = value; // #1113
	            if (!IE_VERSION) dom.nodeValue = value; // #1625 IE throws here, nodeValue
	          } // will be available on 'updated'
	          else dom.nodeValue = value;
	        }
	        return;
	      }

	      // ~~#1612: look for changes in dom.value when updating the value~~
	      if (attrName === 'value') {
	        dom.value = value;
	        return;
	      }

	      // remove original attribute
	      remAttr(dom, attrName);

	      // event handler
	      if (isFunction(value)) {
	        setEventHandler(attrName, value, dom, tag);

	        // if- conditional
	      } else if (attrName == 'if') {
	          var stub = expr.stub,
	              add = function add() {
	            insertTo(stub.parentNode, stub, dom);
	          },
	              remove = function remove() {
	            insertTo(dom.parentNode, dom, stub);
	          };

	          // add to DOM
	          if (value) {
	            if (stub) {
	              add();
	              dom.inStub = false;
	              // avoid to trigger the mount event if the tags is not visible yet
	              // maybe we can optimize this avoiding to mount the tag at all
	              if (!isInStub(dom)) {
	                walk(dom, function (el) {
	                  if (el._tag && !el._tag.isMounted) el._tag.isMounted = !!el._tag.trigger('mount');
	                });
	              }
	            }
	            // remove from DOM
	          } else {
	              stub = expr.stub = stub || document.createTextNode('');
	              // if the parentNode is defined we can easily replace the tag
	              if (dom.parentNode) remove();
	              // otherwise we need to wait the updated event
	              else (tag.parent || tag).one('updated', remove);

	              dom.inStub = true;
	            }
	          // show / hide
	        } else if (attrName === 'show') {
	            dom.style.display = value ? '' : 'none';
	          } else if (attrName === 'hide') {
	            dom.style.display = value ? 'none' : '';
	          } else if (expr.bool) {
	            dom[attrName] = value;
	            if (value) setAttr(dom, attrName, attrName);
	            if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	              dom.__riot1374 = value; // #1374
	            }
	          } else if (value === 0 || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== T_OBJECT) {
	              // <img src="{ expr }">
	              if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	                attrName = attrName.slice(RIOT_PREFIX.length);
	              }
	              setAttr(dom, attrName, value);
	            }
	    });
	  }
	  /**
	   * Specialized function for looping an array-like collection with `each={}`
	   * @param   { Array } els - collection of items
	   * @param   {Function} fn - callback function
	   * @returns { Array } the array looped
	   */
	  function each(els, fn) {
	    var len = els ? els.length : 0;

	    for (var i = 0, el; i < len; i++) {
	      el = els[i];
	      // return false -> current item was removed by fn during the loop
	      if (el != null && fn(el, i) === false) i--;
	    }
	    return els;
	  }

	  /**
	   * Detect if the argument passed is a function
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isFunction(v) {
	    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_FUNCTION || false; // avoid IE problems
	  }

	  /**
	   * Get the outer html of any DOM node SVGs included
	   * @param   { Object } el - DOM node to parse
	   * @returns { String } el.outerHTML
	   */
	  function getOuterHTML(el) {
	    if (el.outerHTML) return el.outerHTML;
	    // some browsers do not support outerHTML on the SVGs tags
	    else {
	        var container = mkEl('div');
	        container.appendChild(el.cloneNode(true));
	        return container.innerHTML;
	      }
	  }

	  /**
	   * Set the inner html of any DOM node SVGs included
	   * @param { Object } container - DOM node where we will inject the new html
	   * @param { String } html - html to inject
	   */
	  function setInnerHTML(container, html) {
	    if (_typeof(container.innerHTML) != T_UNDEF) container.innerHTML = html;
	    // some browsers do not support innerHTML on the SVGs tags
	    else {
	        var doc = new DOMParser().parseFromString(html, 'application/xml');
	        container.appendChild(container.ownerDocument.importNode(doc.documentElement, true));
	      }
	  }

	  /**
	   * Checks wether a DOM node must be considered part of an svg document
	   * @param   { String }  name - tag name
	   * @returns { Boolean } -
	   */
	  function isSVGTag(name) {
	    return ~SVG_TAGS_LIST.indexOf(name);
	  }

	  /**
	   * Detect if the argument passed is an object, exclude null.
	   * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isObject(v) {
	    return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_OBJECT; // typeof null is 'object'
	  }

	  /**
	   * Remove any DOM attribute from a node
	   * @param   { Object } dom - DOM node we want to update
	   * @param   { String } name - name of the property we want to remove
	   */
	  function remAttr(dom, name) {
	    dom.removeAttribute(name);
	  }

	  /**
	   * Convert a string containing dashes to camel case
	   * @param   { String } string - input string
	   * @returns { String } my-string -> myString
	   */
	  function toCamel(string) {
	    return string.replace(/-(\w)/g, function (_, c) {
	      return c.toUpperCase();
	    });
	  }

	  /**
	   * Get the value of any DOM attribute on a node
	   * @param   { Object } dom - DOM node we want to parse
	   * @param   { String } name - name of the attribute we want to get
	   * @returns { String | undefined } name of the node attribute whether it exists
	   */
	  function getAttr(dom, name) {
	    return dom.getAttribute(name);
	  }

	  /**
	   * Set any DOM attribute
	   * @param { Object } dom - DOM node we want to update
	   * @param { String } name - name of the property we want to set
	   * @param { String } val - value of the property we want to set
	   */
	  function setAttr(dom, name, val) {
	    dom.setAttribute(name, val);
	  }

	  /**
	   * Detect the tag implementation by a DOM node
	   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	   */
	  function getTag(dom) {
	    return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) || getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()];
	  }
	  /**
	   * Add a child tag to its parent into the `tags` object
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the new tag will be stored
	   * @param   { Object } parent - tag instance where the new child tag will be included
	   */
	  function addChildTag(tag, tagName, parent) {
	    var cachedTag = parent.tags[tagName];

	    // if there are multiple children tags having the same name
	    if (cachedTag) {
	      // if the parent tags property is not yet an array
	      // create it adding the first cached tag
	      if (!isArray(cachedTag))
	        // don't add the same tag twice
	        if (cachedTag !== tag) parent.tags[tagName] = [cachedTag];
	      // add the new nested tag to the array
	      if (!contains(parent.tags[tagName], tag)) parent.tags[tagName].push(tag);
	    } else {
	      parent.tags[tagName] = tag;
	    }
	  }

	  /**
	   * Move the position of a custom tag in its parent tag
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the tag was stored
	   * @param   { Number } newPos - index where the new tag will be stored
	   */
	  function moveChildTag(tag, tagName, newPos) {
	    var parent = tag.parent,
	        tags;
	    // no parent no move
	    if (!parent) return;

	    tags = parent.tags[tagName];

	    if (isArray(tags)) tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0]);else addChildTag(tag, tagName, parent);
	  }

	  /**
	   * Create a new child tag including it correctly into its parent
	   * @param   { Object } child - child tag implementation
	   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	   * @param   { String } innerHTML - inner html of the child node
	   * @param   { Object } parent - instance of the parent tag including the child custom tag
	   * @returns { Object } instance of the new child tag just created
	   */
	  function initChildTag(child, opts, innerHTML, parent) {
	    var tag = new Tag(child, opts, innerHTML),
	        tagName = getTagName(opts.root),
	        ptag = getImmediateCustomParentTag(parent);
	    // fix for the parent attribute in the looped elements
	    tag.parent = ptag;
	    // store the real parent tag
	    // in some cases this could be different from the custom parent tag
	    // for example in nested loops
	    tag._parent = parent;

	    // add this tag to the custom parent tag
	    addChildTag(tag, tagName, ptag);
	    // and also to the real parent tag
	    if (ptag !== parent) addChildTag(tag, tagName, parent);
	    // empty the child node once we got its template
	    // to avoid that its children get compiled multiple times
	    opts.root.innerHTML = '';

	    return tag;
	  }

	  /**
	   * Loop backward all the parents tree to detect the first custom parent tag
	   * @param   { Object } tag - a Tag instance
	   * @returns { Object } the instance of the first custom parent tag found
	   */
	  function getImmediateCustomParentTag(tag) {
	    var ptag = tag;
	    while (!getTag(ptag.root)) {
	      if (!ptag.parent) break;
	      ptag = ptag.parent;
	    }
	    return ptag;
	  }

	  /**
	   * Helper function to set an immutable property
	   * @param   { Object } el - object where the new property will be set
	   * @param   { String } key - object key where the new property will be stored
	   * @param   { * } value - value of the new property
	  * @param   { Object } options - set the propery overriding the default options
	   * @returns { Object } - the initial object
	   */
	  function defineProperty(el, key, value, options) {
	    Object.defineProperty(el, key, extend({
	      value: value,
	      enumerable: false,
	      writable: false,
	      configurable: true
	    }, options));
	    return el;
	  }

	  /**
	   * Get the tag name of any DOM node
	   * @param   { Object } dom - DOM node we want to parse
	   * @returns { String } name to identify this dom node in riot
	   */
	  function getTagName(dom) {
	    var child = getTag(dom),
	        namedTag = getAttr(dom, 'name'),
	        tagName = namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();

	    return tagName;
	  }

	  /**
	   * Extend any object with other properties
	   * @param   { Object } src - source object
	   * @returns { Object } the resulting extended object
	   *
	   * var obj = { foo: 'baz' }
	   * extend(obj, {bar: 'bar', foo: 'bar'})
	   * console.log(obj) => {bar: 'bar', foo: 'bar'}
	   *
	   */
	  function extend(src) {
	    var obj,
	        args = arguments;
	    for (var i = 1; i < args.length; ++i) {
	      if (obj = args[i]) {
	        for (var key in obj) {
	          // check if this property of the source object could be overridden
	          if (isWritable(src, key)) src[key] = obj[key];
	        }
	      }
	    }
	    return src;
	  }

	  /**
	   * Check whether an array contains an item
	   * @param   { Array } arr - target array
	   * @param   { * } item - item to test
	   * @returns { Boolean } Does 'arr' contain 'item'?
	   */
	  function contains(arr, item) {
	    return ~arr.indexOf(item);
	  }

	  /**
	   * Check whether an object is a kind of array
	   * @param   { * } a - anything
	   * @returns {Boolean} is 'a' an array?
	   */
	  function isArray(a) {
	    return Array.isArray(a) || a instanceof Array;
	  }

	  /**
	   * Detect whether a property of an object could be overridden
	   * @param   { Object }  obj - source object
	   * @param   { String }  key - object property
	   * @returns { Boolean } is this property writable?
	   */
	  function isWritable(obj, key) {
	    var props = Object.getOwnPropertyDescriptor(obj, key);
	    return _typeof(obj[key]) === T_UNDEF || props && props.writable;
	  }

	  /**
	   * With this function we avoid that the internal Tag methods get overridden
	   * @param   { Object } data - options we want to use to extend the tag instance
	   * @returns { Object } clean object without containing the riot internal reserved words
	   */
	  function cleanUpData(data) {
	    if (!(data instanceof Tag) && !(data && _typeof(data.trigger) == T_FUNCTION)) return data;

	    var o = {};
	    for (var key in data) {
	      if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key];
	    }
	    return o;
	  }

	  /**
	   * Walk down recursively all the children tags starting dom node
	   * @param   { Object }   dom - starting node where we will start the recursion
	   * @param   { Function } fn - callback to transform the child node just found
	   */
	  function walk(dom, fn) {
	    if (dom) {
	      // stop the recursion
	      if (fn(dom) === false) return;else {
	        dom = dom.firstChild;

	        while (dom) {
	          walk(dom, fn);
	          dom = dom.nextSibling;
	        }
	      }
	    }
	  }

	  /**
	   * Minimize risk: only zero or one _space_ between attr & value
	   * @param   { String }   html - html string we want to parse
	   * @param   { Function } fn - callback function to apply on any attribute found
	   */
	  function walkAttributes(html, fn) {
	    var m,
	        re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;

	    while (m = re.exec(html)) {
	      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
	    }
	  }

	  /**
	   * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	   * @param   { Object }  dom - DOM node we want to parse
	   * @returns { Boolean } -
	   */
	  function isInStub(dom) {
	    while (dom) {
	      if (dom.inStub) return true;
	      dom = dom.parentNode;
	    }
	    return false;
	  }

	  /**
	   * Create a generic DOM node
	   * @param   { String } name - name of the DOM node we want to create
	   * @param   { Boolean } isSvg - should we use a SVG as parent node?
	   * @returns { Object } DOM node just created
	   */
	  function mkEl(name, isSvg) {
	    return isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(name);
	  }

	  /**
	   * Shorter and fast way to select multiple nodes in the DOM
	   * @param   { String } selector - DOM selector
	   * @param   { Object } ctx - DOM node where the targets of our search will is located
	   * @returns { Object } dom nodes found
	   */
	  function $$(selector, ctx) {
	    return (ctx || document).querySelectorAll(selector);
	  }

	  /**
	   * Shorter and fast way to select a single node in the DOM
	   * @param   { String } selector - unique dom selector
	   * @param   { Object } ctx - DOM node where the target of our search will is located
	   * @returns { Object } dom node found
	   */
	  function $(selector, ctx) {
	    return (ctx || document).querySelector(selector);
	  }

	  /**
	   * Simple object prototypal inheritance
	   * @param   { Object } parent - parent object
	   * @returns { Object } child instance
	   */
	  function inherit(parent) {
	    function Child() {}
	    Child.prototype = parent;
	    return new Child();
	  }

	  /**
	   * Get the name property needed to identify a DOM node in riot
	   * @param   { Object } dom - DOM node we need to parse
	   * @returns { String | undefined } give us back a string to identify this dom node
	   */
	  function getNamedKey(dom) {
	    return getAttr(dom, 'id') || getAttr(dom, 'name');
	  }

	  /**
	   * Set the named properties of a tag element
	   * @param { Object } dom - DOM node we need to parse
	   * @param { Object } parent - tag instance where the named dom element will be eventually added
	   * @param { Array } keys - list of all the tag instance properties
	   */
	  function setNamed(dom, parent, keys) {
	    // get the key value we want to add to the tag instance
	    var key = getNamedKey(dom),
	        isArr,

	    // add the node detected to a tag instance using the named property
	    add = function add(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return;
	      // check whether this value is an array
	      isArr = isArray(value);
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom;
	        // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	          // add the dom node into the array
	          if (isArr) value.push(dom);else parent[key] = [value, dom];
	        }
	    };

	    // skip the elements with no named properties
	    if (!key) return;

	    // check whether this key has been already evaluated
	    if (tmpl.hasExpr(key))
	      // wait the first updated event only once
	      parent.one('mount', function () {
	        key = getNamedKey(dom);
	        add(parent[key]);
	      });else add(parent[key]);
	  }

	  /**
	   * Faster String startsWith alternative
	   * @param   { String } src - source string
	   * @param   { String } str - test string
	   * @returns { Boolean } -
	   */
	  function startsWith(src, str) {
	    return src.slice(0, str.length) === str;
	  }

	  /**
	   * requestAnimationFrame function
	   * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	   */
	  var rAF = function (w) {
	    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame;

	    if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {
	      // buggy iOS6
	      var lastTime = 0;

	      raf = function raf(cb) {
	        var nowtime = Date.now(),
	            timeout = Math.max(16 - (nowtime - lastTime), 0);
	        setTimeout(function () {
	          cb(lastTime = nowtime + timeout);
	        }, timeout);
	      };
	    }
	    return raf;
	  }(window || {});

	  /**
	   * Mount a tag creating new Tag instance
	   * @param   { Object } root - dom node where the tag will be mounted
	   * @param   { String } tagName - name of the riot tag we want to mount
	   * @param   { Object } opts - options to pass to the Tag instance
	   * @returns { Tag } a new Tag instance
	   */
	  function mountTo(root, tagName, opts) {
	    var tag = __tagImpl[tagName],

	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

	    // clear the inner html
	    root.innerHTML = '';

	    if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML);

	    if (tag && tag.mount) {
	      tag.mount();
	      // add this tag to the virtualDom variable
	      if (!contains(__virtualDom, tag)) __virtualDom.push(tag);
	    }

	    return tag;
	  }
	  /**
	   * Riot public api
	   */

	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl };

	  /**
	   * Create a mixin that could be globally shared across all the tags
	   */
	  riot.mixin = function () {
	    var mixins = {},
	        globals = mixins[GLOBAL_MIXIN] = {},
	        _id = 0;

	    /**
	     * Create/Return a mixin by its name
	     * @param   { String }  name - mixin name (global mixin if object)
	     * @param   { Object }  mixin - mixin logic
	     * @param   { Boolean } g - is global?
	     * @returns { Object }  the mixin logic
	     */
	    return function (name, mixin, g) {
	      // Unnamed global
	      if (isObject(name)) {
	        riot.mixin('__unnamed_' + _id++, name, true);
	        return;
	      }

	      var store = g ? globals : mixins;

	      // Getter
	      if (!mixin) {
	        if (_typeof(store[name]) === T_UNDEF) {
	          throw new Error('Unregistered mixin: ' + name);
	        }
	        return store[name];
	      }
	      // Setter
	      if (isFunction(mixin)) {
	        extend(mixin.prototype, store[name] || {});
	        store[name] = mixin;
	      } else {
	        store[name] = extend(store[name] || {}, mixin);
	      }
	    };
	  }();

	  /**
	   * Create a new riot tag implementation
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag = function (name, html, css, attrs, fn) {
	    if (isFunction(attrs)) {
	      fn = attrs;
	      if (/^[\w\-]+\s?=/.test(css)) {
	        attrs = css;
	        css = '';
	      } else attrs = '';
	    }
	    if (css) {
	      if (isFunction(css)) fn = css;else styleManager.add(css);
	    }
	    name = name.toLowerCase();
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };

	  /**
	   * Create a new riot tag implementation (for use by the compiler)
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag2 = function (name, html, css, attrs, fn) {
	    if (css) styleManager.add(css);
	    //if (bpair) riot.settings.brackets = bpair
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };

	  /**
	   * Mount a tag using a specific tag implementation
	   * @param   { String } selector - tag DOM selector
	   * @param   { String } tagName - tag implementation name
	   * @param   { Object } opts - tag logic
	   * @returns { Array } new tags instances
	   */
	  riot.mount = function (selector, tagName, opts) {

	    var els,
	        allTags,
	        tags = [];

	    // helper functions

	    function addRiotTags(arr) {
	      var list = '';
	      each(arr, function (e) {
	        if (!/[^-\w]/.test(e)) {
	          e = e.trim().toLowerCase();
	          list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]';
	        }
	      });
	      return list;
	    }

	    function selectAllTags() {
	      var keys = Object.keys(__tagImpl);
	      return keys + addRiotTags(keys);
	    }

	    function pushTags(root) {
	      if (root.tagName) {
	        var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG);

	        // have tagName? force riot-tag to be the same
	        if (tagName && riotTag !== tagName) {
	          riotTag = tagName;
	          setAttr(root, RIOT_TAG_IS, tagName);
	          setAttr(root, RIOT_TAG, tagName); // this will be removed in riot 3.0.0
	        }
	        var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

	        if (tag) tags.push(tag);
	      } else if (root.length) {
	        each(root, pushTags); // assume nodeList
	      }
	    }

	    // ----- mount code -----

	    // inject styles into DOM
	    styleManager.inject();

	    if (isObject(tagName)) {
	      opts = tagName;
	      tagName = 0;
	    }

	    // crawl the DOM to find the tag
	    if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === T_STRING) {
	      if (selector === '*')
	        // select all the tags registered
	        // and also the tags found with the riot-tag attribute set
	        selector = allTags = selectAllTags();else
	        // or just the ones named like the selector
	        selector += addRiotTags(selector.split(/, */));

	      // make sure to pass always a selector
	      // to the querySelectorAll function
	      els = selector ? $$(selector) : [];
	    } else
	      // probably you have passed already a tag or a NodeList
	      els = selector;

	    // select all the registered and mount them inside their root elements
	    if (tagName === '*') {
	      // get all custom tags
	      tagName = allTags || selectAllTags();
	      // if the root els it's just a single tag
	      if (els.tagName) els = $$(tagName, els);else {
	        // select all the children for all the different root elements
	        var nodeList = [];
	        each(els, function (_el) {
	          nodeList.push($$(tagName, _el));
	        });
	        els = nodeList;
	      }
	      // get rid of the tagName
	      tagName = 0;
	    }

	    pushTags(els);

	    return tags;
	  };

	  /**
	   * Update all the tags instances created
	   * @returns { Array } all the tags instances
	   */
	  riot.update = function () {
	    return each(__virtualDom, function (tag) {
	      tag.update();
	    });
	  };

	  /**
	   * Export the Virtual DOM
	   */
	  riot.vdom = __virtualDom;

	  /**
	   * Export the Tag constructor
	   */
	  riot.Tag = Tag;
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (( false ? 'undefined' : _typeof(exports)) === T_OBJECT) module.exports = riot;else if (( false ? 'undefined' : _typeof(__webpack_require__(13))) === T_FUNCTION && _typeof(__webpack_require__(14)) !== T_UNDEF) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return riot;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else window.riot = riot;
	})(typeof window != 'undefined' ? window : void 0);

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('app', '<header> <div layout layout-align="start start"> <img width="175" src="img/flexmaid.png" alt=""> <div> <h1>Flex Maid</h1> <span> At your service </span> </div> </div> </header> <input type="text" name="label"> <div name="slider"></div> <input type="submit" onclick="{add}" name="name" value="subimt"> <section class="breakpoints"> <breakpoint each="{breakpoint, index in breakpoints}" layout="row" layout-align="space-between" riot-style="background-color: hsl(330, 50%, {25+(50/breakpoints.length)*index}%)" label="{breakpoint.label}" pixel="{breakpoint.pixel}"> </breakpoint> </section>', '', '', function(opts) {
	        this.breakpoints = [
	            {
	                label: 'sm',
	                pixel: 500
	            },
	            {
	                label: 'md',
	                pixel: 920
	            },
	            {
	                label: 'lg',
	                pixel: 1200
	            },
	        ]

	        this.add = function(e) {
	            var equallyLabeledItems = this.breakpoints.filter((item) => {
	                return item.label === this.label.value
	            })
	            var pixel = Math.random() * 1900 | 0
	            if (!equallyLabeledItems.length && this.label.value.length) {
	                var breakpointPushIndex = 0
	                this.breakpoints.filter((item, index) => {
	                    if (pixel >= item.pixel) {
	                        breakpointPushIndex = index + 1
	                    }
	                })
	                console.log(breakpointPushIndex + ' - ' + pixel);
	                this.breakpoints.splice(breakpointPushIndex, 0, {
	                    label: this.label.value,
	                    pixel: pixel
	                })
	            }
	        }.bind(this)

	        this.on('mount', () => {
	            console.log(this)
	            this.noUiSlider.create(slider, {
	            	start: [20],
	            	range: {
	            		'min': 0,
	            		'max': 100
	            	}
	            })
	        })

	        this.on('remove', (breakpoint) => {
	            this.breakpoints = this.breakpoints.filter((bp) => {
	                return breakpoint.opts.label != bp.label
	            })
	        })
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag2('breakpoint', '<div> <span onclick="{remove}">&times;</span> </div> <div> <span>{opts.label} - {opts.pixel}</span> </div>', '', '', function(opts) {
	        this.remove = function() {
	            this.parent.trigger('remove', this)
	        }.bind(this)
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	exports.i(__webpack_require__(20), "");
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Aguafina+Script);", ""]);
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Oswald:400,300,700);", ""]);

	// module
	exports.push([module.id, "/* ========================================\n    VENDOR\n   ======================================== */\n/*\n *  Responsive attributes\n *\n *  References:\n *  1) https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties#flex\n *  2) https://css-tricks.com/almanac/properties/f/flex/\n *  3) https://css-tricks.com/snippets/css/a-guide-to-flexbox/\n *  4) https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items\n *  5) http://godban.com.ua/projects/flexgrid\n *\n */\n/*\n * move them into layouts_for_breakpoint to have them\n * generated\n * for our use case, offsets and layout-align is not\n * needed for the website - thus generating less CSS.\n */\n[flex-end] {\n  margin-top: auto;\n}\n[flex-offset=\"0\"] {\n  margin-left: 0%;\n}\n[flex-offset=\"5\"] {\n  margin-left: 5%;\n}\n[flex-offset=\"10\"] {\n  margin-left: 10%;\n}\n[flex-offset=\"15\"] {\n  margin-left: 15%;\n}\n[flex-offset=\"20\"] {\n  margin-left: 20%;\n}\n[flex-offset=\"25\"] {\n  margin-left: 25%;\n}\n[flex-offset=\"30\"] {\n  margin-left: 30%;\n}\n[flex-offset=\"35\"] {\n  margin-left: 35%;\n}\n[flex-offset=\"40\"] {\n  margin-left: 40%;\n}\n[flex-offset=\"45\"] {\n  margin-left: 45%;\n}\n[flex-offset=\"50\"] {\n  margin-left: 50%;\n}\n[flex-offset=\"55\"] {\n  margin-left: 55%;\n}\n[flex-offset=\"60\"] {\n  margin-left: 60%;\n}\n[flex-offset=\"65\"] {\n  margin-left: 65%;\n}\n[flex-offset=\"70\"] {\n  margin-left: 70%;\n}\n[flex-offset=\"75\"] {\n  margin-left: 75%;\n}\n[flex-offset=\"80\"] {\n  margin-left: 80%;\n}\n[flex-offset=\"85\"] {\n  margin-left: 85%;\n}\n[flex-offset=\"90\"] {\n  margin-left: 90%;\n}\n[flex-offset=\"95\"] {\n  margin-left: 95%;\n}\n[flex-offset=\"33\"] {\n  margin-left: calc(33.33333333%);\n}\n[flex-offset=\"66\"] {\n  margin-left: calc(66.66666667%);\n}\n[layout-align],\n[layout-align=\"start stretch\"] {\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n  -ms-flex-line-pack: stretch;\n      align-content: stretch;\n  -ms-flex-align: stretch;\n      -ms-grid-row-align: stretch;\n      align-items: stretch;\n}\n[layout-align=\"start\"],\n[layout-align=\"start start\"],\n[layout-align=\"start center\"],\n[layout-align=\"start end\"],\n[layout-align=\"start stretch\"] {\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\n[layout-align=\"center\"],\n[layout-align=\"center start\"],\n[layout-align=\"center center\"],\n[layout-align=\"center end\"],\n[layout-align=\"center stretch\"] {\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n[layout-align=\"end\"],\n[layout-align=\"end center\"],\n[layout-align=\"end start\"],\n[layout-align=\"end end\"],\n[layout-align=\"end stretch\"] {\n  -ms-flex-pack: end;\n      justify-content: flex-end;\n}\n[layout-align=\"space-around\"],\n[layout-align=\"space-around center\"],\n[layout-align=\"space-around start\"],\n[layout-align=\"space-around end\"],\n[layout-align=\"space-around stretch\"] {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n[layout-align=\"space-between\"],\n[layout-align=\"space-between center\"],\n[layout-align=\"space-between start\"],\n[layout-align=\"space-between end\"],\n[layout-align=\"space-between stretch\"] {\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n}\n[layout-align=\"start start\"],\n[layout-align=\"center start\"],\n[layout-align=\"end start\"],\n[layout-align=\"space-between start\"],\n[layout-align=\"space-around start\"] {\n  -ms-flex-align: start;\n      -ms-grid-row-align: flex-start;\n      align-items: flex-start;\n  -ms-flex-line-pack: start;\n      align-content: flex-start;\n}\n[layout-align=\"start center\"],\n[layout-align=\"center center\"],\n[layout-align=\"end center\"],\n[layout-align=\"space-between center\"],\n[layout-align=\"space-around center\"] {\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  -ms-flex-line-pack: center;\n      align-content: center;\n  max-width: 100%;\n}\n[layout-align=\"start center\"] > *,\n[layout-align=\"center center\"] > *,\n[layout-align=\"end center\"] > *,\n[layout-align=\"space-between center\"] > *,\n[layout-align=\"space-around center\"] > * {\n  max-width: 100%;\n}\n[layout-align=\"start end\"],\n[layout-align=\"center end\"],\n[layout-align=\"end end\"],\n[layout-align=\"space-between end\"],\n[layout-align=\"space-around end\"] {\n  -ms-flex-align: end;\n      -ms-grid-row-align: flex-end;\n      align-items: flex-end;\n  -ms-flex-line-pack: end;\n      align-content: flex-end;\n}\n[layout-align=\"start stretch\"],\n[layout-align=\"center stretch\"],\n[layout-align=\"end stretch\"],\n[layout-align=\"space-between stretch\"],\n[layout-align=\"space-around stretch\"] {\n  -ms-flex-align: stretch;\n      -ms-grid-row-align: stretch;\n      align-items: stretch;\n  -ms-flex-line-pack: stretch;\n      align-content: stretch;\n}\n/*\n *  Apply Mixins to create Layout/Flexbox styles\n *\n */\n[layout-padding] > [flex-sm],\n[layout-padding] > [flex-lt-md] {\n  padding: 0.5em;\n}\n[layout-padding],\n[layout-padding] > [flex],\n[layout-padding] > [flex-gt-sm],\n[layout-padding] > [flex-md],\n[layout-padding] > [flex-lt-lg] {\n  padding: 1em;\n}\n[layout-padding] > [flex-gt-md],\n[layout-padding] > [flex-lg] {\n  padding: 2em;\n}\n[layout-margin] > [flex-sm],\n[layout-margin] > [flex-lt-md] {\n  margin: 0.5em;\n}\n[layout-margin],\n[layout-margin] > [flex],\n[layout-margin] > [flex-gt-sm],\n[layout-margin] > [flex-md],\n[layout-margin] > [flex-lt-lg] {\n  margin: 1em;\n}\n[layout-margin] > [flex-gt-md],\n[layout-margin] > [flex-lg] {\n  margin: 2em;\n}\n[layout-wrap] {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n[layout-nowrap] {\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n}\n[layout-fill] {\n  margin: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100%;\n}\n[flex-order=\"0\"] {\n  -ms-flex-order: 0;\n      order: 0;\n}\n[flex-order=\"1\"] {\n  -ms-flex-order: 1;\n      order: 1;\n}\n[flex-order=\"2\"] {\n  -ms-flex-order: 2;\n      order: 2;\n}\n[flex-order=\"3\"] {\n  -ms-flex-order: 3;\n      order: 3;\n}\n[flex-order=\"4\"] {\n  -ms-flex-order: 4;\n      order: 4;\n}\n[flex-order=\"5\"] {\n  -ms-flex-order: 5;\n      order: 5;\n}\n[flex-order=\"6\"] {\n  -ms-flex-order: 6;\n      order: 6;\n}\n[flex-order=\"7\"] {\n  -ms-flex-order: 7;\n      order: 7;\n}\n[flex-order=\"8\"] {\n  -ms-flex-order: 8;\n      order: 8;\n}\n[flex-order=\"9\"] {\n  -ms-flex-order: 9;\n      order: 9;\n}\n[flex-order=\"10\"] {\n  -ms-flex-order: 10;\n      order: 10;\n}\n[flex-order=\"11\"] {\n  -ms-flex-order: 11;\n      order: 11;\n}\n[flex-order=\"12\"] {\n  -ms-flex-order: 12;\n      order: 12;\n}\n[flex-order=\"13\"] {\n  -ms-flex-order: 13;\n      order: 13;\n}\n[flex-order=\"14\"] {\n  -ms-flex-order: 14;\n      order: 14;\n}\n[flex-order=\"15\"] {\n  -ms-flex-order: 15;\n      order: 15;\n}\n[flex-order=\"16\"] {\n  -ms-flex-order: 16;\n      order: 16;\n}\n[flex-order=\"17\"] {\n  -ms-flex-order: 17;\n      order: 17;\n}\n[flex-order=\"18\"] {\n  -ms-flex-order: 18;\n      order: 18;\n}\n[flex-order=\"19\"] {\n  -ms-flex-order: 19;\n      order: 19;\n}\n[flex-order=\"20\"] {\n  -ms-flex-order: 20;\n      order: 20;\n}\n[flex] {\n  -ms-flex: 1;\n      flex: 1;\n}\n[flex-grow] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%;\n  box-sizing: border-box;\n}\n[flex-initial] {\n  -ms-flex: 0 1 auto;\n      flex: 0 1 auto;\n  box-sizing: border-box;\n}\n[flex-auto] {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  box-sizing: border-box;\n}\n[flex-none] {\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  box-sizing: border-box;\n}\n[flex],\n[layout=\"row\"] > [flex],\n[layout=\"row\"] > [flex] {\n  max-height: 100%;\n}\n[layout=\"column\"] > [flex],\n[layout=\"column\"] > [flex] {\n  max-width: 100%;\n}\n[flex=\"5\"] {\n  -ms-flex: 1 1 5%;\n      flex: 1 1 5%;\n  max-width: 5%;\n}\n[layout=\"row\"] > [flex=\"5\"],\n[layout=\"row\"] > [flex=\"5\"] {\n  -ms-flex: 1 1 5%;\n      flex: 1 1 5%;\n  max-width: 5%;\n}\n[layout=\"column\"] > [flex=\"5\"],\n[layout=\"column\"] > [flex=\"5\"] {\n  -ms-flex: 1 1 5%;\n      flex: 1 1 5%;\n  max-height: 5%;\n}\n[flex=\"10\"] {\n  -ms-flex: 1 1 10%;\n      flex: 1 1 10%;\n  max-width: 10%;\n}\n[layout=\"row\"] > [flex=\"10\"],\n[layout=\"row\"] > [flex=\"10\"] {\n  -ms-flex: 1 1 10%;\n      flex: 1 1 10%;\n  max-width: 10%;\n}\n[layout=\"column\"] > [flex=\"10\"],\n[layout=\"column\"] > [flex=\"10\"] {\n  -ms-flex: 1 1 10%;\n      flex: 1 1 10%;\n  max-height: 10%;\n}\n[flex=\"15\"] {\n  -ms-flex: 1 1 15%;\n      flex: 1 1 15%;\n  max-width: 15%;\n}\n[layout=\"row\"] > [flex=\"15\"],\n[layout=\"row\"] > [flex=\"15\"] {\n  -ms-flex: 1 1 15%;\n      flex: 1 1 15%;\n  max-width: 15%;\n}\n[layout=\"column\"] > [flex=\"15\"],\n[layout=\"column\"] > [flex=\"15\"] {\n  -ms-flex: 1 1 15%;\n      flex: 1 1 15%;\n  max-height: 15%;\n}\n[flex=\"20\"] {\n  -ms-flex: 1 1 20%;\n      flex: 1 1 20%;\n  max-width: 20%;\n}\n[layout=\"row\"] > [flex=\"20\"],\n[layout=\"row\"] > [flex=\"20\"] {\n  -ms-flex: 1 1 20%;\n      flex: 1 1 20%;\n  max-width: 20%;\n}\n[layout=\"column\"] > [flex=\"20\"],\n[layout=\"column\"] > [flex=\"20\"] {\n  -ms-flex: 1 1 20%;\n      flex: 1 1 20%;\n  max-height: 20%;\n}\n[flex=\"25\"] {\n  -ms-flex: 1 1 25%;\n      flex: 1 1 25%;\n  max-width: 25%;\n}\n[layout=\"row\"] > [flex=\"25\"],\n[layout=\"row\"] > [flex=\"25\"] {\n  -ms-flex: 1 1 25%;\n      flex: 1 1 25%;\n  max-width: 25%;\n}\n[layout=\"column\"] > [flex=\"25\"],\n[layout=\"column\"] > [flex=\"25\"] {\n  -ms-flex: 1 1 25%;\n      flex: 1 1 25%;\n  max-height: 25%;\n}\n[flex=\"30\"] {\n  -ms-flex: 1 1 30%;\n      flex: 1 1 30%;\n  max-width: 30%;\n}\n[layout=\"row\"] > [flex=\"30\"],\n[layout=\"row\"] > [flex=\"30\"] {\n  -ms-flex: 1 1 30%;\n      flex: 1 1 30%;\n  max-width: 30%;\n}\n[layout=\"column\"] > [flex=\"30\"],\n[layout=\"column\"] > [flex=\"30\"] {\n  -ms-flex: 1 1 30%;\n      flex: 1 1 30%;\n  max-height: 30%;\n}\n[flex=\"35\"] {\n  -ms-flex: 1 1 35%;\n      flex: 1 1 35%;\n  max-width: 35%;\n}\n[layout=\"row\"] > [flex=\"35\"],\n[layout=\"row\"] > [flex=\"35\"] {\n  -ms-flex: 1 1 35%;\n      flex: 1 1 35%;\n  max-width: 35%;\n}\n[layout=\"column\"] > [flex=\"35\"],\n[layout=\"column\"] > [flex=\"35\"] {\n  -ms-flex: 1 1 35%;\n      flex: 1 1 35%;\n  max-height: 35%;\n}\n[flex=\"40\"] {\n  -ms-flex: 1 1 40%;\n      flex: 1 1 40%;\n  max-width: 40%;\n}\n[layout=\"row\"] > [flex=\"40\"],\n[layout=\"row\"] > [flex=\"40\"] {\n  -ms-flex: 1 1 40%;\n      flex: 1 1 40%;\n  max-width: 40%;\n}\n[layout=\"column\"] > [flex=\"40\"],\n[layout=\"column\"] > [flex=\"40\"] {\n  -ms-flex: 1 1 40%;\n      flex: 1 1 40%;\n  max-height: 40%;\n}\n[flex=\"45\"] {\n  -ms-flex: 1 1 45%;\n      flex: 1 1 45%;\n  max-width: 45%;\n}\n[layout=\"row\"] > [flex=\"45\"],\n[layout=\"row\"] > [flex=\"45\"] {\n  -ms-flex: 1 1 45%;\n      flex: 1 1 45%;\n  max-width: 45%;\n}\n[layout=\"column\"] > [flex=\"45\"],\n[layout=\"column\"] > [flex=\"45\"] {\n  -ms-flex: 1 1 45%;\n      flex: 1 1 45%;\n  max-height: 45%;\n}\n[flex=\"50\"] {\n  -ms-flex: 1 1 50%;\n      flex: 1 1 50%;\n  max-width: 50%;\n}\n[layout=\"row\"] > [flex=\"50\"],\n[layout=\"row\"] > [flex=\"50\"] {\n  -ms-flex: 1 1 50%;\n      flex: 1 1 50%;\n  max-width: 50%;\n}\n[layout=\"column\"] > [flex=\"50\"],\n[layout=\"column\"] > [flex=\"50\"] {\n  -ms-flex: 1 1 50%;\n      flex: 1 1 50%;\n  max-height: 50%;\n}\n[flex=\"55\"] {\n  -ms-flex: 1 1 55%;\n      flex: 1 1 55%;\n  max-width: 55%;\n}\n[layout=\"row\"] > [flex=\"55\"],\n[layout=\"row\"] > [flex=\"55\"] {\n  -ms-flex: 1 1 55%;\n      flex: 1 1 55%;\n  max-width: 55%;\n}\n[layout=\"column\"] > [flex=\"55\"],\n[layout=\"column\"] > [flex=\"55\"] {\n  -ms-flex: 1 1 55%;\n      flex: 1 1 55%;\n  max-height: 55%;\n}\n[flex=\"60\"] {\n  -ms-flex: 1 1 60%;\n      flex: 1 1 60%;\n  max-width: 60%;\n}\n[layout=\"row\"] > [flex=\"60\"],\n[layout=\"row\"] > [flex=\"60\"] {\n  -ms-flex: 1 1 60%;\n      flex: 1 1 60%;\n  max-width: 60%;\n}\n[layout=\"column\"] > [flex=\"60\"],\n[layout=\"column\"] > [flex=\"60\"] {\n  -ms-flex: 1 1 60%;\n      flex: 1 1 60%;\n  max-height: 60%;\n}\n[flex=\"65\"] {\n  -ms-flex: 1 1 65%;\n      flex: 1 1 65%;\n  max-width: 65%;\n}\n[layout=\"row\"] > [flex=\"65\"],\n[layout=\"row\"] > [flex=\"65\"] {\n  -ms-flex: 1 1 65%;\n      flex: 1 1 65%;\n  max-width: 65%;\n}\n[layout=\"column\"] > [flex=\"65\"],\n[layout=\"column\"] > [flex=\"65\"] {\n  -ms-flex: 1 1 65%;\n      flex: 1 1 65%;\n  max-height: 65%;\n}\n[flex=\"70\"] {\n  -ms-flex: 1 1 70%;\n      flex: 1 1 70%;\n  max-width: 70%;\n}\n[layout=\"row\"] > [flex=\"70\"],\n[layout=\"row\"] > [flex=\"70\"] {\n  -ms-flex: 1 1 70%;\n      flex: 1 1 70%;\n  max-width: 70%;\n}\n[layout=\"column\"] > [flex=\"70\"],\n[layout=\"column\"] > [flex=\"70\"] {\n  -ms-flex: 1 1 70%;\n      flex: 1 1 70%;\n  max-height: 70%;\n}\n[flex=\"75\"] {\n  -ms-flex: 1 1 75%;\n      flex: 1 1 75%;\n  max-width: 75%;\n}\n[layout=\"row\"] > [flex=\"75\"],\n[layout=\"row\"] > [flex=\"75\"] {\n  -ms-flex: 1 1 75%;\n      flex: 1 1 75%;\n  max-width: 75%;\n}\n[layout=\"column\"] > [flex=\"75\"],\n[layout=\"column\"] > [flex=\"75\"] {\n  -ms-flex: 1 1 75%;\n      flex: 1 1 75%;\n  max-height: 75%;\n}\n[flex=\"80\"] {\n  -ms-flex: 1 1 80%;\n      flex: 1 1 80%;\n  max-width: 80%;\n}\n[layout=\"row\"] > [flex=\"80\"],\n[layout=\"row\"] > [flex=\"80\"] {\n  -ms-flex: 1 1 80%;\n      flex: 1 1 80%;\n  max-width: 80%;\n}\n[layout=\"column\"] > [flex=\"80\"],\n[layout=\"column\"] > [flex=\"80\"] {\n  -ms-flex: 1 1 80%;\n      flex: 1 1 80%;\n  max-height: 80%;\n}\n[flex=\"85\"] {\n  -ms-flex: 1 1 85%;\n      flex: 1 1 85%;\n  max-width: 85%;\n}\n[layout=\"row\"] > [flex=\"85\"],\n[layout=\"row\"] > [flex=\"85\"] {\n  -ms-flex: 1 1 85%;\n      flex: 1 1 85%;\n  max-width: 85%;\n}\n[layout=\"column\"] > [flex=\"85\"],\n[layout=\"column\"] > [flex=\"85\"] {\n  -ms-flex: 1 1 85%;\n      flex: 1 1 85%;\n  max-height: 85%;\n}\n[flex=\"90\"] {\n  -ms-flex: 1 1 90%;\n      flex: 1 1 90%;\n  max-width: 90%;\n}\n[layout=\"row\"] > [flex=\"90\"],\n[layout=\"row\"] > [flex=\"90\"] {\n  -ms-flex: 1 1 90%;\n      flex: 1 1 90%;\n  max-width: 90%;\n}\n[layout=\"column\"] > [flex=\"90\"],\n[layout=\"column\"] > [flex=\"90\"] {\n  -ms-flex: 1 1 90%;\n      flex: 1 1 90%;\n  max-height: 90%;\n}\n[flex=\"95\"] {\n  -ms-flex: 1 1 95%;\n      flex: 1 1 95%;\n  max-width: 95%;\n}\n[layout=\"row\"] > [flex=\"95\"],\n[layout=\"row\"] > [flex=\"95\"] {\n  -ms-flex: 1 1 95%;\n      flex: 1 1 95%;\n  max-width: 95%;\n}\n[layout=\"column\"] > [flex=\"95\"],\n[layout=\"column\"] > [flex=\"95\"] {\n  -ms-flex: 1 1 95%;\n      flex: 1 1 95%;\n  max-height: 95%;\n}\n[flex=\"100\"] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%;\n  max-width: 100%;\n}\n[layout=\"row\"] > [flex=\"100\"],\n[layout=\"row\"] > [flex=\"100\"] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%;\n  max-width: 100%;\n}\n[layout=\"column\"] > [flex=\"100\"],\n[layout=\"column\"] > [flex=\"100\"] {\n  -ms-flex: 1 1 100%;\n      flex: 1 1 100%;\n  max-height: 100%;\n}\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"] {\n  -ms-flex: 1 1 33.33%;\n      flex: 1 1 33.33%;\n  max-width: 33.33%;\n}\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"] {\n  -ms-flex: 1 1 66.66%;\n      flex: 1 1 66.66%;\n  max-width: 66.66%;\n}\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"] {\n  -ms-flex: 1 1 33.33%;\n      flex: 1 1 33.33%;\n  max-height: 33.33%;\n}\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"] {\n  -ms-flex: 1 1 66.66%;\n      flex: 1 1 66.66%;\n  max-height: 66.66%;\n}\n[layout] {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n[layout=\"column\"] {\n  -ms-flex-direction: column;\n      flex-direction: column;\n}\n[layout=\"row\"] {\n  -ms-flex-direction: row;\n      flex-direction: row;\n}\n/**\n * `hide-gt-sm show-gt-lg` should hide from 600px to 1200px\n * `show-md hide-gt-sm` should show from 0px to 960px and hide at >960px\n * `hide-gt-md show-gt-sm` should show everywhere (show overrides hide)`\n *  hide means hide everywhere\n */\n@media (max-width: 599px) {\n  [hide]:not([show-gt-xs]):not([show-sm]):not([show]),\n  [hide-gt-xs]:not([show-gt-xs]):not([show-sm]):not([show]) {\n    display: none;\n  }\n  [hide-sm]:not([show-gt-xs]):not([show-sm]):not([show]) {\n    display: none;\n  }\n  [flex-order-sm=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0;\n  }\n  [flex-order-sm=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1;\n  }\n  [flex-order-sm=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n  [flex-order-sm=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3;\n  }\n  [flex-order-sm=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4;\n  }\n  [flex-order-sm=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5;\n  }\n  [flex-order-sm=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6;\n  }\n  [flex-order-sm=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7;\n  }\n  [flex-order-sm=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8;\n  }\n  [flex-order-sm=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9;\n  }\n  [flex-order-sm=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10;\n  }\n  [flex-order-sm=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11;\n  }\n  [flex-order-sm=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12;\n  }\n  [flex-order-sm=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13;\n  }\n  [flex-order-sm=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14;\n  }\n  [flex-order-sm=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15;\n  }\n  [flex-order-sm=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16;\n  }\n  [flex-order-sm=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17;\n  }\n  [flex-order-sm=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18;\n  }\n  [flex-order-sm=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19;\n  }\n  [flex-order-sm=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20;\n  }\n  [flex-sm] {\n    -ms-flex: 1;\n        flex: 1;\n  }\n  [flex-sm-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    box-sizing: border-box;\n  }\n  [flex-sm-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-sm-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-sm-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    box-sizing: border-box;\n  }\n  [flex-sm],\n  [layout=\"row\"] > [flex-sm],\n  [layout-sm=\"row\"] > [flex-sm] {\n    max-height: 100%;\n  }\n  [layout-sm=\"column\"] > [flex-sm],\n  [layout=\"column\"] > [flex-sm] {\n    max-width: 100%;\n  }\n  [flex-sm=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"row\"] > [flex-sm=\"5\"],\n  [layout-sm=\"row\"] > [flex-sm=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-sm=\"5\"],\n  [layout-sm=\"column\"] > [flex-sm=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [flex-sm=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"row\"] > [flex-sm=\"10\"],\n  [layout-sm=\"row\"] > [flex-sm=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-sm=\"10\"],\n  [layout-sm=\"column\"] > [flex-sm=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [flex-sm=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"row\"] > [flex-sm=\"15\"],\n  [layout-sm=\"row\"] > [flex-sm=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-sm=\"15\"],\n  [layout-sm=\"column\"] > [flex-sm=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [flex-sm=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"row\"] > [flex-sm=\"20\"],\n  [layout-sm=\"row\"] > [flex-sm=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-sm=\"20\"],\n  [layout-sm=\"column\"] > [flex-sm=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [flex-sm=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"row\"] > [flex-sm=\"25\"],\n  [layout-sm=\"row\"] > [flex-sm=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-sm=\"25\"],\n  [layout-sm=\"column\"] > [flex-sm=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [flex-sm=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"row\"] > [flex-sm=\"30\"],\n  [layout-sm=\"row\"] > [flex-sm=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-sm=\"30\"],\n  [layout-sm=\"column\"] > [flex-sm=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [flex-sm=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"row\"] > [flex-sm=\"35\"],\n  [layout-sm=\"row\"] > [flex-sm=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-sm=\"35\"],\n  [layout-sm=\"column\"] > [flex-sm=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [flex-sm=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"row\"] > [flex-sm=\"40\"],\n  [layout-sm=\"row\"] > [flex-sm=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-sm=\"40\"],\n  [layout-sm=\"column\"] > [flex-sm=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [flex-sm=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"row\"] > [flex-sm=\"45\"],\n  [layout-sm=\"row\"] > [flex-sm=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-sm=\"45\"],\n  [layout-sm=\"column\"] > [flex-sm=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [flex-sm=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"row\"] > [flex-sm=\"50\"],\n  [layout-sm=\"row\"] > [flex-sm=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-sm=\"50\"],\n  [layout-sm=\"column\"] > [flex-sm=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [flex-sm=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"row\"] > [flex-sm=\"55\"],\n  [layout-sm=\"row\"] > [flex-sm=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-sm=\"55\"],\n  [layout-sm=\"column\"] > [flex-sm=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [flex-sm=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"row\"] > [flex-sm=\"60\"],\n  [layout-sm=\"row\"] > [flex-sm=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-sm=\"60\"],\n  [layout-sm=\"column\"] > [flex-sm=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [flex-sm=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"row\"] > [flex-sm=\"65\"],\n  [layout-sm=\"row\"] > [flex-sm=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-sm=\"65\"],\n  [layout-sm=\"column\"] > [flex-sm=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [flex-sm=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"row\"] > [flex-sm=\"70\"],\n  [layout-sm=\"row\"] > [flex-sm=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-sm=\"70\"],\n  [layout-sm=\"column\"] > [flex-sm=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [flex-sm=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"row\"] > [flex-sm=\"75\"],\n  [layout-sm=\"row\"] > [flex-sm=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-sm=\"75\"],\n  [layout-sm=\"column\"] > [flex-sm=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [flex-sm=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"row\"] > [flex-sm=\"80\"],\n  [layout-sm=\"row\"] > [flex-sm=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-sm=\"80\"],\n  [layout-sm=\"column\"] > [flex-sm=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [flex-sm=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"row\"] > [flex-sm=\"85\"],\n  [layout-sm=\"row\"] > [flex-sm=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-sm=\"85\"],\n  [layout-sm=\"column\"] > [flex-sm=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [flex-sm=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"row\"] > [flex-sm=\"90\"],\n  [layout-sm=\"row\"] > [flex-sm=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-sm=\"90\"],\n  [layout-sm=\"column\"] > [flex-sm=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [flex-sm=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"row\"] > [flex-sm=\"95\"],\n  [layout-sm=\"row\"] > [flex-sm=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-sm=\"95\"],\n  [layout-sm=\"column\"] > [flex-sm=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [flex-sm=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-sm=\"100\"],\n  [layout-sm=\"row\"] > [flex-sm=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-sm=\"100\"],\n  [layout-sm=\"column\"] > [flex-sm=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-sm=\"33\"],\n  [layout=\"row\"] > [flex-sm=\"33\"],\n  [layout-sm=\"row\"] > [flex-sm=\"33\"],\n  [layout-sm=\"row\"] > [flex-sm=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"row\"] > [flex-sm=\"66\"],\n  [layout=\"row\"] > [flex-sm=\"66\"],\n  [layout-sm=\"row\"] > [flex-sm=\"66\"],\n  [layout-sm=\"row\"] > [flex-sm=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-sm=\"33\"],\n  [layout=\"column\"] > [flex-sm=\"33\"],\n  [layout-sm=\"column\"] > [flex-sm=\"33\"],\n  [layout-sm=\"column\"] > [flex-sm=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"column\"] > [flex-sm=\"66\"],\n  [layout=\"column\"] > [flex-sm=\"66\"],\n  [layout-sm=\"column\"] > [flex-sm=\"66\"],\n  [layout-sm=\"column\"] > [flex-sm=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [layout-sm] {\n    display: -ms-flexbox;\n    display: flex;\n  }\n  [layout-sm=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n  [layout-sm=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n}\n@media (min-width: 600px) {\n  [flex-order-gt-sm=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0;\n  }\n  [flex-order-gt-sm=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1;\n  }\n  [flex-order-gt-sm=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n  [flex-order-gt-sm=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3;\n  }\n  [flex-order-gt-sm=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4;\n  }\n  [flex-order-gt-sm=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5;\n  }\n  [flex-order-gt-sm=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6;\n  }\n  [flex-order-gt-sm=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7;\n  }\n  [flex-order-gt-sm=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8;\n  }\n  [flex-order-gt-sm=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9;\n  }\n  [flex-order-gt-sm=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10;\n  }\n  [flex-order-gt-sm=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11;\n  }\n  [flex-order-gt-sm=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12;\n  }\n  [flex-order-gt-sm=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13;\n  }\n  [flex-order-gt-sm=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14;\n  }\n  [flex-order-gt-sm=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15;\n  }\n  [flex-order-gt-sm=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16;\n  }\n  [flex-order-gt-sm=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17;\n  }\n  [flex-order-gt-sm=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18;\n  }\n  [flex-order-gt-sm=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19;\n  }\n  [flex-order-gt-sm=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20;\n  }\n  [flex-gt-sm] {\n    -ms-flex: 1;\n        flex: 1;\n  }\n  [flex-gt-sm-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    box-sizing: border-box;\n  }\n  [flex-gt-sm-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-sm-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-sm-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-sm],\n  [layout=\"row\"] > [flex-gt-sm],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm] {\n    max-height: 100%;\n  }\n  [layout-gt-sm=\"column\"] > [flex-gt-sm],\n  [layout=\"column\"] > [flex-gt-sm] {\n    max-width: 100%;\n  }\n  [flex-gt-sm=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [flex-gt-sm=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [flex-gt-sm=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [flex-gt-sm=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [flex-gt-sm=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [flex-gt-sm=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [flex-gt-sm=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [flex-gt-sm=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [flex-gt-sm=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [flex-gt-sm=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [flex-gt-sm=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [flex-gt-sm=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [flex-gt-sm=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [flex-gt-sm=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [flex-gt-sm=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [flex-gt-sm=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [flex-gt-sm=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [flex-gt-sm=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [flex-gt-sm=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [flex-gt-sm=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [layout-gt-sm] {\n    display: -ms-flexbox;\n    display: flex;\n  }\n  [layout-gt-sm=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n  [layout-gt-sm=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n}\n@media (min-width: 600px) and (max-width: 959px) {\n  [hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]),\n  [hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]),\n  [hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]) {\n    display: none;\n  }\n  [hide-md]:not([show-md]):not([show]) {\n    display: none;\n  }\n  [flex-order-md=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0;\n  }\n  [flex-order-md=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1;\n  }\n  [flex-order-md=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n  [flex-order-md=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3;\n  }\n  [flex-order-md=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4;\n  }\n  [flex-order-md=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5;\n  }\n  [flex-order-md=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6;\n  }\n  [flex-order-md=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7;\n  }\n  [flex-order-md=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8;\n  }\n  [flex-order-md=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9;\n  }\n  [flex-order-md=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10;\n  }\n  [flex-order-md=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11;\n  }\n  [flex-order-md=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12;\n  }\n  [flex-order-md=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13;\n  }\n  [flex-order-md=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14;\n  }\n  [flex-order-md=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15;\n  }\n  [flex-order-md=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16;\n  }\n  [flex-order-md=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17;\n  }\n  [flex-order-md=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18;\n  }\n  [flex-order-md=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19;\n  }\n  [flex-order-md=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20;\n  }\n  [flex-md] {\n    -ms-flex: 1;\n        flex: 1;\n  }\n  [flex-md-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    box-sizing: border-box;\n  }\n  [flex-md-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-md-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-md-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    box-sizing: border-box;\n  }\n  [flex-md],\n  [layout=\"row\"] > [flex-md],\n  [layout-md=\"row\"] > [flex-md] {\n    max-height: 100%;\n  }\n  [layout-md=\"column\"] > [flex-md],\n  [layout=\"column\"] > [flex-md] {\n    max-width: 100%;\n  }\n  [flex-md=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"row\"] > [flex-md=\"5\"],\n  [layout-md=\"row\"] > [flex-md=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-md=\"5\"],\n  [layout-md=\"column\"] > [flex-md=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [flex-md=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"row\"] > [flex-md=\"10\"],\n  [layout-md=\"row\"] > [flex-md=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-md=\"10\"],\n  [layout-md=\"column\"] > [flex-md=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [flex-md=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"row\"] > [flex-md=\"15\"],\n  [layout-md=\"row\"] > [flex-md=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-md=\"15\"],\n  [layout-md=\"column\"] > [flex-md=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [flex-md=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"row\"] > [flex-md=\"20\"],\n  [layout-md=\"row\"] > [flex-md=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-md=\"20\"],\n  [layout-md=\"column\"] > [flex-md=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [flex-md=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"row\"] > [flex-md=\"25\"],\n  [layout-md=\"row\"] > [flex-md=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-md=\"25\"],\n  [layout-md=\"column\"] > [flex-md=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [flex-md=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"row\"] > [flex-md=\"30\"],\n  [layout-md=\"row\"] > [flex-md=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-md=\"30\"],\n  [layout-md=\"column\"] > [flex-md=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [flex-md=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"row\"] > [flex-md=\"35\"],\n  [layout-md=\"row\"] > [flex-md=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-md=\"35\"],\n  [layout-md=\"column\"] > [flex-md=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [flex-md=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"row\"] > [flex-md=\"40\"],\n  [layout-md=\"row\"] > [flex-md=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-md=\"40\"],\n  [layout-md=\"column\"] > [flex-md=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [flex-md=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"row\"] > [flex-md=\"45\"],\n  [layout-md=\"row\"] > [flex-md=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-md=\"45\"],\n  [layout-md=\"column\"] > [flex-md=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [flex-md=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"row\"] > [flex-md=\"50\"],\n  [layout-md=\"row\"] > [flex-md=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-md=\"50\"],\n  [layout-md=\"column\"] > [flex-md=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [flex-md=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"row\"] > [flex-md=\"55\"],\n  [layout-md=\"row\"] > [flex-md=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-md=\"55\"],\n  [layout-md=\"column\"] > [flex-md=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [flex-md=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"row\"] > [flex-md=\"60\"],\n  [layout-md=\"row\"] > [flex-md=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-md=\"60\"],\n  [layout-md=\"column\"] > [flex-md=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [flex-md=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"row\"] > [flex-md=\"65\"],\n  [layout-md=\"row\"] > [flex-md=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-md=\"65\"],\n  [layout-md=\"column\"] > [flex-md=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [flex-md=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"row\"] > [flex-md=\"70\"],\n  [layout-md=\"row\"] > [flex-md=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-md=\"70\"],\n  [layout-md=\"column\"] > [flex-md=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [flex-md=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"row\"] > [flex-md=\"75\"],\n  [layout-md=\"row\"] > [flex-md=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-md=\"75\"],\n  [layout-md=\"column\"] > [flex-md=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [flex-md=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"row\"] > [flex-md=\"80\"],\n  [layout-md=\"row\"] > [flex-md=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-md=\"80\"],\n  [layout-md=\"column\"] > [flex-md=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [flex-md=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"row\"] > [flex-md=\"85\"],\n  [layout-md=\"row\"] > [flex-md=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-md=\"85\"],\n  [layout-md=\"column\"] > [flex-md=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [flex-md=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"row\"] > [flex-md=\"90\"],\n  [layout-md=\"row\"] > [flex-md=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-md=\"90\"],\n  [layout-md=\"column\"] > [flex-md=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [flex-md=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"row\"] > [flex-md=\"95\"],\n  [layout-md=\"row\"] > [flex-md=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-md=\"95\"],\n  [layout-md=\"column\"] > [flex-md=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [flex-md=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-md=\"100\"],\n  [layout-md=\"row\"] > [flex-md=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-md=\"100\"],\n  [layout-md=\"column\"] > [flex-md=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-md=\"33\"],\n  [layout=\"row\"] > [flex-md=\"33\"],\n  [layout-md=\"row\"] > [flex-md=\"33\"],\n  [layout-md=\"row\"] > [flex-md=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"row\"] > [flex-md=\"66\"],\n  [layout=\"row\"] > [flex-md=\"66\"],\n  [layout-md=\"row\"] > [flex-md=\"66\"],\n  [layout-md=\"row\"] > [flex-md=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-md=\"33\"],\n  [layout=\"column\"] > [flex-md=\"33\"],\n  [layout-md=\"column\"] > [flex-md=\"33\"],\n  [layout-md=\"column\"] > [flex-md=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"column\"] > [flex-md=\"66\"],\n  [layout=\"column\"] > [flex-md=\"66\"],\n  [layout-md=\"column\"] > [flex-md=\"66\"],\n  [layout-md=\"column\"] > [flex-md=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [layout-md] {\n    display: -ms-flexbox;\n    display: flex;\n  }\n  [layout-md=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n  [layout-md=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n}\n@media (min-width: 960px) {\n  [flex-order-gt-md=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0;\n  }\n  [flex-order-gt-md=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1;\n  }\n  [flex-order-gt-md=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n  [flex-order-gt-md=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3;\n  }\n  [flex-order-gt-md=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4;\n  }\n  [flex-order-gt-md=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5;\n  }\n  [flex-order-gt-md=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6;\n  }\n  [flex-order-gt-md=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7;\n  }\n  [flex-order-gt-md=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8;\n  }\n  [flex-order-gt-md=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9;\n  }\n  [flex-order-gt-md=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10;\n  }\n  [flex-order-gt-md=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11;\n  }\n  [flex-order-gt-md=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12;\n  }\n  [flex-order-gt-md=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13;\n  }\n  [flex-order-gt-md=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14;\n  }\n  [flex-order-gt-md=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15;\n  }\n  [flex-order-gt-md=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16;\n  }\n  [flex-order-gt-md=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17;\n  }\n  [flex-order-gt-md=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18;\n  }\n  [flex-order-gt-md=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19;\n  }\n  [flex-order-gt-md=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20;\n  }\n  [flex-gt-md] {\n    -ms-flex: 1;\n        flex: 1;\n  }\n  [flex-gt-md-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    box-sizing: border-box;\n  }\n  [flex-gt-md-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-md-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-md-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-md],\n  [layout=\"row\"] > [flex-gt-md],\n  [layout-gt-md=\"row\"] > [flex-gt-md] {\n    max-height: 100%;\n  }\n  [layout-gt-md=\"column\"] > [flex-gt-md],\n  [layout=\"column\"] > [flex-gt-md] {\n    max-width: 100%;\n  }\n  [flex-gt-md=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [flex-gt-md=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [flex-gt-md=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [flex-gt-md=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [flex-gt-md=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [flex-gt-md=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [flex-gt-md=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [flex-gt-md=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [flex-gt-md=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [flex-gt-md=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [flex-gt-md=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [flex-gt-md=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [flex-gt-md=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [flex-gt-md=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [flex-gt-md=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [flex-gt-md=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [flex-gt-md=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [flex-gt-md=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [flex-gt-md=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [flex-gt-md=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"33\"],\n  [layout=\"row\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"66\"],\n  [layout=\"row\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"33\"],\n  [layout=\"column\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"66\"],\n  [layout=\"column\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [layout-gt-md] {\n    display: -ms-flexbox;\n    display: flex;\n  }\n  [layout-gt-md=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n  [layout-gt-md=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n}\n@media (min-width: 960px) and (max-width: 1199px) {\n  [hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),\n  [hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),\n  [hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]),\n  [hide-gt-md]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]) {\n    display: none;\n  }\n  [hide-lg]:not([show-lg]):not([show]) {\n    display: none;\n  }\n  [flex-order-lg=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0;\n  }\n  [flex-order-lg=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1;\n  }\n  [flex-order-lg=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n  [flex-order-lg=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3;\n  }\n  [flex-order-lg=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4;\n  }\n  [flex-order-lg=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5;\n  }\n  [flex-order-lg=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6;\n  }\n  [flex-order-lg=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7;\n  }\n  [flex-order-lg=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8;\n  }\n  [flex-order-lg=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9;\n  }\n  [flex-order-lg=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10;\n  }\n  [flex-order-lg=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11;\n  }\n  [flex-order-lg=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12;\n  }\n  [flex-order-lg=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13;\n  }\n  [flex-order-lg=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14;\n  }\n  [flex-order-lg=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15;\n  }\n  [flex-order-lg=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16;\n  }\n  [flex-order-lg=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17;\n  }\n  [flex-order-lg=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18;\n  }\n  [flex-order-lg=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19;\n  }\n  [flex-order-lg=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20;\n  }\n  [flex-lg] {\n    -ms-flex: 1;\n        flex: 1;\n  }\n  [flex-lg-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    box-sizing: border-box;\n  }\n  [flex-lg-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-lg-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-lg-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    box-sizing: border-box;\n  }\n  [flex-lg],\n  [layout=\"row\"] > [flex-lg],\n  [layout-lg=\"row\"] > [flex-lg] {\n    max-height: 100%;\n  }\n  [layout-lg=\"column\"] > [flex-lg],\n  [layout=\"column\"] > [flex-lg] {\n    max-width: 100%;\n  }\n  [flex-lg=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"row\"] > [flex-lg=\"5\"],\n  [layout-lg=\"row\"] > [flex-lg=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-lg=\"5\"],\n  [layout-lg=\"column\"] > [flex-lg=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [flex-lg=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"row\"] > [flex-lg=\"10\"],\n  [layout-lg=\"row\"] > [flex-lg=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-lg=\"10\"],\n  [layout-lg=\"column\"] > [flex-lg=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [flex-lg=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"row\"] > [flex-lg=\"15\"],\n  [layout-lg=\"row\"] > [flex-lg=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-lg=\"15\"],\n  [layout-lg=\"column\"] > [flex-lg=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [flex-lg=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"row\"] > [flex-lg=\"20\"],\n  [layout-lg=\"row\"] > [flex-lg=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-lg=\"20\"],\n  [layout-lg=\"column\"] > [flex-lg=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [flex-lg=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"row\"] > [flex-lg=\"25\"],\n  [layout-lg=\"row\"] > [flex-lg=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-lg=\"25\"],\n  [layout-lg=\"column\"] > [flex-lg=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [flex-lg=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"row\"] > [flex-lg=\"30\"],\n  [layout-lg=\"row\"] > [flex-lg=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-lg=\"30\"],\n  [layout-lg=\"column\"] > [flex-lg=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [flex-lg=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"row\"] > [flex-lg=\"35\"],\n  [layout-lg=\"row\"] > [flex-lg=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-lg=\"35\"],\n  [layout-lg=\"column\"] > [flex-lg=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [flex-lg=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"row\"] > [flex-lg=\"40\"],\n  [layout-lg=\"row\"] > [flex-lg=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-lg=\"40\"],\n  [layout-lg=\"column\"] > [flex-lg=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [flex-lg=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"row\"] > [flex-lg=\"45\"],\n  [layout-lg=\"row\"] > [flex-lg=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-lg=\"45\"],\n  [layout-lg=\"column\"] > [flex-lg=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [flex-lg=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"row\"] > [flex-lg=\"50\"],\n  [layout-lg=\"row\"] > [flex-lg=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-lg=\"50\"],\n  [layout-lg=\"column\"] > [flex-lg=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [flex-lg=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"row\"] > [flex-lg=\"55\"],\n  [layout-lg=\"row\"] > [flex-lg=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-lg=\"55\"],\n  [layout-lg=\"column\"] > [flex-lg=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [flex-lg=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"row\"] > [flex-lg=\"60\"],\n  [layout-lg=\"row\"] > [flex-lg=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-lg=\"60\"],\n  [layout-lg=\"column\"] > [flex-lg=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [flex-lg=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"row\"] > [flex-lg=\"65\"],\n  [layout-lg=\"row\"] > [flex-lg=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-lg=\"65\"],\n  [layout-lg=\"column\"] > [flex-lg=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [flex-lg=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"row\"] > [flex-lg=\"70\"],\n  [layout-lg=\"row\"] > [flex-lg=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-lg=\"70\"],\n  [layout-lg=\"column\"] > [flex-lg=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [flex-lg=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"row\"] > [flex-lg=\"75\"],\n  [layout-lg=\"row\"] > [flex-lg=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-lg=\"75\"],\n  [layout-lg=\"column\"] > [flex-lg=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [flex-lg=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"row\"] > [flex-lg=\"80\"],\n  [layout-lg=\"row\"] > [flex-lg=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-lg=\"80\"],\n  [layout-lg=\"column\"] > [flex-lg=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [flex-lg=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"row\"] > [flex-lg=\"85\"],\n  [layout-lg=\"row\"] > [flex-lg=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-lg=\"85\"],\n  [layout-lg=\"column\"] > [flex-lg=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [flex-lg=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"row\"] > [flex-lg=\"90\"],\n  [layout-lg=\"row\"] > [flex-lg=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-lg=\"90\"],\n  [layout-lg=\"column\"] > [flex-lg=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [flex-lg=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"row\"] > [flex-lg=\"95\"],\n  [layout-lg=\"row\"] > [flex-lg=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-lg=\"95\"],\n  [layout-lg=\"column\"] > [flex-lg=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [flex-lg=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-lg=\"100\"],\n  [layout-lg=\"row\"] > [flex-lg=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-lg=\"100\"],\n  [layout-lg=\"column\"] > [flex-lg=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-lg=\"33\"],\n  [layout=\"row\"] > [flex-lg=\"33\"],\n  [layout-lg=\"row\"] > [flex-lg=\"33\"],\n  [layout-lg=\"row\"] > [flex-lg=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"row\"] > [flex-lg=\"66\"],\n  [layout=\"row\"] > [flex-lg=\"66\"],\n  [layout-lg=\"row\"] > [flex-lg=\"66\"],\n  [layout-lg=\"row\"] > [flex-lg=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-lg=\"33\"],\n  [layout=\"column\"] > [flex-lg=\"33\"],\n  [layout-lg=\"column\"] > [flex-lg=\"33\"],\n  [layout-lg=\"column\"] > [flex-lg=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"column\"] > [flex-lg=\"66\"],\n  [layout=\"column\"] > [flex-lg=\"66\"],\n  [layout-lg=\"column\"] > [flex-lg=\"66\"],\n  [layout-lg=\"column\"] > [flex-lg=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [layout-lg] {\n    display: -ms-flexbox;\n    display: flex;\n  }\n  [layout-lg=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n  [layout-lg=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n}\n@media (min-width: 1200px) {\n  [flex-order-gt-lg=\"0\"] {\n    -ms-flex-order: 0;\n        order: 0;\n  }\n  [flex-order-gt-lg=\"1\"] {\n    -ms-flex-order: 1;\n        order: 1;\n  }\n  [flex-order-gt-lg=\"2\"] {\n    -ms-flex-order: 2;\n        order: 2;\n  }\n  [flex-order-gt-lg=\"3\"] {\n    -ms-flex-order: 3;\n        order: 3;\n  }\n  [flex-order-gt-lg=\"4\"] {\n    -ms-flex-order: 4;\n        order: 4;\n  }\n  [flex-order-gt-lg=\"5\"] {\n    -ms-flex-order: 5;\n        order: 5;\n  }\n  [flex-order-gt-lg=\"6\"] {\n    -ms-flex-order: 6;\n        order: 6;\n  }\n  [flex-order-gt-lg=\"7\"] {\n    -ms-flex-order: 7;\n        order: 7;\n  }\n  [flex-order-gt-lg=\"8\"] {\n    -ms-flex-order: 8;\n        order: 8;\n  }\n  [flex-order-gt-lg=\"9\"] {\n    -ms-flex-order: 9;\n        order: 9;\n  }\n  [flex-order-gt-lg=\"10\"] {\n    -ms-flex-order: 10;\n        order: 10;\n  }\n  [flex-order-gt-lg=\"11\"] {\n    -ms-flex-order: 11;\n        order: 11;\n  }\n  [flex-order-gt-lg=\"12\"] {\n    -ms-flex-order: 12;\n        order: 12;\n  }\n  [flex-order-gt-lg=\"13\"] {\n    -ms-flex-order: 13;\n        order: 13;\n  }\n  [flex-order-gt-lg=\"14\"] {\n    -ms-flex-order: 14;\n        order: 14;\n  }\n  [flex-order-gt-lg=\"15\"] {\n    -ms-flex-order: 15;\n        order: 15;\n  }\n  [flex-order-gt-lg=\"16\"] {\n    -ms-flex-order: 16;\n        order: 16;\n  }\n  [flex-order-gt-lg=\"17\"] {\n    -ms-flex-order: 17;\n        order: 17;\n  }\n  [flex-order-gt-lg=\"18\"] {\n    -ms-flex-order: 18;\n        order: 18;\n  }\n  [flex-order-gt-lg=\"19\"] {\n    -ms-flex-order: 19;\n        order: 19;\n  }\n  [flex-order-gt-lg=\"20\"] {\n    -ms-flex-order: 20;\n        order: 20;\n  }\n  [flex-gt-lg] {\n    -ms-flex: 1;\n        flex: 1;\n  }\n  [flex-gt-lg-grow] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    box-sizing: border-box;\n  }\n  [flex-gt-lg-initial] {\n    -ms-flex: 0 1 auto;\n        flex: 0 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-lg-auto] {\n    -ms-flex: 1 1 auto;\n        flex: 1 1 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-lg-none] {\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    box-sizing: border-box;\n  }\n  [flex-gt-lg],\n  [layout=\"row\"] > [flex-gt-lg],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg] {\n    max-height: 100%;\n  }\n  [layout-gt-lg=\"column\"] > [flex-gt-lg],\n  [layout=\"column\"] > [flex-gt-lg] {\n    max-width: 100%;\n  }\n  [flex-gt-lg=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"5\"] {\n    -ms-flex: 1 1 5%;\n        flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [flex-gt-lg=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"10\"] {\n    -ms-flex: 1 1 10%;\n        flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [flex-gt-lg=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"15\"] {\n    -ms-flex: 1 1 15%;\n        flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [flex-gt-lg=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"20\"] {\n    -ms-flex: 1 1 20%;\n        flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [flex-gt-lg=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"25\"] {\n    -ms-flex: 1 1 25%;\n        flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [flex-gt-lg=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"30\"] {\n    -ms-flex: 1 1 30%;\n        flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [flex-gt-lg=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"35\"] {\n    -ms-flex: 1 1 35%;\n        flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [flex-gt-lg=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"40\"] {\n    -ms-flex: 1 1 40%;\n        flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [flex-gt-lg=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"45\"] {\n    -ms-flex: 1 1 45%;\n        flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [flex-gt-lg=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"50\"] {\n    -ms-flex: 1 1 50%;\n        flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [flex-gt-lg=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"55\"] {\n    -ms-flex: 1 1 55%;\n        flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [flex-gt-lg=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"60\"] {\n    -ms-flex: 1 1 60%;\n        flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [flex-gt-lg=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"65\"] {\n    -ms-flex: 1 1 65%;\n        flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [flex-gt-lg=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"70\"] {\n    -ms-flex: 1 1 70%;\n        flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [flex-gt-lg=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"75\"] {\n    -ms-flex: 1 1 75%;\n        flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [flex-gt-lg=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"80\"] {\n    -ms-flex: 1 1 80%;\n        flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [flex-gt-lg=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"85\"] {\n    -ms-flex: 1 1 85%;\n        flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [flex-gt-lg=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"90\"] {\n    -ms-flex: 1 1 90%;\n        flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [flex-gt-lg=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"95\"] {\n    -ms-flex: 1 1 95%;\n        flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [flex-gt-lg=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"100\"] {\n    -ms-flex: 1 1 100%;\n        flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"33\"] {\n    -ms-flex: 1 1 33.33%;\n        flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"66\"] {\n    -ms-flex: 1 1 66.66%;\n        flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [layout-gt-lg] {\n    display: -ms-flexbox;\n    display: flex;\n  }\n  [layout-gt-lg=\"column\"] {\n    -ms-flex-direction: column;\n        flex-direction: column;\n  }\n  [layout-gt-lg=\"row\"] {\n    -ms-flex-direction: row;\n        flex-direction: row;\n  }\n  [hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide-gt-md]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]),\n  [hide-gt-lg]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]) {\n    display: none;\n  }\n}\n/* ========================================\n    CUSTOM\n   ======================================== */\n/*  ========================================\n    COLORS\n    ======================================== */\n/*  ========================================\n    FONTS\n    ======================================== */\n/*  ========================================\n    BREAKPOINTS\n    ======================================== */\n/*  ========================================\n    Z-INDEXES\n    ======================================== */\n/*  ========================================\n    DURATIONS\n    ======================================== */\n/*  ========================================\n    DURATIONS\n    ======================================== */\n/* ========================================\nMIXINS\n* General Use Mixins to ease up reoccuring styles\n* No Components!\n======================================== */\n/* ========================================\nBUTTON COMPONENT\n* Defines a full-width colorful container\n*\n* @size: small|medium|large|custom(e.g.:5%)\n* @indent: small|medium|large|custom(e.g.:5%)\n* @color: color\n======================================== */\n.button.outline {\n  display: inline-block;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.33s ease;\n  font-family: 'Oswald', cursive;\n  background-color: transparent;\n  color: #fafafa;\n  border: 1px solid #fafafa;\n}\n.button.outline:hover {\n  background-color: #fafafa;\n  color: #c65379;\n}\n.button.reverse {\n  display: inline-block;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.33s ease;\n  font-family: 'Oswald', cursive;\n  background-color: transparent;\n  color: #c65379;\n  border: 1px solid #c65379;\n}\n.button.reverse:hover {\n  color: #fafafa;\n  background-color: #c65379;\n}\n/* ========================================\nCARD COMPONENT\n* Defines a rectangular area, used for a specific kind of content\n* containing a title, description and actions (buttons/icons)\n* a card is often used together with grid systems to evenly\n* distribute related content.\n* Cards contain little and scannable content to quickly get to the desired\n* full content. Thus, a description should contain not more than 140 letters\n*\n* @type\n======================================== */\nnav {\n  position: relative;\n}\nnav .toggle-navigation {\n  display: none;\n}\nnav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: block;\n}\n@media screen and (min-width: 960px) {\n  nav ul {\n    display: -ms-flexbox;\n    display: flex;\n  }\n}\nnav li {\n  display: block;\n}\nnav li a {\n  display: inline-block;\n  font-family: 'Oswald', cursive;\n  text-transform: uppercase;\n  color: #050505;\n  margin: 0 0 0 2em;\n  margin-top: 0 !important;\n  line-height: 3em;\n}\nnav li a:hover {\n  color: #050505;\n}\n@media screen and (max-width: 960px) {\n  nav {\n    display: block;\n    width: 100%;\n  }\n  nav li {\n    border-top: 1px solid rgba(5, 5, 5, 0.15);\n    width: 100%;\n  }\n  nav li a {\n    display: block;\n    margin-left: 0;\n    line-height: 2.5em;\n    width: 100%;\n  }\n}\n@media screen and (max-width: 960px) {\n  nav ul {\n    display: none;\n  }\n  nav.active ul {\n    display: block;\n  }\n  nav .toggle-navigation {\n    display: block;\n    position: absolute;\n    right: 0;\n    font-size: 2.5em;\n    top: -1.25em;\n    cursor: pointer;\n  }\n}\n/* ========================================\nSTRIPE COMPONENT\n* Defines a full-width colorful container\n*\n* @padding: small|medium|large|custom(e.g.:5%)\n* @width: small|medium|large|custom(e.g.:300)\n* this value is substracted from the current breakpoint\n* @color: color\n======================================== */\n/* ========================================\nBASE\n* Contains HTML default elements (b,i,u,table...)\n* Does not contain classes, ids\n* Can implement mixins\n======================================== */\n* {\n  box-sizing: border-box;\n}\n::-webkit-scrollbar {\n  width: .5em;\n}\n::-webkit-scrollbar-thumb {\n  background: rgba(250, 250, 250, 0.5);\n  border-radius: 1em;\n}\n::-webkit-scrollbar-track {\n  background: rgba(5, 5, 5, 0.5);\n  border-radius: 1em;\n}\n/*  ========================================\n    BLOCK ELEMENTS\n    ======================================== */\nbody,\nhtml {\n  background-color: #fafafa;\n  min-width: 320px;\n  font-family: 'Oswald', cursive;\n  font-weight: 300;\n  font-size: 16px;\n  line-height: 1.5em;\n  color: #050505;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  width: 100%;\n}\ntable {\n  margin: 1em 0 2em 0;\n  border-spacing: 0;\n  width: 100%;\n}\ntable thead {\n  background: #ededed;\n}\ntable th {\n  font-family: 'Oswald', cursive, sans-serif;\n  font-weight: normal;\n  text-align: left;\n  background: #ededed;\n  vertical-align: top;\n}\ntable tr th,\ntable tr td {\n  vertical-align: top;\n  padding: .75em .75em .25em .5em;\n  border-bottom: 1px solid #e0e0e0;\n}\n/*  ========================================\n    TEXTUAL/CONTENT ELEMENTS\n    ======================================== */\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  margin: 1em 0;\n  line-height: 1.25em;\n  text-transform: none;\n  font-family: 'Aguafina Script', cursive;\n  font-weight: 400;\n}\nh1 {\n  color: #fafafa;\n  font-size: 2.5em;\n  margin: 0;\n}\nh2 {\n  font-size: 1.5em;\n}\nh3,\nh3 a {\n  font-size: 1.15em;\n  color: #c65379;\n}\nh4 {\n  font-size: 1rem;\n  color: #c65379;\n}\nhr {\n  margin: 1em 0;\n  border: none;\n  width: 100%;\n  height: .1rem;\n  background-color: #858585;\n}\np {\n  padding: 0;\n  margin: 1em 0;\n  line-height: 1.5em;\n  word-wrap: break-word;\n}\np:first-child {\n  margin-top: 0;\n}\np:last-child {\n  margin-bottom: 0;\n}\na {\n  position: relative;\n  transition: all 0.33s ease;\n  color: #66c653;\n  text-decoration: none;\n  cursor: pointer;\n  outline: 0;\n}\na:hover {\n  color: #66c653;\n}\na img {\n  border: none;\n  outline: none;\n}\na p,\na span {\n  cursor: pointer;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\nul {\n  list-style: square;\n}\nul,\nol {\n  padding: 0 0 0 1em;\n  margin-bottom: 0;\n}\nol {\n  list-style-type: decimal;\n}\nol ol {\n  list-style-type: lower-alpha;\n}\nb,\nstrong {\n  font-weight: normal;\n  font-family: 'Oswald', cursive, sans-serif;\n}\n/*  ========================================\n    FORM ELEMENTS\n    ======================================== */\nfieldset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n/* ========================================\nLAYOUT\n* The Layout contains a set of configurations\n* Other than assigning classes to your markup, you assign your style to your html.\n* should contain very basic theming\n======================================== */\n* {\n  box-sizing: border-box;\n  transition: all 0.33s ease;\n}\nheader {\n  padding: 2em 0;\n  background-color: #c65379;\n  width: 100%;\n  border-bottom: 0.25em solid rgba(5, 5, 5, 0.2);\n  padding-top: small;\n  padding-bottom: small;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fafafa;\n  font-size: 2em;\n}\nheader > * {\n  margin: 0 auto;\n}\n@media screen and (max-width: 600px) {\n  header > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  header > * {\n    width: 594.66666667px;\n  }\n}\n@media screen and (min-width: 960px) {\n  header > * {\n    width: 952px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  header > * {\n    width: 1184px;\n  }\n}\nsection.breakpoints > * {\n  padding: 2em 0;\n  background-color: #fafafa;\n  border-bottom: 0.25em solid rgba(5, 5, 5, 0.2);\n  padding-top: small;\n  padding-bottom: small;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  width: 100%;\n}\nbreakpoint {\n  display: block;\n}\n.content {\n  padding: 2em 0;\n  background-color: #fafafa;\n  width: 100%;\n  border-bottom: 0.25em solid rgba(5, 5, 5, 0.2);\n  padding-top: large;\n  padding-bottom: large;\n  padding-top: 4em;\n  padding-bottom: 4em;\n}\n.content > * {\n  margin: 0 auto;\n}\n@media screen and (max-width: 600px) {\n  .content > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  .content > * {\n    width: 599.33333333px;\n  }\n}\n@media screen and (min-width: 960px) {\n  .content > * {\n    width: 959px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  .content > * {\n    width: 1198px;\n  }\n}\n.content footer {\n  margin-top: 4em;\n}\n.content.article article header {\n  margin-bottom: 4em;\n}\n.content.article article > div h1,\n.content.article article > div h2,\n.content.article article > div h3,\n.content.article article > div h4 {\n  color: #66c653;\n}\n.content.article article > div h1 span,\n.content.article article > div h2 span,\n.content.article article > div h3 span,\n.content.article article > div h4 span {\n  display: block;\n  font-family: 'Oswald', cursive, sans-serif;\n}\n.content.article article > div h1 span:after,\n.content.article article > div h2 span:after,\n.content.article article > div h3 span:after,\n.content.article article > div h4 span:after {\n  display: none;\n}\n.content.article article > div ul,\n.content.article article > div ol {\n  padding-left: 1.5em;\n}\n.content.article article > div ul {\n  list-style: square;\n}\n.content.article article > div ul.toc-indentation {\n  list-style: square !important;\n}\n.content.article article > div ol {\n  list-style: decimal;\n}\n.content.article article > div img:not(.inline-image) {\n  margin: 1em 0;\n  display: block;\n  border-radius: .25em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: all 0.33s ease-in-out;\n}\n.content.article article > div ul img:not(.inline-image),\n.content.article article > div ol img:not(.inline-image) {\n  margin: .75em 0 1.25em 0;\n}\n.content.article article > div img {\n  width: auto;\n  display: block;\n}\n.content.article article > div table img {\n  width: auto;\n  height: auto;\n  margin: 0;\n}\n.content.article article > div img[align=center] {\n  display: block;\n  margin: 0 auto;\n}\n.content.article article > div img[align=left] {\n  float: left;\n  margin: 5px 4em 4em 0;\n  max-width: 40%;\n}\n.content.article article > div img[align=right] {\n  float: right;\n  margin: 5px 0 4em 4em;\n  max-width: 40%;\n}\n.content.article article > div img.emoticon {\n  margin: 0;\n  display: inline-block;\n}\n.content.article article > div p em {\n  font-style: italic;\n}\n.content.article article > div blockquote {\n  margin: 1em 0 1.8em 0;\n  padding: 0 0 0 2em;\n  border-left: 0.1em solid #66c653;\n}\n.content.article article > div blockquote p:first-child,\n.content.article article > div blockquote p:last-child {\n  padding: 0;\n}\n.content.article article > div p > a.button {\n  display: inline-block;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.33s ease;\n  font-family: 'Oswald', cursive;\n  background-color: transparent;\n  color: #c65379;\n  border: 1px solid #c65379;\n}\n.content.article article > div p > a.button:hover {\n  color: #fafafa;\n  background-color: #c65379;\n}\n.content.article article > div ul.toc-indentation,\n.content.article article > div ol.toc-indentation {\n  margin-left: 2em !important;\n}\n.content.article article > div .panel {\n  padding: 1em 1em 1em 1.5em;\n  margin: 0 0;\n  background-color: #fafafa;\n}\n.content.article article > div .panel.hs-cta-panel {\n  margin: 1.5em 0;\n}\n.content.article article > div .panel.hs-cta-panel .panelContent {\n  padding: .75em 2em;\n}\n.content.article article > div .panel .panelContent {\n  padding: 2.5em;\n}\n.content.article article > div .panel .panelContent p > strong:first-child {\n  display: block;\n  font-family: 'Oswald', cursive, sans serif;\n  font-weight: normal;\n  font-size: 1.2em;\n  line-height: 1.8em;\n  text-transform: uppercase;\n  color: #66c653;\n}\n.content.article article > div .panel .panelContent img[align=right] {\n  width: 25%;\n}\n.content.article article > div .panel :after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.content.article article > div .panel:not(.subtle) a {\n  display: inline-block;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.33s ease;\n  font-family: 'Oswald', cursive;\n  background-color: #c65379;\n  color: #050505;\n}\n.content.article article > div .panel:not(.subtle) a:hover {\n  box-sizing: border-box;\n  animation-name: lsd-background;\n  animation-duration: 3s;\n  animation-iteration-count: infinite;\n  color: #050505;\n}\n.content.article article > div .panel.code {\n  padding: 0 0 1em;\n}\n.content.article article > div .panel.code pre {\n  margin: 0;\n  font-size: .8em;\n  line-height: 1.2em;\n  overflow: auto;\n  padding: 1em;\n  border: 1px solid rgba(5, 5, 5, 0.5);\n  border-radius: .25em;\n}\n.content.article article > div ol li .admonition,\n.content.article article > div ul li .admonition {\n  margin-top: 0;\n}\n.content.article article > div .refresh-macro,\n.content.article article > div .refresh-issues-bottom {\n  display: none;\n}\n", ""]);

	// exports


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "/*! nouislider - 8.5.1 - 2016-04-24 16:00:30 */\r\n\r\n\r\n.noUi-target,.noUi-target *{-webkit-touch-callout:none;-webkit-user-select:none;-ms-touch-action:none;touch-action:none;-ms-user-select:none;-moz-user-select:none;user-select:none;-moz-box-sizing:border-box;box-sizing:border-box}.noUi-target{position:relative;direction:ltr}.noUi-base{width:100%;height:100%;position:relative;z-index:1}.noUi-origin{position:absolute;right:0;top:0;left:0;bottom:0}.noUi-handle{position:relative;z-index:1}.noUi-stacking .noUi-handle{z-index:10}.noUi-state-tap .noUi-origin{-webkit-transition:left .3s,top .3s;transition:left .3s,top .3s}.noUi-state-drag *{cursor:inherit!important}.noUi-base,.noUi-handle{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.noUi-horizontal{height:18px}.noUi-horizontal .noUi-handle{width:34px;height:28px;left:-17px;top:-6px}.noUi-vertical{width:18px}.noUi-vertical .noUi-handle{width:28px;height:34px;left:-6px;top:-17px}.noUi-background{background:#FAFAFA;box-shadow:inset 0 1px 1px #f0f0f0}.noUi-connect{background:#3FB8AF;box-shadow:inset 0 0 3px rgba(51,51,51,.45);-webkit-transition:background 450ms;transition:background 450ms}.noUi-origin{border-radius:2px}.noUi-target{border-radius:4px;border:1px solid #D3D3D3;box-shadow:inset 0 1px 1px #F0F0F0,0 3px 6px -5px #BBB}.noUi-target.noUi-connect{box-shadow:inset 0 0 3px rgba(51,51,51,.45),0 3px 6px -5px #BBB}.noUi-draggable{cursor:w-resize}.noUi-vertical .noUi-draggable{cursor:n-resize}.noUi-handle{border:1px solid #D9D9D9;border-radius:3px;background:#FFF;cursor:default;box-shadow:inset 0 0 1px #FFF,inset 0 1px 7px #EBEBEB,0 3px 6px -3px #BBB}.noUi-active{box-shadow:inset 0 0 1px #FFF,inset 0 1px 7px #DDD,0 3px 6px -3px #BBB}.noUi-handle:after,.noUi-handle:before{content:\"\";display:block;position:absolute;height:14px;width:1px;background:#E8E7E6;left:14px;top:6px}.noUi-handle:after{left:17px}.noUi-vertical .noUi-handle:after,.noUi-vertical .noUi-handle:before{width:14px;height:1px;left:6px;top:14px}.noUi-vertical .noUi-handle:after{top:17px}[disabled] .noUi-connect,[disabled].noUi-connect{background:#B8B8B8}[disabled] .noUi-handle,[disabled].noUi-origin{cursor:not-allowed}.noUi-pips,.noUi-pips *{-moz-box-sizing:border-box;box-sizing:border-box}.noUi-pips{position:absolute;color:#999}.noUi-value{position:absolute;text-align:center}.noUi-value-sub{color:#ccc;font-size:10px}.noUi-marker{position:absolute;background:#CCC}.noUi-marker-large,.noUi-marker-sub{background:#AAA}.noUi-pips-horizontal{padding:10px 0;height:80px;top:100%;left:0;width:100%}.noUi-value-horizontal{-webkit-transform:translate3d(-50%,50%,0);transform:translate3d(-50%,50%,0)}.noUi-marker-horizontal.noUi-marker{margin-left:-1px;width:2px;height:5px}.noUi-marker-horizontal.noUi-marker-sub{height:10px}.noUi-marker-horizontal.noUi-marker-large{height:15px}.noUi-pips-vertical{padding:0 10px;height:100%;top:0;left:100%}.noUi-value-vertical{-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0);padding-left:25px}.noUi-marker-vertical.noUi-marker{width:5px;height:2px;margin-top:-1px}.noUi-marker-vertical.noUi-marker-sub{width:10px}.noUi-marker-vertical.noUi-marker-large{width:15px}.noUi-tooltip{display:block;position:absolute;border:1px solid #D9D9D9;border-radius:3px;background:#fff;padding:5px;text-align:center}.noUi-horizontal .noUi-handle-lower .noUi-tooltip{top:-32px}.noUi-horizontal .noUi-handle-upper .noUi-tooltip{bottom:-32px}.noUi-vertical .noUi-handle-lower .noUi-tooltip{left:120%}.noUi-vertical .noUi-handle-upper .noUi-tooltip{right:120%}", ""]);

	// exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*! nouislider - 8.5.1 - 2016-04-24 16:00:29 */

	(function (factory) {

		if (true) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {

			// Node/CommonJS
			module.exports = factory();
		} else {

			// Browser globals
			window.noUiSlider = factory();
		}
	})(function () {

		'use strict';

		// Removes duplicates from an array.

		function unique(array) {
			return array.filter(function (a) {
				return !this[a] ? this[a] = true : false;
			}, {});
		}

		// Round a value to the closest 'to'.
		function closest(value, to) {
			return Math.round(value / to) * to;
		}

		// Current position of an element relative to the document.
		function offset(elem) {

			var rect = elem.getBoundingClientRect(),
			    doc = elem.ownerDocument,
			    docElem = doc.documentElement,
			    pageOffset = getPageOffset();

			// getBoundingClientRect contains left scroll in Chrome on Android.
			// I haven't found a feature detection that proves this. Worst case
			// scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
			if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
				pageOffset.x = 0;
			}

			return {
				top: rect.top + pageOffset.y - docElem.clientTop,
				left: rect.left + pageOffset.x - docElem.clientLeft
			};
		}

		// Checks whether a value is numerical.
		function isNumeric(a) {
			return typeof a === 'number' && !isNaN(a) && isFinite(a);
		}

		// Sets a class and removes it after [duration] ms.
		function addClassFor(element, className, duration) {
			addClass(element, className);
			setTimeout(function () {
				removeClass(element, className);
			}, duration);
		}

		// Limits a value to 0 - 100
		function limit(a) {
			return Math.max(Math.min(a, 100), 0);
		}

		// Wraps a variable as an array, if it isn't one yet.
		function asArray(a) {
			return Array.isArray(a) ? a : [a];
		}

		// Counts decimals
		function countDecimals(numStr) {
			var pieces = numStr.split(".");
			return pieces.length > 1 ? pieces[1].length : 0;
		}

		// http://youmightnotneedjquery.com/#add_class
		function addClass(el, className) {
			if (el.classList) {
				el.classList.add(className);
			} else {
				el.className += ' ' + className;
			}
		}

		// http://youmightnotneedjquery.com/#remove_class
		function removeClass(el, className) {
			if (el.classList) {
				el.classList.remove(className);
			} else {
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}

		// https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
		function hasClass(el, className) {
			return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
		function getPageOffset() {

			var supportPageOffset = window.pageXOffset !== undefined,
			    isCSS1Compat = (document.compatMode || "") === "CSS1Compat",
			    x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
			    y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

			return {
				x: x,
				y: y
			};
		}

		// we provide a function to compute constants instead
		// of accessing window.* as soon as the module needs it
		// so that we do not compute anything if not needed
		function getActions() {

			// Determine the events to bind. IE11 implements pointerEvents without
			// a prefix, which breaks compatibility with the IE10 implementation.
			return window.navigator.pointerEnabled ? {
				start: 'pointerdown',
				move: 'pointermove',
				end: 'pointerup'
			} : window.navigator.msPointerEnabled ? {
				start: 'MSPointerDown',
				move: 'MSPointerMove',
				end: 'MSPointerUp'
			} : {
				start: 'mousedown touchstart',
				move: 'mousemove touchmove',
				end: 'mouseup touchend'
			};
		}

		// Value calculation

		// Determine the size of a sub-range in relation to a full range.
		function subRangeRatio(pa, pb) {
			return 100 / (pb - pa);
		}

		// (percentage) How many percent is this value of this range?
		function fromPercentage(range, value) {
			return value * 100 / (range[1] - range[0]);
		}

		// (percentage) Where is this value on this range?
		function toPercentage(range, value) {
			return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
		}

		// (value) How much is this percentage on this range?
		function isPercentage(range, value) {
			return value * (range[1] - range[0]) / 100 + range[0];
		}

		// Range conversion

		function getJ(value, arr) {

			var j = 1;

			while (value >= arr[j]) {
				j += 1;
			}

			return j;
		}

		// (percentage) Input a value, find where, on a scale of 0-100, it applies.
		function toStepping(xVal, xPct, value) {

			if (value >= xVal.slice(-1)[0]) {
				return 100;
			}

			var j = getJ(value, xVal),
			    va,
			    vb,
			    pa,
			    pb;

			va = xVal[j - 1];
			vb = xVal[j];
			pa = xPct[j - 1];
			pb = xPct[j];

			return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
		}

		// (value) Input a percentage, find where it is on the specified range.
		function fromStepping(xVal, xPct, value) {

			// There is no range group that fits 100
			if (value >= 100) {
				return xVal.slice(-1)[0];
			}

			var j = getJ(value, xPct),
			    va,
			    vb,
			    pa,
			    pb;

			va = xVal[j - 1];
			vb = xVal[j];
			pa = xPct[j - 1];
			pb = xPct[j];

			return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
		}

		// (percentage) Get the step that applies at a certain value.
		function getStep(xPct, xSteps, snap, value) {

			if (value === 100) {
				return value;
			}

			var j = getJ(value, xPct),
			    a,
			    b;

			// If 'snap' is set, steps are used as fixed points on the slider.
			if (snap) {

				a = xPct[j - 1];
				b = xPct[j];

				// Find the closest position, a or b.
				if (value - a > (b - a) / 2) {
					return b;
				}

				return a;
			}

			if (!xSteps[j - 1]) {
				return value;
			}

			return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
		}

		// Entry parsing

		function handleEntryPoint(index, value, that) {

			var percentage;

			// Wrap numerical input in an array.
			if (typeof value === "number") {
				value = [value];
			}

			// Reject any invalid input, by testing whether value is an array.
			if (Object.prototype.toString.call(value) !== '[object Array]') {
				throw new Error("noUiSlider: 'range' contains invalid value.");
			}

			// Covert min/max syntax to 0 and 100.
			if (index === 'min') {
				percentage = 0;
			} else if (index === 'max') {
				percentage = 100;
			} else {
				percentage = parseFloat(index);
			}

			// Check for correct input.
			if (!isNumeric(percentage) || !isNumeric(value[0])) {
				throw new Error("noUiSlider: 'range' value isn't numeric.");
			}

			// Store values.
			that.xPct.push(percentage);
			that.xVal.push(value[0]);

			// NaN will evaluate to false too, but to keep
			// logging clear, set step explicitly. Make sure
			// not to override the 'step' setting with false.
			if (!percentage) {
				if (!isNaN(value[1])) {
					that.xSteps[0] = value[1];
				}
			} else {
				that.xSteps.push(isNaN(value[1]) ? false : value[1]);
			}
		}

		function handleStepPoint(i, n, that) {

			// Ignore 'false' stepping.
			if (!n) {
				return true;
			}

			// Factor to range ratio
			that.xSteps[i] = fromPercentage([that.xVal[i], that.xVal[i + 1]], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);
		}

		// Interface

		// The interface to Spectrum handles all direction-based
		// conversions, so the above values are unaware.

		function Spectrum(entry, snap, direction, singleStep) {

			this.xPct = [];
			this.xVal = [];
			this.xSteps = [singleStep || false];
			this.xNumSteps = [false];

			this.snap = snap;
			this.direction = direction;

			var index,
			    ordered = [/* [0, 'min'], [1, '50%'], [2, 'max'] */];

			// Map the object keys to an array.
			for (index in entry) {
				if (entry.hasOwnProperty(index)) {
					ordered.push([entry[index], index]);
				}
			}

			// Sort all entries by value (numeric sort).
			if (ordered.length && _typeof(ordered[0][0]) === "object") {
				ordered.sort(function (a, b) {
					return a[0][0] - b[0][0];
				});
			} else {
				ordered.sort(function (a, b) {
					return a[0] - b[0];
				});
			}

			// Convert all entries to subranges.
			for (index = 0; index < ordered.length; index++) {
				handleEntryPoint(ordered[index][1], ordered[index][0], this);
			}

			// Store the actual step values.
			// xSteps is sorted in the same order as xPct and xVal.
			this.xNumSteps = this.xSteps.slice(0);

			// Convert all numeric steps to the percentage of the subrange they represent.
			for (index = 0; index < this.xNumSteps.length; index++) {
				handleStepPoint(index, this.xNumSteps[index], this);
			}
		}

		Spectrum.prototype.getMargin = function (value) {
			return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
		};

		Spectrum.prototype.toStepping = function (value) {

			value = toStepping(this.xVal, this.xPct, value);

			// Invert the value if this is a right-to-left slider.
			if (this.direction) {
				value = 100 - value;
			}

			return value;
		};

		Spectrum.prototype.fromStepping = function (value) {

			// Invert the value if this is a right-to-left slider.
			if (this.direction) {
				value = 100 - value;
			}

			return fromStepping(this.xVal, this.xPct, value);
		};

		Spectrum.prototype.getStep = function (value) {

			// Find the proper step for rtl sliders by search in inverse direction.
			// Fixes issue #262.
			if (this.direction) {
				value = 100 - value;
			}

			value = getStep(this.xPct, this.xSteps, this.snap, value);

			if (this.direction) {
				value = 100 - value;
			}

			return value;
		};

		Spectrum.prototype.getApplicableStep = function (value) {

			// If the value is 100%, return the negative step twice.
			var j = getJ(value, this.xPct),
			    offset = value === 100 ? 2 : 1;
			return [this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[j - offset]];
		};

		// Outside testing
		Spectrum.prototype.convert = function (value) {
			return this.getStep(this.toStepping(value));
		};

		/*	Every input option is tested and parsed. This'll prevent
	 	endless validation in internal methods. These tests are
	 	structured with an item for every option available. An
	 	option can be marked as required by setting the 'r' flag.
	 	The testing function is provided with three arguments:
	 		- The provided value for the option;
	 		- A reference to the options object;
	 		- The name for the option;
	 
	 	The testing function returns false when an error is detected,
	 	or true when everything is OK. It can also modify the option
	 	object, to make sure all values can be correctly looped elsewhere. */

		var defaultFormatter = { 'to': function to(value) {
				return value !== undefined && value.toFixed(2);
			}, 'from': Number };

		function testStep(parsed, entry) {

			if (!isNumeric(entry)) {
				throw new Error("noUiSlider: 'step' is not numeric.");
			}

			// The step option can still be used to set stepping
			// for linear sliders. Overwritten if set in 'range'.
			parsed.singleStep = entry;
		}

		function testRange(parsed, entry) {

			// Filter incorrect input.
			if ((typeof entry === 'undefined' ? 'undefined' : _typeof(entry)) !== 'object' || Array.isArray(entry)) {
				throw new Error("noUiSlider: 'range' is not an object.");
			}

			// Catch missing start or end.
			if (entry.min === undefined || entry.max === undefined) {
				throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
			}

			// Catch equal start or end.
			if (entry.min === entry.max) {
				throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
			}

			parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
		}

		function testStart(parsed, entry) {

			entry = asArray(entry);

			// Validate input. Values aren't tested, as the public .val method
			// will always provide a valid location.
			if (!Array.isArray(entry) || !entry.length || entry.length > 2) {
				throw new Error("noUiSlider: 'start' option is incorrect.");
			}

			// Store the number of handles.
			parsed.handles = entry.length;

			// When the slider is initialized, the .val method will
			// be called with the start options.
			parsed.start = entry;
		}

		function testSnap(parsed, entry) {

			// Enforce 100% stepping within subranges.
			parsed.snap = entry;

			if (typeof entry !== 'boolean') {
				throw new Error("noUiSlider: 'snap' option must be a boolean.");
			}
		}

		function testAnimate(parsed, entry) {

			// Enforce 100% stepping within subranges.
			parsed.animate = entry;

			if (typeof entry !== 'boolean') {
				throw new Error("noUiSlider: 'animate' option must be a boolean.");
			}
		}

		function testAnimationDuration(parsed, entry) {

			parsed.animationDuration = entry;

			if (typeof entry !== 'number') {
				throw new Error("noUiSlider: 'animationDuration' option must be a number.");
			}
		}

		function testConnect(parsed, entry) {

			if (entry === 'lower' && parsed.handles === 1) {
				parsed.connect = 1;
			} else if (entry === 'upper' && parsed.handles === 1) {
				parsed.connect = 2;
			} else if (entry === true && parsed.handles === 2) {
				parsed.connect = 3;
			} else if (entry === false) {
				parsed.connect = 0;
			} else {
				throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
			}
		}

		function testOrientation(parsed, entry) {

			// Set orientation to an a numerical value for easy
			// array selection.
			switch (entry) {
				case 'horizontal':
					parsed.ort = 0;
					break;
				case 'vertical':
					parsed.ort = 1;
					break;
				default:
					throw new Error("noUiSlider: 'orientation' option is invalid.");
			}
		}

		function testMargin(parsed, entry) {

			if (!isNumeric(entry)) {
				throw new Error("noUiSlider: 'margin' option must be numeric.");
			}

			// Issue #582
			if (entry === 0) {
				return;
			}

			parsed.margin = parsed.spectrum.getMargin(entry);

			if (!parsed.margin) {
				throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
			}
		}

		function testLimit(parsed, entry) {

			if (!isNumeric(entry)) {
				throw new Error("noUiSlider: 'limit' option must be numeric.");
			}

			parsed.limit = parsed.spectrum.getMargin(entry);

			if (!parsed.limit) {
				throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
			}
		}

		function testDirection(parsed, entry) {

			// Set direction as a numerical value for easy parsing.
			// Invert connection for RTL sliders, so that the proper
			// handles get the connect/background classes.
			switch (entry) {
				case 'ltr':
					parsed.dir = 0;
					break;
				case 'rtl':
					parsed.dir = 1;
					parsed.connect = [0, 2, 1, 3][parsed.connect];
					break;
				default:
					throw new Error("noUiSlider: 'direction' option was not recognized.");
			}
		}

		function testBehaviour(parsed, entry) {

			// Make sure the input is a string.
			if (typeof entry !== 'string') {
				throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
			}

			// Check if the string contains any keywords.
			// None are required.
			var tap = entry.indexOf('tap') >= 0,
			    drag = entry.indexOf('drag') >= 0,
			    fixed = entry.indexOf('fixed') >= 0,
			    snap = entry.indexOf('snap') >= 0,
			    hover = entry.indexOf('hover') >= 0;

			// Fix #472
			if (drag && !parsed.connect) {
				throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
			}

			parsed.events = {
				tap: tap || snap,
				drag: drag,
				fixed: fixed,
				snap: snap,
				hover: hover
			};
		}

		function testTooltips(parsed, entry) {

			var i;

			if (entry === false) {
				return;
			} else if (entry === true) {

				parsed.tooltips = [];

				for (i = 0; i < parsed.handles; i++) {
					parsed.tooltips.push(true);
				}
			} else {

				parsed.tooltips = asArray(entry);

				if (parsed.tooltips.length !== parsed.handles) {
					throw new Error("noUiSlider: must pass a formatter for all handles.");
				}

				parsed.tooltips.forEach(function (formatter) {
					if (typeof formatter !== 'boolean' && ((typeof formatter === 'undefined' ? 'undefined' : _typeof(formatter)) !== 'object' || typeof formatter.to !== 'function')) {
						throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
					}
				});
			}
		}

		function testFormat(parsed, entry) {

			parsed.format = entry;

			// Any object with a to and from method is supported.
			if (typeof entry.to === 'function' && typeof entry.from === 'function') {
				return true;
			}

			throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
		}

		function testCssPrefix(parsed, entry) {

			if (entry !== undefined && typeof entry !== 'string' && entry !== false) {
				throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
			}

			parsed.cssPrefix = entry;
		}

		function testCssClasses(parsed, entry) {

			if (entry !== undefined && (typeof entry === 'undefined' ? 'undefined' : _typeof(entry)) !== 'object') {
				throw new Error("noUiSlider: 'cssClasses' must be an object.");
			}

			if (typeof parsed.cssPrefix === 'string') {
				parsed.cssClasses = {};

				for (var key in entry) {
					if (!entry.hasOwnProperty(key)) {
						continue;
					}

					parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
				}
			} else {
				parsed.cssClasses = entry;
			}
		}

		// Test all developer settings and parse to assumption-safe values.
		function testOptions(options) {

			// To prove a fix for #537, freeze options here.
			// If the object is modified, an error will be thrown.
			// Object.freeze(options);

			var parsed = {
				margin: 0,
				limit: 0,
				animate: true,
				animationDuration: 300,
				format: defaultFormatter
			},
			    tests;

			// Tests are executed in the order they are presented here.
			tests = {
				'step': { r: false, t: testStep },
				'start': { r: true, t: testStart },
				'connect': { r: true, t: testConnect },
				'direction': { r: true, t: testDirection },
				'snap': { r: false, t: testSnap },
				'animate': { r: false, t: testAnimate },
				'animationDuration': { r: false, t: testAnimationDuration },
				'range': { r: true, t: testRange },
				'orientation': { r: false, t: testOrientation },
				'margin': { r: false, t: testMargin },
				'limit': { r: false, t: testLimit },
				'behaviour': { r: true, t: testBehaviour },
				'format': { r: false, t: testFormat },
				'tooltips': { r: false, t: testTooltips },
				'cssPrefix': { r: false, t: testCssPrefix },
				'cssClasses': { r: false, t: testCssClasses }
			};

			var defaults = {
				'connect': false,
				'direction': 'ltr',
				'behaviour': 'tap',
				'orientation': 'horizontal',
				'cssPrefix': 'noUi-',
				'cssClasses': {
					target: 'target',
					base: 'base',
					origin: 'origin',
					handle: 'handle',
					handleLower: 'handle-lower',
					handleUpper: 'handle-upper',
					horizontal: 'horizontal',
					vertical: 'vertical',
					background: 'background',
					connect: 'connect',
					ltr: 'ltr',
					rtl: 'rtl',
					draggable: 'draggable',
					drag: 'state-drag',
					tap: 'state-tap',
					active: 'active',
					stacking: 'stacking',
					tooltip: 'tooltip',
					pips: 'pips',
					pipsHorizontal: 'pips-horizontal',
					pipsVertical: 'pips-vertical',
					marker: 'marker',
					markerHorizontal: 'marker-horizontal',
					markerVertical: 'marker-vertical',
					markerNormal: 'marker-normal',
					markerLarge: 'marker-large',
					markerSub: 'marker-sub',
					value: 'value',
					valueHorizontal: 'value-horizontal',
					valueVertical: 'value-vertical',
					valueNormal: 'value-normal',
					valueLarge: 'value-large',
					valueSub: 'value-sub'
				}
			};

			// Run all options through a testing mechanism to ensure correct
			// input. It should be noted that options might get modified to
			// be handled properly. E.g. wrapping integers in arrays.
			Object.keys(tests).forEach(function (name) {

				// If the option isn't set, but it is required, throw an error.
				if (options[name] === undefined && defaults[name] === undefined) {

					if (tests[name].r) {
						throw new Error("noUiSlider: '" + name + "' is required.");
					}

					return true;
				}

				tests[name].t(parsed, options[name] === undefined ? defaults[name] : options[name]);
			});

			// Forward pips options
			parsed.pips = options.pips;

			// Pre-define the styles.
			parsed.style = parsed.ort ? 'top' : 'left';

			return parsed;
		}

		function closure(target, options, originalOptions) {
			var actions = getActions(),

			// All variables local to 'closure' are prefixed with 'scope_'
			scope_Target = target,
			    scope_Locations = [-1, -1],
			    scope_Base,
			    scope_Handles,
			    scope_Spectrum = options.spectrum,
			    scope_Values = [],
			    scope_Events = {},
			    scope_Self;

			// Delimit proposed values for handle positions.
			function getPositions(a, b, delimit) {

				// Add movement to current position.
				var c = a + b[0],
				    d = a + b[1];

				// Only alter the other position on drag,
				// not on standard sliding.
				if (delimit) {
					if (c < 0) {
						d += Math.abs(c);
					}
					if (d > 100) {
						c -= d - 100;
					}

					// Limit values to 0 and 100.
					return [limit(c), limit(d)];
				}

				return [c, d];
			}

			// Provide a clean event with standardized offset values.
			function fixEvent(e, pageOffset) {

				// Prevent scrolling and panning on touch events, while
				// attempting to slide. The tap event also depends on this.
				e.preventDefault();

				// Filter the event to register the type, which can be
				// touch, mouse or pointer. Offset changes need to be
				// made on an event specific basis.
				var touch = e.type.indexOf('touch') === 0,
				    mouse = e.type.indexOf('mouse') === 0,
				    pointer = e.type.indexOf('pointer') === 0,
				    x,
				    y,
				    event = e;

				// IE10 implemented pointer events with a prefix;
				if (e.type.indexOf('MSPointer') === 0) {
					pointer = true;
				}

				if (touch) {
					// noUiSlider supports one movement at a time,
					// so we can select the first 'changedTouch'.
					x = e.changedTouches[0].pageX;
					y = e.changedTouches[0].pageY;
				}

				pageOffset = pageOffset || getPageOffset();

				if (mouse || pointer) {
					x = e.clientX + pageOffset.x;
					y = e.clientY + pageOffset.y;
				}

				event.pageOffset = pageOffset;
				event.points = [x, y];
				event.cursor = mouse || pointer; // Fix #435

				return event;
			}

			// Append a handle to the base.
			function addHandle(direction, index) {

				var origin = document.createElement('div'),
				    handle = document.createElement('div'),
				    classModifier = [options.cssClasses.handleLower, options.cssClasses.handleUpper];

				if (direction) {
					classModifier.reverse();
				}

				addClass(handle, options.cssClasses.handle);
				addClass(handle, classModifier[index]);

				addClass(origin, options.cssClasses.origin);
				origin.appendChild(handle);

				return origin;
			}

			// Add the proper connection classes.
			function addConnection(connect, target, handles) {

				// Apply the required connection classes to the elements
				// that need them. Some classes are made up for several
				// segments listed in the class list, to allow easy
				// renaming and provide a minor compression benefit.
				switch (connect) {
					case 1:
						addClass(target, options.cssClasses.connect);
						addClass(handles[0], options.cssClasses.background);
						break;
					case 3:
						addClass(handles[1], options.cssClasses.background);
					/* falls through */
					case 2:
						addClass(handles[0], options.cssClasses.connect);
					/* falls through */
					case 0:
						addClass(target, options.cssClasses.background);
						break;
				}
			}

			// Add handles to the slider base.
			function addHandles(nrHandles, direction, base) {

				var index,
				    handles = [];

				// Append handles.
				for (index = 0; index < nrHandles; index += 1) {

					// Keep a list of all added handles.
					handles.push(base.appendChild(addHandle(direction, index)));
				}

				return handles;
			}

			// Initialize a single slider.
			function addSlider(direction, orientation, target) {

				// Apply classes and data to the target.
				addClass(target, options.cssClasses.target);

				if (direction === 0) {
					addClass(target, options.cssClasses.ltr);
				} else {
					addClass(target, options.cssClasses.rtl);
				}

				if (orientation === 0) {
					addClass(target, options.cssClasses.horizontal);
				} else {
					addClass(target, options.cssClasses.vertical);
				}

				var div = document.createElement('div');
				addClass(div, options.cssClasses.base);
				target.appendChild(div);
				return div;
			}

			function addTooltip(handle, index) {

				if (!options.tooltips[index]) {
					return false;
				}

				var element = document.createElement('div');
				element.className = options.cssClasses.tooltip;
				return handle.firstChild.appendChild(element);
			}

			// The tooltips option is a shorthand for using the 'update' event.
			function tooltips() {

				if (options.dir) {
					options.tooltips.reverse();
				}

				// Tooltips are added with options.tooltips in original order.
				var tips = scope_Handles.map(addTooltip);

				if (options.dir) {
					tips.reverse();
					options.tooltips.reverse();
				}

				bindEvent('update', function (f, o, r) {
					if (tips[o]) {
						tips[o].innerHTML = options.tooltips[o] === true ? f[o] : options.tooltips[o].to(r[o]);
					}
				});
			}

			function getGroup(mode, values, stepped) {

				// Use the range.
				if (mode === 'range' || mode === 'steps') {
					return scope_Spectrum.xVal;
				}

				if (mode === 'count') {

					// Divide 0 - 100 in 'count' parts.
					var spread = 100 / (values - 1),
					    v,
					    i = 0;
					values = [];

					// List these parts and have them handled as 'positions'.
					while ((v = i++ * spread) <= 100) {
						values.push(v);
					}

					mode = 'positions';
				}

				if (mode === 'positions') {

					// Map all percentages to on-range values.
					return values.map(function (value) {
						return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
					});
				}

				if (mode === 'values') {

					// If the value must be stepped, it needs to be converted to a percentage first.
					if (stepped) {

						return values.map(function (value) {

							// Convert to percentage, apply step, return to value.
							return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
						});
					}

					// Otherwise, we can simply use the values.
					return values;
				}
			}

			function generateSpread(density, mode, group) {

				function safeIncrement(value, increment) {
					// Avoid floating point variance by dropping the smallest decimal places.
					return (value + increment).toFixed(7) / 1;
				}

				var originalSpectrumDirection = scope_Spectrum.direction,
				    indexes = {},
				    firstInRange = scope_Spectrum.xVal[0],
				    lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1],
				    ignoreFirst = false,
				    ignoreLast = false,
				    prevPct = 0;

				// This function loops the spectrum in an ltr linear fashion,
				// while the toStepping method is direction aware. Trick it into
				// believing it is ltr.
				scope_Spectrum.direction = 0;

				// Create a copy of the group, sort it and filter away all duplicates.
				group = unique(group.slice().sort(function (a, b) {
					return a - b;
				}));

				// Make sure the range starts with the first element.
				if (group[0] !== firstInRange) {
					group.unshift(firstInRange);
					ignoreFirst = true;
				}

				// Likewise for the last one.
				if (group[group.length - 1] !== lastInRange) {
					group.push(lastInRange);
					ignoreLast = true;
				}

				group.forEach(function (current, index) {

					// Get the current step and the lower + upper positions.
					var step,
					    i,
					    q,
					    low = current,
					    high = group[index + 1],
					    newPct,
					    pctDifference,
					    pctPos,
					    type,
					    steps,
					    realSteps,
					    stepsize;

					// When using 'steps' mode, use the provided steps.
					// Otherwise, we'll step on to the next subrange.
					if (mode === 'steps') {
						step = scope_Spectrum.xNumSteps[index];
					}

					// Default to a 'full' step.
					if (!step) {
						step = high - low;
					}

					// Low can be 0, so test for false. If high is undefined,
					// we are at the last subrange. Index 0 is already handled.
					if (low === false || high === undefined) {
						return;
					}

					// Find all steps in the subrange.
					for (i = low; i <= high; i = safeIncrement(i, step)) {

						// Get the percentage value for the current step,
						// calculate the size for the subrange.
						newPct = scope_Spectrum.toStepping(i);
						pctDifference = newPct - prevPct;

						steps = pctDifference / density;
						realSteps = Math.round(steps);

						// This ratio represents the ammount of percentage-space a point indicates.
						// For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-devided.
						// Round the percentage offset to an even number, then divide by two
						// to spread the offset on both sides of the range.
						stepsize = pctDifference / realSteps;

						// Divide all points evenly, adding the correct number to this subrange.
						// Run up to <= so that 100% gets a point, event if ignoreLast is set.
						for (q = 1; q <= realSteps; q += 1) {

							// The ratio between the rounded value and the actual size might be ~1% off.
							// Correct the percentage offset by the number of points
							// per subrange. density = 1 will result in 100 points on the
							// full range, 2 for 50, 4 for 25, etc.
							pctPos = prevPct + q * stepsize;
							indexes[pctPos.toFixed(5)] = ['x', 0];
						}

						// Determine the point type.
						type = group.indexOf(i) > -1 ? 1 : mode === 'steps' ? 2 : 0;

						// Enforce the 'ignoreFirst' option by overwriting the type for 0.
						if (!index && ignoreFirst) {
							type = 0;
						}

						if (!(i === high && ignoreLast)) {
							// Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
							indexes[newPct.toFixed(5)] = [i, type];
						}

						// Update the percentage count.
						prevPct = newPct;
					}
				});

				// Reset the spectrum.
				scope_Spectrum.direction = originalSpectrumDirection;

				return indexes;
			}

			function addMarking(spread, filterFunc, formatter) {

				var element = document.createElement('div'),
				    out = '',
				    valueSizeClasses = [options.cssClasses.valueNormal, options.cssClasses.valueLarge, options.cssClasses.valueSub],
				    markerSizeClasses = [options.cssClasses.markerNormal, options.cssClasses.markerLarge, options.cssClasses.markerSub],
				    valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical],
				    markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];

				addClass(element, options.cssClasses.pips);
				addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

				function getClasses(type, source) {
					var a = source === options.cssClasses.value,
					    orientationClasses = a ? valueOrientationClasses : markerOrientationClasses,
					    sizeClasses = a ? valueSizeClasses : markerSizeClasses;

					return source + ' ' + orientationClasses[options.ort] + ' ' + sizeClasses[type];
				}

				function getTags(offset, source, values) {
					return 'class="' + getClasses(values[1], source) + '" style="' + options.style + ': ' + offset + '%"';
				}

				function addSpread(offset, values) {

					if (scope_Spectrum.direction) {
						offset = 100 - offset;
					}

					// Apply the filter function, if it is set.
					values[1] = values[1] && filterFunc ? filterFunc(values[0], values[1]) : values[1];

					// Add a marker for every point
					out += '<div ' + getTags(offset, options.cssClasses.marker, values) + '></div>';

					// Values are only appended for points marked '1' or '2'.
					if (values[1]) {
						out += '<div ' + getTags(offset, options.cssClasses.value, values) + '>' + formatter.to(values[0]) + '</div>';
					}
				}

				// Append all points.
				Object.keys(spread).forEach(function (a) {
					addSpread(a, spread[a]);
				});

				element.innerHTML = out;

				return element;
			}

			function pips(grid) {

				var mode = grid.mode,
				    density = grid.density || 1,
				    filter = grid.filter || false,
				    values = grid.values || false,
				    stepped = grid.stepped || false,
				    group = getGroup(mode, values, stepped),
				    spread = generateSpread(density, mode, group),
				    format = grid.format || {
					to: Math.round
				};

				return scope_Target.appendChild(addMarking(spread, filter, format));
			}

			// Shorthand for base dimensions.
			function baseSize() {
				var rect = scope_Base.getBoundingClientRect(),
				    alt = 'offset' + ['Width', 'Height'][options.ort];
				return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
			}

			// External event handling
			function fireEvent(event, handleNumber, tap) {

				var i;

				// During initialization, do not fire events.
				for (i = 0; i < options.handles; i++) {
					if (scope_Locations[i] === -1) {
						return;
					}
				}

				if (handleNumber !== undefined && options.handles !== 1) {
					handleNumber = Math.abs(handleNumber - options.dir);
				}

				Object.keys(scope_Events).forEach(function (targetEvent) {

					var eventType = targetEvent.split('.')[0];

					if (event === eventType) {
						scope_Events[targetEvent].forEach(function (callback) {

							callback.call(
							// Use the slider public API as the scope ('this')
							scope_Self,
							// Return values as array, so arg_1[arg_2] is always valid.
							asArray(valueGet()),
							// Handle index, 0 or 1
							handleNumber,
							// Unformatted slider values
							asArray(inSliderOrder(Array.prototype.slice.call(scope_Values))),
							// Event is fired by tap, true or false
							tap || false,
							// Left offset of the handle, in relation to the slider
							scope_Locations);
						});
					}
				});
			}

			// Returns the input array, respecting the slider direction configuration.
			function inSliderOrder(values) {

				// If only one handle is used, return a single value.
				if (values.length === 1) {
					return values[0];
				}

				if (options.dir) {
					return values.reverse();
				}

				return values;
			}

			// Handler for attaching events trough a proxy.
			function attach(events, element, callback, data) {

				// This function can be used to 'filter' events to the slider.
				// element is a node, not a nodeList

				var method = function method(e) {

					if (scope_Target.hasAttribute('disabled')) {
						return false;
					}

					// Stop if an active 'tap' transition is taking place.
					if (hasClass(scope_Target, options.cssClasses.tap)) {
						return false;
					}

					e = fixEvent(e, data.pageOffset);

					// Ignore right or middle clicks on start #454
					if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
						return false;
					}

					// Ignore right or middle clicks on start #454
					if (data.hover && e.buttons) {
						return false;
					}

					e.calcPoint = e.points[options.ort];

					// Call the event handler with the event [ and additional data ].
					callback(e, data);
				},
				    methods = [];

				// Bind a closure on the target for every event type.
				events.split(' ').forEach(function (eventName) {
					element.addEventListener(eventName, method, false);
					methods.push([eventName, method]);
				});

				return methods;
			}

			// Handle movement on document for handle and range drag.
			function move(event, data) {

				// Fix #498
				// Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
				// https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
				// IE9 has .buttons and .which zero on mousemove.
				// Firefox breaks the spec MDN defines.
				if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
					return end(event, data);
				}

				var handles = data.handles || scope_Handles,
				    positions,
				    state = false,
				    proposal = (event.calcPoint - data.start) * 100 / data.baseSize,
				    handleNumber = handles[0] === scope_Handles[0] ? 0 : 1,
				    i;

				// Calculate relative positions for the handles.
				positions = getPositions(proposal, data.positions, handles.length > 1);

				state = setHandle(handles[0], positions[handleNumber], handles.length === 1);

				if (handles.length > 1) {

					state = setHandle(handles[1], positions[handleNumber ? 0 : 1], false) || state;

					if (state) {
						// fire for both handles
						for (i = 0; i < data.handles.length; i++) {
							fireEvent('slide', i);
						}
					}
				} else if (state) {
					// Fire for a single handle
					fireEvent('slide', handleNumber);
				}
			}

			// Unbind move events on document, call callbacks.
			function end(event, data) {

				// The handle is no longer active, so remove the class.
				var active = scope_Base.querySelector('.' + options.cssClasses.active),
				    handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;

				if (active !== null) {
					removeClass(active, options.cssClasses.active);
				}

				// Remove cursor styles and text-selection events bound to the body.
				if (event.cursor) {
					document.body.style.cursor = '';
					document.body.removeEventListener('selectstart', document.body.noUiListener);
				}

				var d = document.documentElement;

				// Unbind the move and end events, which are added on 'start'.
				d.noUiListeners.forEach(function (c) {
					d.removeEventListener(c[0], c[1]);
				});

				// Remove dragging class.
				removeClass(scope_Target, options.cssClasses.drag);

				// Fire the change and set events.
				fireEvent('set', handleNumber);
				fireEvent('change', handleNumber);

				// If this is a standard handle movement, fire the end event.
				if (data.handleNumber !== undefined) {
					fireEvent('end', data.handleNumber);
				}
			}

			// Fire 'end' when a mouse or pen leaves the document.
			function documentLeave(event, data) {
				if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
					end(event, data);
				}
			}

			// Bind move events on document.
			function start(event, data) {

				var d = document.documentElement;

				// Mark the handle as 'active' so it can be styled.
				if (data.handles.length === 1) {
					// Support 'disabled' handles
					if (data.handles[0].hasAttribute('disabled')) {
						return false;
					}

					addClass(data.handles[0].children[0], options.cssClasses.active);
				}

				// Fix #551, where a handle gets selected instead of dragged.
				event.preventDefault();

				// A drag should never propagate up to the 'tap' event.
				event.stopPropagation();

				// Attach the move and end events.
				var moveEvent = attach(actions.move, d, move, {
					start: event.calcPoint,
					baseSize: baseSize(),
					pageOffset: event.pageOffset,
					handles: data.handles,
					handleNumber: data.handleNumber,
					buttonsProperty: event.buttons,
					positions: [scope_Locations[0], scope_Locations[scope_Handles.length - 1]]
				}),
				    endEvent = attach(actions.end, d, end, {
					handles: data.handles,
					handleNumber: data.handleNumber
				});

				var outEvent = attach("mouseout", d, documentLeave, {
					handles: data.handles,
					handleNumber: data.handleNumber
				});

				d.noUiListeners = moveEvent.concat(endEvent, outEvent);

				// Text selection isn't an issue on touch devices,
				// so adding cursor styles can be skipped.
				if (event.cursor) {

					// Prevent the 'I' cursor and extend the range-drag cursor.
					document.body.style.cursor = getComputedStyle(event.target).cursor;

					// Mark the target with a dragging state.
					if (scope_Handles.length > 1) {
						addClass(scope_Target, options.cssClasses.drag);
					}

					var f = function f() {
						return false;
					};

					document.body.noUiListener = f;

					// Prevent text selection when dragging the handles.
					document.body.addEventListener('selectstart', f, false);
				}

				if (data.handleNumber !== undefined) {
					fireEvent('start', data.handleNumber);
				}
			}

			// Move closest handle to tapped location.
			function tap(event) {

				var location = event.calcPoint,
				    total = 0,
				    handleNumber,
				    to;

				// The tap event shouldn't propagate up and cause 'edge' to run.
				event.stopPropagation();

				// Add up the handle offsets.
				scope_Handles.forEach(function (a) {
					total += offset(a)[options.style];
				});

				// Find the handle closest to the tapped position.
				handleNumber = location < total / 2 || scope_Handles.length === 1 ? 0 : 1;

				// Check if handler is not disablet if yes set number to the next handler
				if (scope_Handles[handleNumber].hasAttribute('disabled')) {
					handleNumber = handleNumber ? 0 : 1;
				}

				location -= offset(scope_Base)[options.style];

				// Calculate the new position.
				to = location * 100 / baseSize();

				if (!options.events.snap) {
					// Flag the slider as it is now in a transitional state.
					// Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
					addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
				}

				// Support 'disabled' handles
				if (scope_Handles[handleNumber].hasAttribute('disabled')) {
					return false;
				}

				// Find the closest handle and calculate the tapped point.
				// The set handle to the new position.
				setHandle(scope_Handles[handleNumber], to);

				fireEvent('slide', handleNumber, true);
				fireEvent('set', handleNumber, true);
				fireEvent('change', handleNumber, true);

				if (options.events.snap) {
					start(event, { handles: [scope_Handles[handleNumber]] });
				}
			}

			// Fires a 'hover' event for a hovered mouse/pen position.
			function hover(event) {

				var location = event.calcPoint - offset(scope_Base)[options.style],
				    to = scope_Spectrum.getStep(location * 100 / baseSize()),
				    value = scope_Spectrum.fromStepping(to);

				Object.keys(scope_Events).forEach(function (targetEvent) {
					if ('hover' === targetEvent.split('.')[0]) {
						scope_Events[targetEvent].forEach(function (callback) {
							callback.call(scope_Self, value);
						});
					}
				});
			}

			// Attach events to several slider parts.
			function events(behaviour) {

				// Attach the standard drag event to the handles.
				if (!behaviour.fixed) {

					scope_Handles.forEach(function (handle, index) {

						// These events are only bound to the visual handle
						// element, not the 'real' origin element.
						attach(actions.start, handle.children[0], start, {
							handles: [handle],
							handleNumber: index
						});
					});
				}

				// Attach the tap event to the slider base.
				if (behaviour.tap) {

					attach(actions.start, scope_Base, tap, {
						handles: scope_Handles
					});
				}

				// Fire hover events
				if (behaviour.hover) {
					attach(actions.move, scope_Base, hover, { hover: true });
				}

				// Make the range draggable.
				if (behaviour.drag) {

					var drag = [scope_Base.querySelector('.' + options.cssClasses.connect)];
					addClass(drag[0], options.cssClasses.draggable);

					// When the range is fixed, the entire range can
					// be dragged by the handles. The handle in the first
					// origin will propagate the start event upward,
					// but it needs to be bound manually on the other.
					if (behaviour.fixed) {
						drag.push(scope_Handles[drag[0] === scope_Handles[0] ? 1 : 0].children[0]);
					}

					drag.forEach(function (element) {
						attach(actions.start, element, start, {
							handles: scope_Handles
						});
					});
				}
			}

			// Test suggested values and apply margin, step.
			function setHandle(handle, to, noLimitOption) {

				var trigger = handle !== scope_Handles[0] ? 1 : 0,
				    lowerMargin = scope_Locations[0] + options.margin,
				    upperMargin = scope_Locations[1] - options.margin,
				    lowerLimit = scope_Locations[0] + options.limit,
				    upperLimit = scope_Locations[1] - options.limit;

				// For sliders with multiple handles,
				// limit movement to the other handle.
				// Apply the margin option by adding it to the handle positions.
				if (scope_Handles.length > 1) {
					to = trigger ? Math.max(to, lowerMargin) : Math.min(to, upperMargin);
				}

				// The limit option has the opposite effect, limiting handles to a
				// maximum distance from another. Limit must be > 0, as otherwise
				// handles would be unmoveable. 'noLimitOption' is set to 'false'
				// for the .val() method, except for pass 4/4.
				if (noLimitOption !== false && options.limit && scope_Handles.length > 1) {
					to = trigger ? Math.min(to, lowerLimit) : Math.max(to, upperLimit);
				}

				// Handle the step option.
				to = scope_Spectrum.getStep(to);

				// Limit percentage to the 0 - 100 range
				to = limit(to);

				// Return false if handle can't move
				if (to === scope_Locations[trigger]) {
					return false;
				}

				// Set the handle to the new position.
				// Use requestAnimationFrame for efficient painting.
				// No significant effect in Chrome, Edge sees dramatic
				// performace improvements.
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(function () {
						handle.style[options.style] = to + '%';
					});
				} else {
					handle.style[options.style] = to + '%';
				}

				// Force proper handle stacking
				if (!handle.previousSibling) {
					removeClass(handle, options.cssClasses.stacking);
					if (to > 50) {
						addClass(handle, options.cssClasses.stacking);
					}
				}

				// Update locations.
				scope_Locations[trigger] = to;

				// Convert the value to the slider stepping/range.
				scope_Values[trigger] = scope_Spectrum.fromStepping(to);

				fireEvent('update', trigger);

				return true;
			}

			// Loop values from value method and apply them.
			function setValues(count, values) {

				var i, trigger, to;

				// With the limit option, we'll need another limiting pass.
				if (options.limit) {
					count += 1;
				}

				// If there are multiple handles to be set run the setting
				// mechanism twice for the first handle, to make sure it
				// can be bounced of the second one properly.
				for (i = 0; i < count; i += 1) {

					trigger = i % 2;

					// Get the current argument from the array.
					to = values[trigger];

					// Setting with null indicates an 'ignore'.
					// Inputting 'false' is invalid.
					if (to !== null && to !== false) {

						// If a formatted number was passed, attemt to decode it.
						if (typeof to === 'number') {
							to = String(to);
						}

						to = options.format.from(to);

						// Request an update for all links if the value was invalid.
						// Do so too if setting the handle fails.
						if (to === false || isNaN(to) || setHandle(scope_Handles[trigger], scope_Spectrum.toStepping(to), i === 3 - options.dir) === false) {
							fireEvent('update', trigger);
						}
					}
				}
			}

			// Set the slider value.
			function valueSet(input, fireSetEvent) {

				var count,
				    values = asArray(input),
				    i;

				// Event fires by default
				fireSetEvent = fireSetEvent === undefined ? true : !!fireSetEvent;

				// The RTL settings is implemented by reversing the front-end,
				// internal mechanisms are the same.
				if (options.dir && options.handles > 1) {
					values.reverse();
				}

				// Animation is optional.
				// Make sure the initial values where set before using animated placement.
				if (options.animate && scope_Locations[0] !== -1) {
					addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
				}

				// Determine how often to set the handles.
				count = scope_Handles.length > 1 ? 3 : 1;

				if (values.length === 1) {
					count = 1;
				}

				setValues(count, values);

				// Fire the 'set' event for both handles.
				for (i = 0; i < scope_Handles.length; i++) {

					// Fire the event only for handles that received a new value, as per #579
					if (values[i] !== null && fireSetEvent) {
						fireEvent('set', i);
					}
				}
			}

			// Get the slider value.
			function valueGet() {

				var i,
				    retour = [];

				// Get the value from all handles.
				for (i = 0; i < options.handles; i += 1) {
					retour[i] = options.format.to(scope_Values[i]);
				}

				return inSliderOrder(retour);
			}

			// Removes classes from the root and empties it.
			function destroy() {

				for (var key in options.cssClasses) {
					if (!options.cssClasses.hasOwnProperty(key)) {
						continue;
					}
					removeClass(scope_Target, options.cssClasses[key]);
				}

				while (scope_Target.firstChild) {
					scope_Target.removeChild(scope_Target.firstChild);
				}

				delete scope_Target.noUiSlider;
			}

			// Get the current step size for the slider.
			function getCurrentStep() {

				// Check all locations, map them to their stepping point.
				// Get the step point, then find it in the input list.
				var retour = scope_Locations.map(function (location, index) {

					var step = scope_Spectrum.getApplicableStep(location),


					// As per #391, the comparison for the decrement step can have some rounding issues.
					// Round the value to the precision used in the step.
					stepDecimals = countDecimals(String(step[2])),


					// Get the current numeric value
					value = scope_Values[index],


					// To move the slider 'one step up', the current step value needs to be added.
					// Use null if we are at the maximum slider value.
					increment = location === 100 ? null : step[2],


					// Going 'one step down' might put the slider in a different sub-range, so we
					// need to switch between the current or the previous step.
					prev = Number((value - step[2]).toFixed(stepDecimals)),


					// If the value fits the step, return the current step value. Otherwise, use the
					// previous step. Return null if the slider is at its minimum value.
					decrement = location === 0 ? null : prev >= step[1] ? step[2] : step[0] || false;

					return [decrement, increment];
				});

				// Return values in the proper order.
				return inSliderOrder(retour);
			}

			// Attach an event to this slider, possibly including a namespace
			function bindEvent(namespacedEvent, callback) {
				scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
				scope_Events[namespacedEvent].push(callback);

				// If the event bound is 'update,' fire it immediately for all handles.
				if (namespacedEvent.split('.')[0] === 'update') {
					scope_Handles.forEach(function (a, index) {
						fireEvent('update', index);
					});
				}
			}

			// Undo attachment of event
			function removeEvent(namespacedEvent) {

				var event = namespacedEvent && namespacedEvent.split('.')[0],
				    namespace = event && namespacedEvent.substring(event.length);

				Object.keys(scope_Events).forEach(function (bind) {

					var tEvent = bind.split('.')[0],
					    tNamespace = bind.substring(tEvent.length);

					if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
						delete scope_Events[bind];
					}
				});
			}

			// Updateable: margin, limit, step, range, animate, snap
			function updateOptions(optionsToUpdate, fireSetEvent) {

				// Spectrum is created using the range, snap, direction and step options.
				// 'snap' and 'step' can be updated, 'direction' cannot, due to event binding.
				// If 'snap' and 'step' are not passed, they should remain unchanged.
				var v = valueGet(),
				    newOptions = testOptions({
					start: [0, 0],
					margin: optionsToUpdate.margin,
					limit: optionsToUpdate.limit,
					step: optionsToUpdate.step === undefined ? options.singleStep : optionsToUpdate.step,
					range: optionsToUpdate.range,
					animate: optionsToUpdate.animate,
					snap: optionsToUpdate.snap === undefined ? options.snap : optionsToUpdate.snap
				});

				['margin', 'limit', 'range', 'animate'].forEach(function (name) {

					// Only change options that we're actually passed to update.
					if (optionsToUpdate[name] !== undefined) {
						options[name] = optionsToUpdate[name];
					}
				});

				// Save current spectrum direction as testOptions in testRange call
				// doesn't rely on current direction
				newOptions.spectrum.direction = scope_Spectrum.direction;
				scope_Spectrum = newOptions.spectrum;

				// Invalidate the current positioning so valueSet forces an update.
				scope_Locations = [-1, -1];
				valueSet(optionsToUpdate.start || v, fireSetEvent);
			}

			// Throw an error if the slider was already initialized.
			if (scope_Target.noUiSlider) {
				throw new Error('Slider was already initialized.');
			}

			// Create the base element, initialise HTML and set classes.
			// Add handles and links.
			scope_Base = addSlider(options.dir, options.ort, scope_Target);
			scope_Handles = addHandles(options.handles, options.dir, scope_Base);

			// Set the connect classes.
			addConnection(options.connect, scope_Target, scope_Handles);

			if (options.pips) {
				pips(options.pips);
			}

			if (options.tooltips) {
				tooltips();
			}

			scope_Self = {
				destroy: destroy,
				steps: getCurrentStep,
				on: bindEvent,
				off: removeEvent,
				get: valueGet,
				set: valueSet,
				updateOptions: updateOptions,
				options: originalOptions, // Issue #600
				target: scope_Target, // Issue #597
				pips: pips // Issue #594
			};

			// Attach user events.
			events(options.events);

			return scope_Self;
		}

		// Run the standard initializer
		function initialize(target, originalOptions) {

			if (!target.nodeName) {
				throw new Error('noUiSlider.create requires a single element.');
			}

			// Test the options and create the slider environment;
			var options = testOptions(originalOptions, target),
			    slider = closure(target, options, originalOptions);

			// Use the public value method to set the start values.
			slider.set(options.start);

			target.noUiSlider = slider;
			return slider;
		}

		// Use an object instead of a function for future expansibility;
		return {
			create: initialize
		};
	});

/***/ }
/******/ ]);