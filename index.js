var heresy = (function (document,exports) {
  'use strict';

  

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /*! (c) Andrea Giammarchi - ISC */
  var self = null ||
  /* istanbul ignore next */
  {};

  try {
    self.WeakMap = WeakMap;
  } catch (WeakMap) {
    // this could be better but 90% of the time
    // it's everything developers need as fallback
    self.WeakMap = function (id, Object) {

      var dP = Object.defineProperty;
      var hOP = Object.hasOwnProperty;
      var proto = WeakMap.prototype;

      proto["delete"] = function (key) {
        return this.has(key) && delete key[this._];
      };

      proto.get = function (key) {
        return this.has(key) ? key[this._] : void 0;
      };

      proto.has = function (key) {
        return hOP.call(key, this._);
      };

      proto.set = function (key, value) {
        dP(key, this._, {
          configurable: true,
          value: value
        });
        return this;
      };

      return WeakMap;

      function WeakMap(iterable) {
        dP(this, '_', {
          value: '_@ungap/weakmap' + id++
        });
        if (iterable) iterable.forEach(add, this);
      }

      function add(pair) {
        this.set(pair[0], pair[1]);
      }
    }(Math.random(), Object);
  }

  var WeakMap$1 = self.WeakMap;

  function hyphenizer(s, c) {
    return s.replace(/([A-Z])([A-Z][a-z])/g, c = '$1' + (c || '-') + '$2').replace(/([a-z])([A-Z])/g, c).toLowerCase();
  }

  var isNoOp = false;

  var _templateLiteral = function templateLiteral(tl) {
    var RAW = 'raw';

    var isBroken = function isBroken(UA) {
      return /(Firefox|Safari)\/(\d+)/.test(UA) && !/(Chrom|Android)\/(\d+)/.test(UA);
    };

    var broken = isBroken((document.defaultView.navigator || {}).userAgent);
    var FTS = !(RAW in tl) || tl.propertyIsEnumerable(RAW) || !Object.isFrozen(tl[RAW]);

    if (broken || FTS) {
      var forever = {};

      var foreverCache = function foreverCache(tl) {
        for (var key = '.', i = 0; i < tl.length; i++) {
          key += tl[i].length + '.' + tl[i];
        }

        return forever[key] || (forever[key] = tl);
      }; // Fallback TypeScript shenanigans


      if (FTS) _templateLiteral = foreverCache; // try fast path for other browsers:
      // store the template as WeakMap key
      // and forever cache it only when it's not there.
      // this way performance is still optimal,
      // penalized only when there are GC issues
      else {
          var wm = new WeakMap$1();

          var set = function set(tl, unique) {
            wm.set(tl, unique);
            return unique;
          };

          _templateLiteral = function templateLiteral(tl) {
            return wm.get(tl) || set(tl, foreverCache(tl));
          };
        }
    } else {
      isNoOp = true;
    }

    return TL(tl);
  };

  function TL(tl) {
    return isNoOp ? tl : _templateLiteral(tl);
  }

  function tta (template) {
    var length = arguments.length;
    var args = [TL(template)];
    var i = 1;

    while (i < length) {
      args.push(arguments[i++]);
    }

    return args;
  }

  /*! (c) Andrea Giammarchi - ISC */
  var Wire = function (slice, proto) {
    proto = Wire.prototype;
    proto.ELEMENT_NODE = 1;
    proto.nodeType = 111;

    proto.remove = function (keepFirst) {
      var childNodes = this.childNodes;
      var first = this.firstChild;
      var last = this.lastChild;
      this._ = null;

      if (keepFirst && childNodes.length === 2) {
        last.parentNode.removeChild(last);
      } else {
        var range = this.ownerDocument.createRange();
        range.setStartBefore(keepFirst ? childNodes[1] : first);
        range.setEndAfter(last);
        range.deleteContents();
      }

      return first;
    };

    proto.valueOf = function (forceAppend) {
      var fragment = this._;
      var noFragment = fragment == null;
      if (noFragment) fragment = this._ = this.ownerDocument.createDocumentFragment();

      if (noFragment || forceAppend) {
        for (var n = this.childNodes, i = 0, l = n.length; i < l; i++) {
          fragment.appendChild(n[i]);
        }
      }

      return fragment;
    };

    return Wire;

    function Wire(childNodes) {
      var nodes = this.childNodes = slice.call(childNodes, 0);
      this.firstChild = nodes[0];
      this.lastChild = nodes[nodes.length - 1];
      this.ownerDocument = nodes[0].ownerDocument;
      this._ = null;
    }
  }([].slice);

  var isArray = Array.isArray;
  var wireType = Wire.prototype.nodeType;

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function (document) {

    var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = 'content' in create(TEMPLATE);
    var createHTML = HAS_CONTENT ? function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } : function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;

      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }

      append(content, childNodes);
      return content;
    };
    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(root, childNodes) {
      var length = childNodes.length;

      while (length--) {
        root.appendChild(childNodes[0]);
      }
    }

    function create(element) {
      return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
    } // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE


    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      append(content, template.firstChild.childNodes);
      return content;
    }
  }(document);

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = null ||
  /* istanbul ignore next */
  {};

  try {
    self$1.Map = Map;
  } catch (Map) {
    self$1.Map = function Map() {
      var i = 0;
      var k = [];
      var v = [];
      return {
        "delete": function _delete(key) {
          var had = contains(key);

          if (had) {
            k.splice(i, 1);
            v.splice(i, 1);
          }

          return had;
        },
        forEach: function forEach(callback, context) {
          k.forEach(function (key, i) {
            callback.call(context, v[i], key, this);
          }, this);
        },
        get: function get(key) {
          return contains(key) ? v[i] : void 0;
        },
        has: function has(key) {
          return contains(key);
        },
        set: function set(key, value) {
          v[contains(key) ? i : k.push(key) - 1] = value;
          return this;
        }
      };

      function contains(v) {
        i = k.indexOf(v);
        return -1 < i;
      }
    };
  }

  var Map$1 = self$1.Map;

  var append = function append(get, parent, children, start, end, before) {
    var isSelect = 'selectedIndex' in parent;
    var selectedIndex = -1;

    while (start < end) {
      var child = get(children[start], 1);
      if (isSelect && selectedIndex < 0 && child.selected) selectedIndex = start;
      parent.insertBefore(child, before);
      start++;
    }

    if (isSelect && -1 < selectedIndex) parent.selectedIndex = selectedIndex;
  };
  var eqeq = function eqeq(a, b) {
    return a == b;
  };
  var identity = function identity(O) {
    return O;
  };
  var indexOf = function indexOf(moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) {
    var length = lessEnd - lessStart;
    /* istanbul ignore if */

    if (length < 1) return -1;

    while (moreEnd - moreStart >= length) {
      var m = moreStart;
      var l = lessStart;

      while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
        m++;
        l++;
      }

      if (l === lessEnd) return moreStart;
      moreStart = m + 1;
    }

    return -1;
  };
  var isReversed = function isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) {
    while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
      currentStart++;
      futureEnd--;
    }
    return futureEnd === 0;
  };
  var next = function next(get, list, i, length, before) {
    return i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;
  };
  var remove = function remove(get, parent, children, start, end) {
    if (end - start < 2) parent.removeChild(get(children[start], -1));else {
      var range = parent.ownerDocument.createRange();
      range.setStartBefore(get(children[start], -1));
      range.setEndAfter(get(children[end - 1], -1));
      range.deleteContents();
    }
  }; // - - - - - - - - - - - - - - - - - - -
  // diff related constants and utilities
  // - - - - - - - - - - - - - - - - - - -

  var DELETION = -1;
  var INSERTION = 1;
  var SKIP = 0;
  var SKIP_OND = 50;

  var HS = function HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) {
    var k = 0;
    /* istanbul ignore next */

    var minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
    var link = Array(minLen++);
    var tresh = Array(minLen);
    tresh[0] = -1;

    for (var i = 1; i < minLen; i++) {
      tresh[i] = currentEnd;
    }

    var keymap = new Map$1();

    for (var _i = currentStart; _i < currentEnd; _i++) {
      keymap.set(currentNodes[_i], _i);
    }

    for (var _i2 = futureStart; _i2 < futureEnd; _i2++) {
      var idxInOld = keymap.get(futureNodes[_i2]);

      if (idxInOld != null) {
        k = findK(tresh, minLen, idxInOld);
        /* istanbul ignore else */

        if (-1 < k) {
          tresh[k] = idxInOld;
          link[k] = {
            newi: _i2,
            oldi: idxInOld,
            prev: link[k - 1]
          };
        }
      }
    }

    k = --minLen;
    --currentEnd;

    while (tresh[k] > currentEnd) {
      --k;
    }

    minLen = currentChanges + futureChanges - k;
    var diff = Array(minLen);
    var ptr = link[k];
    --futureEnd;

    while (ptr) {
      var _ptr = ptr,
          newi = _ptr.newi,
          oldi = _ptr.oldi;

      while (futureEnd > newi) {
        diff[--minLen] = INSERTION;
        --futureEnd;
      }

      while (currentEnd > oldi) {
        diff[--minLen] = DELETION;
        --currentEnd;
      }

      diff[--minLen] = SKIP;
      --futureEnd;
      --currentEnd;
      ptr = ptr.prev;
    }

    while (futureEnd >= futureStart) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }

    while (currentEnd >= currentStart) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }

    return diff;
  }; // this is pretty much the same petit-dom code without the delete map part
  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561


  var OND = function OND(futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) {
    var length = rows + cols;
    var v = [];
    var d, k, r, c, pv, cv, pd;

    outer: for (d = 0; d <= length; d++) {
      /* istanbul ignore if */
      if (d > SKIP_OND) return null;
      pd = d - 1;
      /* istanbul ignore next */

      pv = d ? v[d - 1] : [0, 0];
      cv = v[d] = [];

      for (k = -d; k <= d; k += 2) {
        if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
          c = pv[pd + k + 1];
        } else {
          c = pv[pd + k - 1] + 1;
        }

        r = c - k;

        while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
          c++;
          r++;
        }

        if (c === cols && r === rows) {
          break outer;
        }

        cv[d + k] = c;
      }
    }

    var diff = Array(d / 2 + length / 2);
    var diffIdx = diff.length - 1;

    for (d = v.length - 1; d >= 0; d--) {
      while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
        // diagonal edge = equality
        diff[diffIdx--] = SKIP;
        c--;
        r--;
      }

      if (!d) break;
      pd = d - 1;
      /* istanbul ignore next */

      pv = d ? v[d - 1] : [0, 0];
      k = c - r;

      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
        // vertical edge = insertion
        r--;
        diff[diffIdx--] = INSERTION;
      } else {
        // horizontal edge = deletion
        c--;
        diff[diffIdx--] = DELETION;
      }
    }

    return diff;
  };

  var applyDiff = function applyDiff(diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) {
    var live = new Map$1();
    var length = diff.length;
    var currentIndex = currentStart;
    var i = 0;

    while (i < length) {
      switch (diff[i++]) {
        case SKIP:
          futureStart++;
          currentIndex++;
          break;

        case INSERTION:
          // TODO: bulk appends for sequential nodes
          live.set(futureNodes[futureStart], 1);
          append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
          break;

        case DELETION:
          currentIndex++;
          break;
      }
    }

    i = 0;

    while (i < length) {
      switch (diff[i++]) {
        case SKIP:
          currentStart++;
          break;

        case DELETION:
          // TODO: bulk removes for sequential nodes
          if (live.has(currentNodes[currentStart])) currentStart++;else remove(get, parentNode, currentNodes, currentStart++, currentStart);
          break;
      }
    }
  };

  var findK = function findK(ktr, length, j) {
    var lo = 1;
    var hi = length;

    while (lo < hi) {
      var mid = (lo + hi) / 2 >>> 0;
      if (j < ktr[mid]) hi = mid;else lo = mid + 1;
    }

    return lo;
  };

  var smartDiff = function smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) {
    applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
  };

  /*! (c) 2018 Andrea Giammarchi (ISC) */

  var domdiff = function domdiff(parentNode, // where changes happen
  currentNodes, // Array of current items/nodes
  futureNodes, // Array of future items/nodes
  options // optional object with one of the following properties
  //  before: domNode
  //  compare(generic, generic) => true if same generic
  //  node(generic) => Node
  ) {
    if (!options) options = {};
    var compare = options.compare || eqeq;
    var get = options.node || identity;
    var before = options.before == null ? null : get(options.before, 0);
    var currentLength = currentNodes.length;
    var currentEnd = currentLength;
    var currentStart = 0;
    var futureEnd = futureNodes.length;
    var futureStart = 0; // common prefix

    while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
      currentStart++;
      futureStart++;
    } // common suffix


    while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
      currentEnd--;
      futureEnd--;
    }

    var currentSame = currentStart === currentEnd;
    var futureSame = futureStart === futureEnd; // same list

    if (currentSame && futureSame) return futureNodes; // only stuff to add

    if (currentSame && futureStart < futureEnd) {
      append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
      return futureNodes;
    } // only stuff to remove


    if (futureSame && currentStart < currentEnd) {
      remove(get, parentNode, currentNodes, currentStart, currentEnd);
      return futureNodes;
    }

    var currentChanges = currentEnd - currentStart;
    var futureChanges = futureEnd - futureStart;
    var i = -1; // 2 simple indels: the shortest sequence is a subsequence of the longest

    if (currentChanges < futureChanges) {
      i = indexOf(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare); // inner diff

      if (-1 < i) {
        append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
        append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
        return futureNodes;
      }
    }
    /* istanbul ignore else */
    else if (futureChanges < currentChanges) {
        i = indexOf(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare); // outer diff

        if (-1 < i) {
          remove(get, parentNode, currentNodes, currentStart, i);
          remove(get, parentNode, currentNodes, i + futureChanges, currentEnd);
          return futureNodes;
        }
      } // common case with one replacement for many nodes
    // or many nodes replaced for a single one

    /* istanbul ignore else */


    if (currentChanges < 2 || futureChanges < 2) {
      append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
      remove(get, parentNode, currentNodes, currentStart, currentEnd);
      return futureNodes;
    } // the half match diff part has been skipped in petit-dom
    // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
    // accordingly, I think it's safe to skip in here too
    // if one day it'll come out like the speediest thing ever to do
    // then I might add it in here too
    // Extra: before going too fancy, what about reversed lists ?
    //        This should bail out pretty quickly if that's not the case.


    if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
      append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
      return futureNodes;
    } // last resort through a smart diff


    smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
    return futureNodes;
  };

  /*! (c) Andrea Giammarchi - ISC */
  var importNode = function (document, appendChild, cloneNode, createTextNode, importNode) {
    var _native = importNode in document; // IE 11 has problems with cloning templates:
    // it "forgets" empty childNodes. This feature-detects that.


    var fragment = document.createDocumentFragment();
    fragment[appendChild](document[createTextNode]('g'));
    fragment[appendChild](document[createTextNode](''));
    var content = _native ? document[importNode](fragment, true) : fragment[cloneNode](true);
    return content.childNodes.length < 2 ? function importNode(node, deep) {
      var clone = node[cloneNode]();

      for (var childNodes = node.childNodes || [], length = childNodes.length, i = 0; deep && i < length; i++) {
        clone[appendChild](importNode(childNodes[i], deep));
      }

      return clone;
    } : _native ? document[importNode] : function (node, deep) {
      return node[cloneNode](!!deep);
    };
  }(document, 'appendChild', 'cloneNode', 'createTextNode', 'importNode');

  var trim = ''.trim || function () {
    return String(this).replace(/^\s+|\s+/g, '');
  };

  /*! (c) Andrea Giammarchi - ISC */
  // Custom
  var UID = '-' + Math.random().toFixed(6) + '%'; //                           Edge issue!

  var UID_IE = false;

  try {
    if (!function (template, content, tabindex) {
      return content in template && (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>', template[content].childNodes[0].getAttribute(tabindex) == UID);
    }(document.createElement('template'), 'content', 'tabindex')) {
      UID = '_dt: ' + UID.slice(1, -1) + ';';
      UID_IE = true;
    }
  } catch (meh) {}

  var UIDC = '<!--' + UID + '-->'; // DOM

  var COMMENT_NODE = 8;
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  /*! (c) Andrea Giammarchi - ISC */
  function sanitize (template) {
    return template.join(UIDC).replace(selfClosing, fullClosing).replace(attrSeeker, attrReplacer);
  }
  var spaces = ' \\f\\n\\r\\t';
  var almostEverything = '[^' + spaces + '\\/>"\'=]+';
  var attrName = '[' + spaces + ']+' + almostEverything;
  var tagName = '<([A-Za-z]+[A-Za-z0-9:._-]*)((?:';
  var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything.replace('\\/', '') + '))?)';
  var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([' + spaces + ']*/?>)', 'g');
  var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([' + spaces + ']*/>)', 'g');
  var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

  function attrReplacer($0, $1, $2, $3) {
    return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
  }

  function replaceAttributes($0, $1, $2) {
    return $1 + ($2 || '"') + UID + ($2 || '"');
  }

  function fullClosing($0, $1, $2) {
    return VOID_ELEMENTS.test($1) ? $0 : '<' + $1 + $2 + '></' + $1 + '>';
  }

  function find(node, path) {
    var length = path.length;
    var i = 0;

    while (i < length) {
      node = node.childNodes[path[i++]];
    }

    return node;
  }

  function parse(node, holes, parts, path) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var i = 0;

    while (i < length) {
      var child = childNodes[i];

      switch (child.nodeType) {
        case ELEMENT_NODE:
          var childPath = path.concat(i);
          parseAttributes(child, holes, parts, childPath);
          parse(child, holes, parts, childPath);
          break;

        case COMMENT_NODE:
          var textContent = child.textContent;

          if (textContent === UID) {
            parts.shift();
            holes.push( // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ? Text(node, path) : Any(child, path.concat(i)));
          } else {
            switch (textContent.slice(0, 2)) {
              case '/*':
                if (textContent.slice(-2) !== '*/') break;

              case "\uD83D\uDC7B":
                // ghost
                node.removeChild(child);
                i--;
                length--;
            }
          }

          break;

        case TEXT_NODE:
          // the following ignore is actually covered by browsers
          // only basicHTML ends up on previous COMMENT_NODE case
          // instead of TEXT_NODE because it knows nothing about
          // special style or textarea behavior

          /* istanbul ignore if */
          if (SHOULD_USE_TEXT_CONTENT.test(node.nodeName) && trim.call(child.textContent) === UIDC) {
            parts.shift();
            holes.push(Text(node, path));
          }

          break;
      }

      i++;
    }
  }

  function parseAttributes(node, holes, parts, path) {
    var cache = new Map$1();
    var attributes = node.attributes;
    var remove = [];
    var array = remove.slice.call(attributes, 0);
    var length = array.length;
    var i = 0;

    while (i < length) {
      var attribute = array[i++];
      var direct = attribute.value === UID;
      var sparse;

      if (direct || 1 < (sparse = attribute.value.split(UIDC)).length) {
        var name = attribute.name; // the following ignore is covered by IE
        // and the IE9 double viewBox test

        /* istanbul ignore else */

        if (!cache.has(name)) {
          var realName = parts.shift().replace(direct ? /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ : new RegExp('^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")', 'i'), '$1');
          var value = attributes[realName] || // the following ignore is covered by browsers
          // while basicHTML is already case-sensitive

          /* istanbul ignore next */
          attributes[realName.toLowerCase()];
          cache.set(name, value);
          if (direct) holes.push(Attr(value, path, realName, null));else {
            var skip = sparse.length - 2;

            while (skip--) {
              parts.shift();
            }

            holes.push(Attr(value, path, realName, sparse));
          }
        }

        remove.push(attribute);
      }
    }

    length = remove.length;
    i = 0;

    while (i < length) {
      // Edge HTML bug #16878726
      var attr = remove[i++];
      if (/^id$/i.test(attr.name)) node.removeAttribute(attr.name); // standard browsers would work just fine here
      else node.removeAttributeNode(attr);
    } // This is a very specific Firefox/Safari issue
    // but since it should be a not so common pattern,
    // it's probably worth patching regardless.
    // Basically, scripts created through strings are death.
    // You need to create fresh new scripts instead.
    // TODO: is there any other node that needs such nonsense?


    var nodeName = node.nodeName;

    if (/^script$/i.test(nodeName)) {
      // this used to be like that
      // var script = createElement(node, nodeName);
      // then Edge arrived and decided that scripts created
      // through template documents aren't worth executing
      // so it became this ... hopefully it won't hurt in the wild
      var script = document.createElement(nodeName);
      length = attributes.length;
      i = 0;

      while (i < length) {
        script.setAttributeNode(attributes[i++].cloneNode(true));
      }

      script.textContent = node.textContent;
      node.parentNode.replaceChild(script, node);
    }
  }

  function Any(node, path) {
    return {
      type: 'any',
      node: node,
      path: path
    };
  }

  function Attr(node, path, name, sparse) {
    return {
      type: 'attr',
      node: node,
      path: path,
      name: name,
      sparse: sparse
    };
  }

  function Text(node, path) {
    return {
      type: 'text',
      node: node,
      path: path
    };
  }

  // globals
  var parsed = new WeakMap$1();
  var referenced = new WeakMap$1();

  function createInfo(options, template) {
    var markup = sanitize(template);
    var transform = options.transform;
    if (transform) markup = transform(markup);
    var content = createContent(markup, options.type);
    cleanContent(content);
    var holes = [];
    parse(content, holes, template.slice(0), []);
    var info = {
      content: content,
      updates: function updates(content) {
        var updates = [];
        var len = holes.length;
        var i = 0;
        var off = 0;

        while (i < len) {
          var info = holes[i++];
          var node = find(content, info.path);

          switch (info.type) {
            case 'any':
              updates.push({
                fn: options.any(node, []),
                sparse: false
              });
              break;

            case 'attr':
              var sparse = info.sparse;
              var fn = options.attribute(node, info.name, info.node);
              if (sparse === null) updates.push({
                fn: fn,
                sparse: false
              });else {
                off += sparse.length - 2;
                updates.push({
                  fn: fn,
                  sparse: true,
                  values: sparse
                });
              }
              break;

            case 'text':
              updates.push({
                fn: options.text(node),
                sparse: false
              });
              node.textContent = '';
              break;
          }
        }

        len += off;
        return function () {
          var length = arguments.length;

          if (len !== length - 1) {
            throw new Error(length - 1 + ' values instead of ' + len + '\n' + template.join('${value}'));
          }

          var i = 1;
          var off = 1;

          while (i < length) {
            var update = updates[i - off];

            if (update.sparse) {
              var values = update.values;
              var value = values[0];
              var j = 1;
              var l = values.length;
              off += l - 2;

              while (j < l) {
                value += arguments[i++] + values[j++];
              }

              update.fn(value);
            } else update.fn(arguments[i++]);
          }

          return content;
        };
      }
    };
    parsed.set(template, info);
    return info;
  }

  function createDetails(options, template) {
    var info = parsed.get(template) || createInfo(options, template);
    var content = importNode.call(document, info.content, true);
    var details = {
      content: content,
      template: template,
      updates: info.updates(content)
    };
    referenced.set(options, details);
    return details;
  }

  function domtagger(options) {
    return function (template) {
      var details = referenced.get(options);
      if (details == null || details.template !== template) details = createDetails(options, template);
      details.updates.apply(null, arguments);
      return details.content;
    };
  }

  function cleanContent(fragment) {
    var childNodes = fragment.childNodes;
    var i = childNodes.length;

    while (i--) {
      var child = childNodes[i];

      if (child.nodeType !== 1 && trim.call(child.textContent).length === 0) {
        fragment.removeChild(child);
      }
    }
  }

  /*! (c) Andrea Giammarchi - ISC */
  var hyperStyle = function () {

    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var hyphen = /([^A-Z])([A-Z]+)/g;
    return function hyperStyle(node, original) {
      return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
    };

    function ized($0, $1, $2) {
      return $1 + '-' + $2.toLowerCase();
    }

    function svg(node, original) {
      var style;
      if (original) style = original.cloneNode(true);else {
        node.setAttribute('style', '--hyper:style;');
        style = node.getAttributeNode('style');
      }
      style.value = '';
      node.setAttributeNode(style);
      return update(style, true);
    }

    function toStyle(object) {
      var key,
          css = [];

      for (key in object) {
        css.push(key.replace(hyphen, ized), ':', object[key], ';');
      }

      return css.join('');
    }

    function update(style, isSVG) {
      var oldType, oldValue;
      return function (newValue) {
        var info, key, styleValue, value;

        switch (typeof(newValue)) {
          case 'object':
            if (newValue) {
              if (oldType === 'object') {
                if (!isSVG) {
                  if (oldValue !== newValue) {
                    for (key in oldValue) {
                      if (!(key in newValue)) {
                        style[key] = '';
                      }
                    }
                  }
                }
              } else {
                if (isSVG) style.value = '';else style.cssText = '';
              }

              info = isSVG ? {} : style;

              for (key in newValue) {
                value = newValue[key];
                styleValue = typeof value === 'number' && !IS_NON_DIMENSIONAL.test(key) ? value + 'px' : value;
                if (!isSVG && /^--/.test(key)) info.setProperty(key, styleValue);else info[key] = styleValue;
              }

              oldType = 'object';
              if (isSVG) style.value = toStyle(oldValue = info);else oldValue = newValue;
              break;
            }

          default:
            if (oldValue != newValue) {
              oldType = 'string';
              oldValue = newValue;
              if (isSVG) style.value = newValue || '';else style.cssText = newValue || '';
            }

            break;
        }
      };
    }
  }();

  var OWNER_SVG_ELEMENT = 'ownerSVGElement'; // returns nodes from wires and components

  var asNode = function asNode(item, i) {
    return item.nodeType === wireType ? 1 / i < 0 ? i ? item.remove(true) : item.lastChild : i ? item.valueOf(true) : item.firstChild : item;
  }; // returns true if domdiff can handle the value


  var canDiff = function canDiff(value) {
    return 'ELEMENT_NODE' in value;
  }; // generic attributes helpers


  var hyperAttribute = function hyperAttribute(node, original) {
    var oldValue;
    var owner = false;
    var attribute = original.cloneNode(true);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (attribute.value !== newValue) {
          if (newValue == null) {
            if (owner) {
              owner = false;
              node.removeAttributeNode(attribute);
            }

            attribute.value = newValue;
          } else {
            attribute.value = newValue;

            if (!owner) {
              owner = true;
              node.setAttributeNode(attribute);
            }
          }
        }
      }
    };
  }; // events attributes helpers


  var hyperEvent = function hyperEvent(node, name) {
    var oldValue;
    var type = name.slice(2);
    if (name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      if (oldValue !== newValue) {
        if (oldValue) node.removeEventListener(type, oldValue, false);
        oldValue = newValue;
        if (newValue) node.addEventListener(type, newValue, false);
      }
    };
  }; // special attributes helpers


  var hyperProperty = function hyperProperty(node, name) {
    var oldValue;
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (node[name] !== newValue) {
          if (newValue == null) {
            // cleanup before dropping the attribute to fix IE/Edge gotcha
            node[name] = '';
            node.removeAttribute(name);
          } else node[name] = newValue;
        }
      }
    };
  }; // special hooks helpers


  var hyperRef = function hyperRef(node) {
    return function (ref) {
      ref.current = node;
    };
  };

  var hyperSetter = function hyperSetter(node, name) {
    return function (value) {
      node[name] = value;
    };
  }; // list of attributes that should not be directly assigned


  var readOnly = /^(?:form|list)$/i; // reused every slice time

  var slice = [].slice; // simplifies text node creation

  var text = function text(node, _text) {
    return node.ownerDocument.createTextNode(_text);
  };

  function Tagger(type) {
    this.type = type;
    return domtagger(this);
  }
  Tagger.prototype = {
    // there are four kind of attributes, and related behavior:
    //  * events, with a name starting with `on`, to add/remove event listeners
    //  * special, with a name present in their inherited prototype, accessed directly
    //  * regular, accessed through get/setAttribute standard DOM methods
    //  * style, the only regular attribute that also accepts an object as value
    //    so that you can style=${{width: 120}}. In this case, the behavior has been
    //    fully inspired by Preact library and its simplicity.
    attribute: function attribute(node, name, original) {
      switch (name) {
        case 'class':
          if (OWNER_SVG_ELEMENT in node) return hyperAttribute(node, original);
          name = 'className';

        case 'data':
        case 'props':
          return hyperProperty(node, name);

        case 'style':
          return hyperStyle(node, original, OWNER_SVG_ELEMENT in node);

        case 'ref':
          return hyperRef(node);

        default:
          if (name.slice(0, 1) === '.') return hyperSetter(node, name.slice(1));
          if (name.slice(0, 2) === 'on') return hyperEvent(node, name);
          if (name in node && !(OWNER_SVG_ELEMENT in node || readOnly.test(name))) return hyperProperty(node, name);
          return hyperAttribute(node, original);
      }
    },
    // in a hyper(node)`<div>${content}</div>` case
    // everything could happen:
    //  * it's a JS primitive, stored as text
    //  * it's null or undefined, the node should be cleaned
    //  * it's a promise, update the content once resolved
    //  * it's an explicit intent, perform the desired operation
    //  * it's an Array, resolve all values if Promises and/or
    //    update the node with the resulting list of content
    any: function any(node, childNodes) {
      var diffOptions = {
        node: asNode,
        before: node
      };
      var nodeType = OWNER_SVG_ELEMENT in node ?
      /* istanbul ignore next */
      'svg' : 'html';
      var fastPath = false;
      var oldValue;

      var anyContent = function anyContent(value) {
        switch (typeof(value)) {
          case 'string':
          case 'number':
          case 'boolean':
            if (fastPath) {
              if (oldValue !== value) {
                oldValue = value;
                childNodes[0].textContent = value;
              }
            } else {
              fastPath = true;
              oldValue = value;
              childNodes = domdiff(node.parentNode, childNodes, [text(node, value)], diffOptions);
            }

            break;

          case 'function':
            anyContent(value(node));
            break;

          case 'object':
          case 'undefined':
            if (value == null) {
              fastPath = false;
              childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
              break;
            }

          default:
            fastPath = false;
            oldValue = value;

            if (isArray(value)) {
              if (value.length === 0) {
                if (childNodes.length) {
                  childNodes = domdiff(node.parentNode, childNodes, [], diffOptions);
                }
              } else {
                switch (typeof(value[0])) {
                  case 'string':
                  case 'number':
                  case 'boolean':
                    anyContent(String(value));
                    break;

                  case 'function':
                    anyContent(value.map(invoke, node));
                    break;

                  case 'object':
                    if (isArray(value[0])) {
                      value = value.concat.apply([], value);
                    }

                  default:
                    childNodes = domdiff(node.parentNode, childNodes, value, diffOptions);
                    break;
                }
              }
            } else if (canDiff(value)) {
              childNodes = domdiff(node.parentNode, childNodes, value.nodeType === 11 ? slice.call(value.childNodes) : [value], diffOptions);
            } else if ('text' in value) {
              anyContent(String(value.text));
            } else if ('any' in value) {
              anyContent(value.any);
            } else if ('html' in value) {
              childNodes = domdiff(node.parentNode, childNodes, slice.call(createContent([].concat(value.html).join(''), nodeType).childNodes), diffOptions);
            } else if ('length' in value) {
              anyContent(slice.call(value));
            }

            break;
        }
      };

      return anyContent;
    },
    // style or textareas don't accept HTML as content
    // it's pointless to transform or analyze anything
    // different from text there but it's worth checking
    // for possible defined intents.
    text: function text(node) {
      var oldValue;

      var textContent = function textContent(value) {
        if (oldValue !== value) {
          oldValue = value;

          var type = typeof(value);

          if (type === 'object' && value) {
            if ('text' in value) {
              textContent(String(value.text));
            } else if ('any' in value) {
              textContent(value.any);
            } else if ('html' in value) {
              textContent([].concat(value.html).join(''));
            } else if ('length' in value) {
              textContent(slice.call(value).join(''));
            }
          } else if (type === 'function') {
            textContent(value(node));
          } else {
            node.textContent = value == null ? '' : value;
          }
        }
      };

      return textContent;
    }
  };

  function invoke(callback) {
    return callback(this);
  }

  var wm = new WeakMap$1();
  var container = new WeakMap$1();
  var current = null; // can be used with any useRef hook

  function render(node, callback) {
    var value = update.call(this, node, callback);

    if (container.get(node) !== value) {
      container.set(node, value);
      appendClean(node, value);
    }

    return node;
  } // keyed render via render(node, () => html`...`)
  // non keyed renders in the wild via html`...`

  var html = outer('html');
  var svg = outer('svg'); // an indirect exposure of a domtagger capability
  // usable to transform once per template any layout

  var transform = function transform(callback) {
    var transform = Tagger.prototype.transform;
    Tagger.prototype.transform = transform ? function (markup) {
      return callback(transform(markup));
    } : callback;
  }; // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function appendClean(node, fragment) {
    node.textContent = '';
    node.appendChild(fragment);
  }

  function asNode$1(result, forceFragment) {
    return result.nodeType === wireType ? result.valueOf(forceFragment) : result;
  }

  function outer(type) {
    var wm = new WeakMap$1();

    tag["for"] = function (identity, id) {
      var ref = wm.get(identity) || set(identity);
      if (id == null) id = '$';
      return ref[id] || create(ref, id);
    };

    return tag;

    function create(ref, id) {
      var args = [];
      var wire = null;
      var tagger = new Tagger(type);

      var callback = function callback() {
        return tagger.apply(null, unrollArray(args, 1, 1));
      };

      return ref[id] = function () {
        args = tta.apply(null, arguments);
        var result = update(tagger, callback);
        return wire || (wire = wiredContent(result));
      };
    }

    function set(identity) {
      var ref = {
        '$': null
      };
      wm.set(identity, ref);
      return ref;
    }

    function tag() {
      var args = tta.apply(null, arguments);
      return current ? new Hole(type, args) : new Tagger(type).apply(null, args);
    }
  }

  function set(node) {
    var info = {
      i: 0,
      length: 0,
      stack: [],
      update: false
    };
    wm.set(node, info);
    return info;
  }

  function update(reference, callback) {
    var prev = current;
    current = wm.get(reference) || set(reference);
    current.i = 0;
    var ret = callback.call(this);
    var value;

    if (ret instanceof Hole) {
      value = asNode$1(unroll(ret, 0), current.update);
      var _current = current,
          i = _current.i,
          length = _current.length,
          stack = _current.stack,
          _update = _current.update;
      if (i < length) stack.splice(current.length = i);
      if (_update) current.update = false;
    } else {
      value = asNode$1(ret, false);
    }

    current = prev;
    return value;
  }

  function unroll(hole, level) {
    var _current2 = current,
        i = _current2.i,
        length = _current2.length,
        stack = _current2.stack;
    var type = hole.type,
        args = hole.args;
    var stacked = i < length;
    current.i++;
    if (!stacked) current.length = stack.push({
      l: level,
      kind: type,
      tag: null,
      tpl: args[0],
      wire: null
    });
    unrollArray(args, 1, level + 1);
    var info = stack[i];

    if (stacked) {
      var control = info.l,
          kind = info.kind,
          _tag = info.tag,
          tpl = info.tpl,
          _wire = info.wire;

      if (control === level && type === kind && tpl === args[0]) {
        _tag.apply(null, args);

        return _wire;
      }
    }

    var tag = new Tagger(type);
    var wire = wiredContent(tag.apply(null, args));
    info.l = level;
    info.kind = type;
    info.tag = tag;
    info.tpl = args[0];
    info.wire = wire;
    if (i < 1) current.update = true;
    return wire;
  }

  function unrollArray(arr, i, level) {
    for (var length = arr.length; i < length; i++) {
      var value = arr[i];

      if (typeof(value) === 'object' && value) {
        if (value instanceof Hole) {
          arr[i] = unroll(value, level - 1);
        } else if (isArray(value)) {
          arr[i] = unrollArray(value, 0, level++);
        }
      }
    }

    return arr;
  }

  function wiredContent(node) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    return length === 1 ? childNodes[0] : length ? new Wire(childNodes) : node;
  }

  Object.freeze(Hole);
  function Hole(type, args) {
    this.type = type;
    this.args = args;
  }

  /*! (c) Andrea Giammarchi - ISC */
  var self$2 = null ||
  /* istanbul ignore next */
  {};

  try {
    self$2.Event = new Event('.').constructor;
  } catch (Event) {
    try {
      self$2.Event = new CustomEvent('.').constructor;
    } catch (Event) {
      self$2.Event = function Event(type, init) {
        if (!init) init = {};
        var e = document.createEvent('Event');
        var bubbles = !!init.bubbles;
        var cancelable = !!init.cancelable;
        e.initEvent(type, bubbles, cancelable);

        try {
          e.bubbles = bubbles;
          e.cancelable = cancelable;
        } catch (e) {}

        return e;
      };
    }
  }

  var Event$1 = self$2.Event;

  /*! (c) Andrea Giammarchi - ISC */
  var self$3 = null ||
  /* istanbul ignore next */
  {};

  try {
    self$3.WeakSet = WeakSet;
  } catch (WeakSet) {
    // requires a global WeakMap (IE11+)
    (function (WeakMap) {
      var all = new WeakMap();
      var proto = WeakSet.prototype;

      proto.add = function (value) {
        return all.get(this).set(value, 1), this;
      };

      proto["delete"] = function (value) {
        return all.get(this)["delete"](value);
      };

      proto.has = function (value) {
        return all.get(this).has(value);
      };

      self$3.WeakSet = WeakSet;

      function WeakSet(iterable) {

        all.set(this, new WeakMap());
        if (iterable) iterable.forEach(this.add, this);
      }
    })(WeakMap);
  }

  var WeakSet$1 = self$3.WeakSet;

  var transpiled = null; // the angry koala check @WebReflection/status/1133757401482584064

  try {
    transpiled = new {
      o: function o() {}
    }.o();
  } catch ($) {}

  var extend = function extend(Super) {
    return (
      /*#__PURE__*/
      function (_Super) {
        _inherits(_class, _Super);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        }

        return _class;
      }(Super)
    );
  };

  if (transpiled) {
    var getPrototypeOf = Object.getPrototypeOf,
        setPrototypeOf = Object.setPrototypeOf;

    var _ref = (typeof Reflect === "undefined" ? "undefined" : typeof(Reflect)) === 'object' ? Reflect : {
      construct: function construct(Super, args, Target) {
        var a = [null];

        for (var i = 0; i < args.length; i++) {
          a.push(args[i]);
        }

        var Parent = Super.bind.apply(Super, a);
        return setPrototypeOf(new Parent(), Target.prototype);
      }
    },
        construct = _ref.construct;

    extend = function extend(Super, cutTheMiddleMan) {
      function Class() {
        return construct(cutTheMiddleMan ? getPrototypeOf(Super) : Super, arguments, Class);
      }

      setPrototypeOf(Class.prototype, Super.prototype);
      return setPrototypeOf(Class, Super);
    };
  }

  var hash = function hash(s) {
    var length = s.length;
    var t = 0;
    var i = 0;

    while (i < length) {
      t = (t << 5) - t + s.charCodeAt(i++);
      t = t & t;
    }

    return t.toString(36);
  };

  var registry = {
    map: {},
    re: null
  };

  var regExp = function regExp(keys) {
    return new RegExp("<(/)?(".concat(keys.join('|'), ")([^A-Za-z0-9:._-])"), 'g');
  };

  var tmp = null;

  var replace = function replace(markup, info) {
    var _ref2 = tmp || info,
        map = _ref2.map,
        re = _ref2.re;

    return markup.replace(re, function (_, close, name, after) {
      var _map$name = map[name],
          tagName = _map$name.tagName,
          is = _map$name.is,
          element = _map$name.element;
      return element ? close ? "</".concat(is, ">") : "<".concat(is).concat(after) : close ? "</".concat(tagName, ">") : "<".concat(tagName, " is=\"").concat(is, "\"").concat(after);
    });
  };

  var selector = function selector(_ref3) {
    var tagName = _ref3.tagName,
        is = _ref3.is,
        element = _ref3.element;
    return element ? is : "".concat(tagName, "[is=\"").concat(is, "\"]");
  };

  var getInfo = function getInfo() {
    return tmp;
  };

  var setInfo = function setInfo(info) {
    tmp = info;
  };

  var secret = "_\uD83D\uDD25";
  var defineProperties = Object.defineProperties;
  var $html = new WeakMap$1();
  var $svg = new WeakMap$1();
  var ws = new WeakSet$1();
  var configurable = true;
  var attributeChangedCallback = 'attributeChangedCallback';
  var connectedCallback = 'connectedCallback';
  var disconnectedCallback = "dis".concat(connectedCallback);

  var addInit = function addInit(prototype, properties, method) {
    if (method in prototype) {
      var original = prototype[method];
      properties[method] = {
        configurable: configurable,
        value: function value() {
          init.call(this);
          return original.apply(this, arguments);
        }
      };
    } else properties[method] = {
      configurable: configurable,
      value: init
    };
  };

  var augmented = function augmented(Class) {
    var prototype = Class.prototype;
    var events = [];
    var properties = {
      html: {
        configurable: configurable,
        get: getHTML
      },
      svg: {
        configurable: configurable,
        get: getSVG
      }
    };
    properties[secret] = {
      value: {
        events: events,
        info: null
      }
    };
    if (!('handleEvent' in prototype)) properties.handleEvent = {
      configurable: configurable,
      value: handleEvent
    }; // setup the init dispatch only if needed
    // ensure render with an init is triggered after

    if ('oninit' in prototype) {
      events.push('init');
      addInit(prototype, properties, 'render');
    } // ensure all other callbacks are dispatched too


    addInit(prototype, properties, attributeChangedCallback);
    addInit(prototype, properties, connectedCallback);
    addInit(prototype, properties, disconnectedCallback);
    [[attributeChangedCallback, 'onattributechanged', onattributechanged], [connectedCallback, 'onconnected', onconnected], [disconnectedCallback, 'ondisconnected', ondisconnected], [connectedCallback, 'render', onconnectedrender]].forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 3),
          ce = _ref2[0],
          he = _ref2[1],
          _value = _ref2[2];

      if (!(ce in prototype) && he in prototype) {
        if (he !== 'render') events.push(he.slice(2));

        if (ce in properties) {
          var original = properties[ce].value;
          properties[ce] = {
            configurable: configurable,
            value: function value() {
              original.apply(this, arguments);
              return _value.apply(this, arguments);
            }
          };
        } else properties[ce] = {
          configurable: configurable,
          value: _value
        };
      }
    });
    var booleanAttributes = Class.booleanAttributes || [];
    booleanAttributes.forEach(function (name) {
      if (!(name in prototype)) properties[name] = {
        configurable: configurable,
        get: function get() {
          return this.hasAttribute(name);
        },
        set: function set(value) {
          if (!value || value === 'false') this.removeAttribute(name);else this.setAttribute(name, value);
        }
      };
    });
    var observedAttributes = Class.observedAttributes || [];
    observedAttributes.forEach(function (name) {
      if (!(name in prototype)) properties[name] = {
        configurable: configurable,
        get: function get() {
          return this.getAttribute(name);
        },
        set: function set(value) {
          if (value == null) this.removeAttribute(name);else this.setAttribute(name, value);
        }
      };
    });
    defineProperties(prototype, properties);
    var attributes = booleanAttributes.concat(observedAttributes);
    return attributes.length ? defineProperties(Class, {
      observedAttributes: {
        configurable: configurable,
        get: function get() {
          return attributes;
        }
      }
    }) : Class;
  };

  var evt = function evt(type) {
    return new Event$1(type);
  };

  var html$1 = function html() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Hole('html', args);
  };

  html$1["for"] = html["for"];

  var svg$1 = function svg() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return new Hole('svg', args);
  };

  svg$1["for"] = svg["for"];

  var render$1 = function render$1(where, what) {
    return render(where, typeof what === 'function' ? what : function () {
      return what;
    });
  };

  var setParsed = function setParsed(wm, template, _ref3) {
    var info = _ref3.info;
    var value = info ? replace(template.join(secret), info).split(secret) : template;
    wm.set(template, value);
    return value;
  };

  var setWrap = function setWrap(self, type, wm) {
    var fn = wrap(self, type, new WeakMap$1());
    wm.set(self, fn);
    return fn;
  };

  var wrap = function wrap(self, type, wm) {
    return function (tpl) {
      for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        values[_key3 - 1] = arguments[_key3];
      }

      var template = TL(tpl);
      var local = wm.get(template) || setParsed(wm, template, self[secret]);
      return render(self, function () {
        return type.apply(void 0, [local].concat(values));
      });
    };
  };

  function addListener(type) {
    this.addEventListener(type, this);
  }

  function getHTML() {
    return $html.get(this) || setWrap(this, html$1, $html);
  }

  function getSVG() {
    return $svg.get(this) || setWrap(this, svg$1, $svg);
  }

  function handleEvent(event) {
    this["on".concat(event.type)](event);
  }

  function init() {
    if (!ws.has(this)) {
      ws.add(this);
      this[secret].events.forEach(addListener, this);
      this.dispatchEvent(evt('init'));
    }
  }

  function onattributechanged(attributeName, oldValue, newValue) {
    var event = evt('attributechanged');
    event.attributeName = attributeName;
    event.oldValue = oldValue;
    event.newValue = newValue;
    this.dispatchEvent(event);
  }

  function onconnected() {
    this.dispatchEvent(evt('connected'));
  }

  function onconnectedrender() {
    this.render();
  }

  function ondisconnected() {
    this.dispatchEvent(evt('disconnected'));
  }

  var create = Object.create,
      defineProperty = Object.defineProperty,
      defineProperties$1 = Object.defineProperties,
      getOwnPropertyNames = Object.getOwnPropertyNames,
      getOwnPropertySymbols = Object.getOwnPropertySymbols,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
      keys = Object.keys;
  var HTML = {
    element: HTMLElement
  };
  var cc = new WeakMap$1();
  var oc = new WeakMap$1();

  var info = function info(tagName, is) {
    return {
      tagName: tagName,
      is: is,
      element: tagName === 'element'
    };
  };

  var define = function define($, definition) {
    return (typeof $ === 'string' ? register($, definition, '') : register($.name, $, '')).Class;
  };

  var fromClass = function fromClass(constructor) {
    var Class = extend(constructor, false);
    cc.set(constructor, augmented(Class));
    return Class;
  };

  var fromObject = function fromObject(object, tag) {
    var _grabInfo = grabInfo(object),
        statics = _grabInfo.statics,
        prototype = _grabInfo.prototype;

    var Class = extend(HTML[tag] || (HTML[tag] = document.createElement(tag).constructor), false);
    defineProperties$1(Class.prototype, prototype);
    defineProperties$1(Class, statics);
    oc.set(object, augmented(Class));
    return Class;
  };

  var grabInfo = function grabInfo(object) {
    var statics = create(null);
    var prototype = create(null);
    var info = {
      prototype: prototype,
      statics: statics
    };
    getOwnPropertyNames(object).concat(getOwnPropertySymbols(object)).forEach(function (name) {
      var descriptor = getOwnPropertyDescriptor(object, name);
      descriptor.enumerable = false;

      switch (name) {
        case 'extends':
          name = 'tagName';

        case 'contains':
        case 'includes':
        case 'name':
        case 'booleanAttributes':
        case 'observedAttributes':
        case 'style':
        case 'tagName':
          statics[name] = descriptor;
          break;

        default:
          prototype[name] = descriptor;
      }
    });
    return info;
  };

  var injectStyle = function injectStyle(cssText) {
    if (cssText.length) {
      var style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) style.styleSheet.cssText = cssText;else style.appendChild(document.createTextNode(cssText));
      var head = document.head || document.querySelector('head');
      head.insertBefore(style, head.lastChild);
    }
  };

  var ref = function ref(self, name) {
    return self ? self[name] || (self[name] = {
      current: null
    }) : {
      current: null
    };
  };

  var register = function register($, definition, uid) {
    var _customElements;

    if (!/^([A-Z][A-Za-z0-9_]*)(<([A-Za-z0-9:._-]+)>|:([A-Za-z0-9:._-]+))?$/.test($)) throw 'Invalid name';
    var name = RegExp.$1,
        asTag = RegExp.$3,
        asColon = RegExp.$4;
    var tagName = asTag || asColon || definition.tagName || definition["extends"] || "element";
    if (!/^[A-Za-z0-9:._-]+$/.test(tagName)) throw 'Invalid tag';
    var hyphenizedName = '';
    var suffix = '';

    if (tagName.indexOf('-') < 0) {
      hyphenizedName = hyphenizer(name) + uid;
      if (hyphenizedName.indexOf('-') < 0) suffix = '-heresy';
    } else {
      hyphenizedName = tagName + uid;
      tagName = 'element';
    }

    var is = hyphenizedName + suffix;
    if (customElements.get(is)) throw "Duplicated ".concat(is, " definition");
    var Class = extend(typeof(definition) === 'object' ? oc.get(definition) || fromObject(definition, tagName) : cc.get(definition) || fromClass(definition), true);
    var element = tagName === 'element';
    defineProperty(Class, 'new', {
      value: element ? function () {
        return document.createElement(is);
      } : function () {
        return document.createElement(tagName, {
          is: is
        });
      }
    });
    defineProperty(Class.prototype, 'is', {
      value: is
    }); // for some reason the class must be fully defined upfront
    // or components upgraded from the DOM won't have all details

    if (uid === '') {
      var id = hash(hyphenizedName.toUpperCase());
      registry.map[name] = setupIncludes(Class, tagName, is, {
        id: id,
        i: 0
      });
      registry.re = regExp(keys(registry.map));
    }

    var args = [is, Class];
    if (!element) args.push({
      "extends": tagName
    });

    (_customElements = customElements).define.apply(_customElements, args);

    return {
      Class: Class,
      is: is,
      name: name,
      tagName: tagName
    };
  };

  var setupIncludes = function setupIncludes(Class, tagName, is, u) {
    var prototype = Class.prototype;
    var details = info(tagName, is);
    var styles = [selector(details)];
    var includes = Class.includes || Class.contains;

    if (includes) {
      var map = {};
      keys(includes).forEach(function ($) {
        var uid = "-".concat(u.id, "-").concat(u.i++);

        var _register = register($, includes[$], uid),
            Class = _register.Class,
            is = _register.is,
            name = _register.name,
            tagName = _register.tagName;

        styles.push(selector(map[name] = setupIncludes(Class, tagName, is, u)));
      });
      var re = regExp(keys(map));
      var events = prototype[secret].events;
      var value = {
        events: events,
        info: {
          map: map,
          re: re
        }
      };
      defineProperty(prototype, secret, {
        value: value
      });

      if ('render' in prototype) {
        var _render = prototype.render;
        var _info = value.info;
        defineProperty(prototype, 'render', {
          value: function value() {
            var tmp = getInfo();
            setInfo(_info);

            var out = _render.apply(this, arguments);

            setInfo(tmp);
            return out;
          }
        });
      }
    }

    if ('style' in Class) injectStyle(Class.style.apply(Class, styles));
    return details;
  };

  transform(function (markup) {
    return replace(markup, registry);
  });

  exports.define = define;
  exports.html = html$1;
  exports.ref = ref;
  exports.render = render$1;
  exports.svg = svg$1;

  return exports;

}(document,{}));
