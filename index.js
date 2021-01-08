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

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
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

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*! (c) Andrea Giammarchi - ISC */
  var self = {};

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

  var uhyphen = (function (camel) {
    return camel.replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z])([A-Z]))/g, '$2$5-$3$6').toLowerCase();
  });

  /*! (c) Andrea Giammarchi - ISC */
  var self$1 = {};

  try {
    self$1.Event = new Event('.').constructor;
  } catch (Event) {
    try {
      self$1.Event = new CustomEvent('.').constructor;
    } catch (Event) {
      self$1.Event = function Event(type, init) {
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

  var Event$1 = self$1.Event;

  /*! (c) Andrea Giammarchi - ISC */
  var self$2 = {};

  try {
    self$2.WeakSet = WeakSet;
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

      self$2.WeakSet = WeakSet;

      function WeakSet(iterable) {

        all.set(this, new WeakMap());
        if (iterable) iterable.forEach(this.add, this);
      }
    })(WeakMap);
  }

  var WeakSet$1 = self$2.WeakSet;

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
  var SHOULD_USE_TEXT_CONTENT = /^(?:plaintext|script|style|textarea|title|xmp)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  /*! (c) Andrea Giammarchi - ISC */
  function domsanitizer (template) {
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

  var isArray = Array.isArray;
  var _ref = [],
      slice = _ref.slice;

  var umap = (function (_) {
    return {
      // About: get: _.get.bind(_)
      // It looks like WebKit/Safari didn't optimize bind at all,
      // so that using bind slows it down by 60%.
      // Firefox and Chrome are just fine in both cases,
      // so let's use the approach that works fast everywhere 👍
      get: function get(key) {
        return _.get(key);
      },
      set: function set(key, value) {
        return _.set(key, value), value;
      }
    };
  });

  var ELEMENT_NODE$1 = 1;
  var nodeType = 111;

  var remove = function remove(_ref) {
    var firstChild = _ref.firstChild,
        lastChild = _ref.lastChild;
    var range = document.createRange();
    range.setStartAfter(firstChild);
    range.setEndAfter(lastChild);
    range.deleteContents();
    return firstChild;
  };

  var diffable = function diffable(node, operation) {
    return node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
  };
  var persistent = function persistent(fragment) {
    var childNodes = fragment.childNodes;
    var length = childNodes.length;
    if (length < 2) return length ? childNodes[0] : fragment;
    var nodes = slice.call(childNodes, 0);
    var firstChild = nodes[0];
    var lastChild = nodes[length - 1];
    return {
      ELEMENT_NODE: ELEMENT_NODE$1,
      nodeType: nodeType,
      firstChild: firstChild,
      lastChild: lastChild,
      valueOf: function valueOf() {
        if (childNodes.length !== length) {
          var i = 0;

          while (i < length) {
            fragment.appendChild(nodes[i++]);
          }
        }

        return fragment;
      }
    };
  };

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function (document) {

    var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = ('content' in create(TEMPLATE));
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

  /**
   * ISC License
   *
   * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  /**
   * @param {Node} parentNode The container where children live
   * @param {Node[]} a The list of current/live children
   * @param {Node[]} b The list of future children
   * @param {(entry: Node, action: number) => Node} get
   * The callback invoked per each entry related DOM operation.
   * @param {Node} [before] The optional node used as anchor to insert before.
   * @returns {Node[]} The same list of future children.
   */
  var udomdiff = (function (parentNode, a, b, get, before) {
    var bLength = b.length;
    var aEnd = a.length;
    var bEnd = bLength;
    var aStart = 0;
    var bStart = 0;
    var map = null;

    while (aStart < aEnd || bStart < bEnd) {
      // append head, tail, or nodes in between: fast path
      if (aEnd === aStart) {
        // we could be in a situation where the rest of nodes that
        // need to be added are not at the end, and in such case
        // the node to `insertBefore`, if the index is more than 0
        // must be retrieved, otherwise it's gonna be the first item.
        var node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

        while (bStart < bEnd) {
          parentNode.insertBefore(get(b[bStart++], 1), node);
        }
      } // remove head or tail: fast path
      else if (bEnd === bStart) {
          while (aStart < aEnd) {
            // remove the node only if it's unknown or not live
            if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
            aStart++;
          }
        } // same node: fast path
        else if (a[aStart] === b[bStart]) {
            aStart++;
            bStart++;
          } // same tail: fast path
          else if (a[aEnd - 1] === b[bEnd - 1]) {
              aEnd--;
              bEnd--;
            } // The once here single last swap "fast path" has been removed in v1.1.0
            // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
            // reverse swap: also fast path
            else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                // this is a "shrink" operation that could happen in these cases:
                // [1, 2, 3, 4, 5]
                // [1, 4, 3, 2, 5]
                // or asymmetric too
                // [1, 2, 3, 4, 5]
                // [1, 2, 3, 5, 6, 4]
                var _node = get(a[--aEnd], -1).nextSibling;
                parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
                parentNode.insertBefore(get(b[--bEnd], 1), _node); // mark the future index as identical (yeah, it's dirty, but cheap 👍)
                // The main reason to do this, is that when a[aEnd] will be reached,
                // the loop will likely be on the fast path, as identical to b[bEnd].
                // In the best case scenario, the next loop will skip the tail,
                // but in the worst one, this node will be considered as already
                // processed, bailing out pretty quickly from the map index check

                a[aEnd] = b[bEnd];
              } // map based fallback, "slow" path
              else {
                  // the map requires an O(bEnd - bStart) operation once
                  // to store all future nodes indexes for later purposes.
                  // In the worst case scenario, this is a full O(N) cost,
                  // and such scenario happens at least when all nodes are different,
                  // but also if both first and last items of the lists are different
                  if (!map) {
                    map = new Map();
                    var i = bStart;

                    while (i < bEnd) {
                      map.set(b[i], i++);
                    }
                  } // if it's a future node, hence it needs some handling


                  if (map.has(a[aStart])) {
                    // grab the index of such node, 'cause it might have been processed
                    var index = map.get(a[aStart]); // if it's not already processed, look on demand for the next LCS

                    if (bStart < index && index < bEnd) {
                      var _i = aStart; // counts the amount of nodes that are the same in the future

                      var sequence = 1;

                      while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === index + sequence) {
                        sequence++;
                      } // effort decision here: if the sequence is longer than replaces
                      // needed to reach such sequence, which would brings again this loop
                      // to the fast path, prepend the difference before a sequence,
                      // and move only the future list index forward, so that aStart
                      // and bStart will be aligned again, hence on the fast path.
                      // An example considering aStart and bStart are both 0:
                      // a: [1, 2, 3, 4]
                      // b: [7, 1, 2, 3, 6]
                      // this would place 7 before 1 and, from that time on, 1, 2, and 3
                      // will be processed at zero cost


                      if (sequence > index - bStart) {
                        var _node2 = get(a[aStart], 0);

                        while (bStart < index) {
                          parentNode.insertBefore(get(b[bStart++], 1), _node2);
                        }
                      } // if the effort wasn't good enough, fallback to a replace,
                      // moving both source and target indexes forward, hoping that some
                      // similar node will be found later on, to go back to the fast path
                      else {
                          parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
                        }
                    } // otherwise move the source forward, 'cause there's nothing to do
                    else aStart++;
                  } // this node has no meaning in the future list, so it's more than safe
                  // to remove it, and check the next live node out instead, meaning
                  // that only the live list index should be forwarded
                  else parentNode.removeChild(get(a[aStart++], -1));
                }
    }

    return b;
  });

  /*! (c) Andrea Giammarchi - ISC */
  var importNode = function (document, appendChild, cloneNode, createTextNode, importNode) {
    var _native = (importNode in document); // IE 11 has problems with cloning templates:
    // it "forgets" empty childNodes. This feature-detects that.


    var fragment = document.createDocumentFragment();
    fragment[appendChild](document[createTextNode]('g'));
    fragment[appendChild](document[createTextNode](''));
    /* istanbul ignore next */

    var content = _native ? document[importNode](fragment, true) : fragment[cloneNode](true);
    return content.childNodes.length < 2 ? function importNode(node, deep) {
      var clone = node[cloneNode]();

      for (var
      /* istanbul ignore next */
      childNodes = node.childNodes || [], length = childNodes.length, i = 0; deep && i < length; i++) {
        clone[appendChild](importNode(childNodes[i], deep));
      }

      return clone;
    } :
    /* istanbul ignore next */
    _native ? document[importNode] : function (node, deep) {
      return node[cloneNode](!!deep);
    };
  }(document, 'appendChild', 'cloneNode', 'createTextNode', 'importNode');

  var trim = ''.trim ||
  /* istanbul ignore next */
  function () {
    return String(this).replace(/^\s+|\s+/g, '');
  };

  /* istanbul ignore next */

  var normalizeAttributes = UID_IE ? function (attributes, parts) {
    var html = parts.join(' ');
    return parts.slice.call(attributes, 0).sort(function (left, right) {
      return html.indexOf(left.name) <= html.indexOf(right.name) ? -1 : 1;
    });
  } : function (attributes, parts) {
    return parts.slice.call(attributes, 0);
  };

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
    var attributes = node.attributes;
    var cache = [];
    var remove = [];
    var array = normalizeAttributes(attributes, parts);
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

        if (cache.indexOf(name) < 0) {
          cache.push(name);
          var realName = parts.shift().replace(direct ? /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ : new RegExp('^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")[\\S\\s]*', 'i'), '$1');
          var value = attributes[realName] || // the following ignore is covered by browsers
          // while basicHTML is already case-sensitive

          /* istanbul ignore next */
          attributes[realName.toLowerCase()];
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
    /* istanbul ignore next */

    var cleanValue = 0 < length && UID_IE && !('ownerSVGElement' in node);

    while (i < length) {
      // Edge HTML bug #16878726
      var attr = remove[i++]; // IE/Edge bug lighterhtml#63 - clean the value or it'll persist

      /* istanbul ignore next */

      if (cleanValue) attr.value = ''; // IE/Edge bug lighterhtml#64 - don't use removeAttributeNode

      node.removeAttribute(attr.name);
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
  var parsed = umap(new WeakMap$1());

  function createInfo(options, template) {
    var markup = (options.convert || domsanitizer)(template);
    var transform = options.transform;
    if (transform) markup = transform(markup);
    var content = createContent(markup, options.type);
    cleanContent(content);
    var holes = [];
    parse(content, holes, template.slice(0), []);
    return {
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
  }

  function createDetails(options, template) {
    var info = parsed.get(template) || parsed.set(template, createInfo(options, template));
    return info.updates(importNode.call(document, info.content, true));
  }

  var empty = [];

  function domtagger(options) {
    var previous = empty;
    var updates = cleanContent;
    return function (template) {
      if (previous !== template) updates = createDetails(options, previous = template);
      return updates.apply(null, arguments);
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

  var aria = function aria(node) {
    return function (values) {
      for (var key in values) {
        var name = key === 'role' ? key : "aria-".concat(key);
        var value = values[key];
        if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
      }
    };
  };
  var attribute = function attribute(node, name) {
    var oldValue,
        orphan = true;
    var attributeNode = document.createAttributeNS(null, name);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (oldValue == null) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = newValue;

          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };
  var data = function data(_ref) {
    var dataset = _ref.dataset;
    return function (values) {
      for (var key in values) {
        var value = values[key];
        if (value == null) delete dataset[key];else dataset[key] = value;
      }
    };
  };
  var event = function event(node, name) {
    var oldValue,
        type = name.slice(2);
    if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      var info = isArray(newValue) ? newValue : [newValue, false];

      if (oldValue !== info[0]) {
        if (oldValue) node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = function ref(node) {
    return function (value) {
      if (typeof value === 'function') value(node);else value.current = node;
    };
  };
  var setter = function setter(node, key) {
    return function (value) {
      node[key] = value;
    };
  };

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
  }; // list of attributes that should not be directly assigned


  var readOnly = /^(?:form|list)$/i; // simplifies text node creation

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
    attribute: function attribute$1(node, name, original) {
      var isSVG = this.type === 'svg';

      switch (name) {
        case 'class':
          if (isSVG) return attribute(node, name);
          name = 'className';

        case 'props':
          return setter(node, name);

        case 'aria':
          return aria(node);

        case 'style':
          return hyperStyle(node, original, isSVG);

        case 'ref':
          return ref(node);

        case '.dataset':
          return data(node);

        default:
          if (name.slice(0, 1) === '.') return setter(node, name.slice(1));
          if (name.slice(0, 2) === 'on') return event(node, name);
          if (name in node && !(isSVG || readOnly.test(name))) return hyperProperty(node, name);
          return attribute(node, name);
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
      var type = this.type;
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
              childNodes = udomdiff(node.parentNode, childNodes, [text(node, value)], diffable, node);
            }

            break;

          case 'function':
            anyContent(value(node));
            break;

          case 'object':
          case 'undefined':
            if (value == null) {
              fastPath = false;
              childNodes = udomdiff(node.parentNode, childNodes, [], diffable, node);
              break;
            }

          default:
            fastPath = false;
            oldValue = value;

            if (isArray(value)) {
              if (value.length === 0) {
                if (childNodes.length) {
                  childNodes = udomdiff(node.parentNode, childNodes, [], diffable, node);
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
                    childNodes = udomdiff(node.parentNode, childNodes, value, diffable, node);
                    break;
                }
              }
            } else if ('ELEMENT_NODE' in value) {
              childNodes = udomdiff(node.parentNode, childNodes, value.nodeType === 11 ? slice.call(value.childNodes) : [value], diffable, node);
            } else if ('text' in value) {
              anyContent(String(value.text));
            } else if ('any' in value) {
              anyContent(value.any);
            } else if ('html' in value) {
              childNodes = udomdiff(node.parentNode, childNodes, slice.call(createContent([].concat(value.html).join(''), type).childNodes), diffable, node);
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

  var create = Object.create,
      freeze = Object.freeze,
      keys = Object.keys;
  var tProto = Tagger.prototype;
  var cache = umap(new WeakMap$1());

  var createRender = function createRender(Tagger) {
    return {
      html: outer('html', Tagger),
      svg: outer('svg', Tagger),
      render: function render(where, what) {
        var hole = typeof what === 'function' ? what() : what;
        var info = cache.get(where) || cache.set(where, createCache());
        var wire = hole instanceof LighterHole ? unroll(Tagger, info, hole) : hole;

        if (wire !== info.wire) {
          info.wire = wire;
          where.textContent = '';
          where.appendChild(wire.valueOf());
        }

        return where;
      }
    };
  };

  var createCache = function createCache() {
    return {
      stack: [],
      entry: null,
      wire: null
    };
  };

  var outer = function outer(type, Tagger) {
    var cache = umap(new WeakMap$1());

    var fixed = function fixed(info) {
      return function () {
        return unroll(Tagger, info, hole.apply(null, arguments));
      };
    };

    hole["for"] = function (ref, id) {
      var memo = cache.get(ref) || cache.set(ref, create(null));
      return memo[id] || (memo[id] = fixed(createCache()));
    };

    hole.node = function () {
      return unroll(Tagger, createCache(), hole.apply(null, arguments)).valueOf();
    };

    return hole;

    function hole() {
      return new LighterHole(type, tta.apply(null, arguments));
    }
  };

  var unroll = function unroll(Tagger, info, _ref) {
    var _entry;

    var type = _ref.type,
        template = _ref.template,
        values = _ref.values;
    var length = values.length;
    unrollValues(Tagger, info, values, length);
    var entry = info.entry;

    if (!entry || entry.template !== template || entry.type !== type) {
      var tag = new Tagger(type);
      info.entry = entry = {
        type: type,
        template: template,
        tag: tag,
        wire: persistent(tag.apply(void 0, [template].concat(_toConsumableArray(values))))
      };
    } else (_entry = entry).tag.apply(_entry, [template].concat(_toConsumableArray(values)));

    return entry.wire;
  };

  var unrollValues = function unrollValues(Tagger, _ref2, values, length) {
    var stack = _ref2.stack;

    for (var i = 0; i < length; i++) {
      var hole = values[i];
      if (hole instanceof Hole) values[i] = unroll(Tagger, stack[i] || (stack[i] = createCache()), hole);else if (isArray(hole)) unrollValues(Tagger, stack[i] || (stack[i] = createCache()), hole, hole.length);else stack[i] = null;
    }

    if (length < stack.length) stack.splice(length);
  };

  freeze(LighterHole);

  function LighterHole(type, args) {
    this.type = type;
    this.template = args.shift();
    this.values = args;
  }
  var Hole = LighterHole;
  var custom = function custom(overrides) {
    var prototype = create(tProto);
    keys(overrides).forEach(function (key) {
      prototype[key] = overrides[key](prototype[key] || (key === 'convert' ? domsanitizer : String));
    });
    CustomTagger.prototype = prototype;
    return createRender(CustomTagger);

    function CustomTagger() {
      return Tagger.apply(this, arguments);
    }
  };

  var _createRender = createRender(Tagger);

  function tta() {
    var out = [],
        i = 0,
        length = arguments.length;

    while (i < length) {
      out.push(arguments[i++]);
    }

    return out;
  }

  var compat = typeof cancelAnimationFrame === 'function';
  var cAF = compat ? cancelAnimationFrame : clearTimeout;
  var rAF = compat ? requestAnimationFrame : setTimeout;
  function reraf(limit) {
    var force, timer, callback, self, args;
    reset();
    return function reschedule(_callback, _self, _args) {
      callback = _callback;
      self = _self;
      args = _args;
      if (!timer) timer = rAF(invoke);
      if (--force < 0) stop(true);
      return stop;
    };

    function invoke() {
      reset();
      callback.apply(self, args || []);
    }

    function reset() {
      force = limit || Infinity;
      timer = compat ? 0 : null;
    }

    function stop(flush) {
      var didStop = !!timer;

      if (didStop) {
        cAF(timer);
        if (flush) invoke();
      }

      return didStop;
    }
  }

  /*! (c) Andrea Giammarchi - ISC */
  var state = null; // main exports

  var augmentor = function augmentor(fn) {
    var stack = [];
    return function hook() {
      var prev = state;
      var after = [];
      state = {
        hook: hook,
        args: arguments,
        stack: stack,
        i: 0,
        length: stack.length,
        after: after
      };

      try {
        return fn.apply(null, arguments);
      } finally {
        state = prev;

        for (var i = 0, length = after.length; i < length; i++) {
          after[i]();
        }
      }
    };
  };
  var contextual = function contextual(fn) {
    var check = true;
    var context = null;
    var augmented = augmentor(function () {
      return fn.apply(context, arguments);
    });
    return function hook() {
      var result = augmented.apply(context = this, arguments); // perform hasEffect check only once

      if (check) {
        check = !check; // and copy same Array if any FX was used

        if (hasEffect(augmented)) effects.set(hook, effects.get(augmented));
      }

      return result;
    };
  }; // useReducer

  var updates = umap(new WeakMap());

  var hookdate = function hookdate(hook, ctx, args) {
    hook.apply(ctx, args);
  };

  var defaults = {
    async: false,
    always: false
  };

  var getValue = function getValue(value, f) {
    return typeof f == 'function' ? f(value) : f;
  };

  var useReducer = function useReducer(reducer, value, init, options) {
    var i = state.i++;
    var _state = state,
        hook = _state.hook,
        args = _state.args,
        stack = _state.stack,
        length = _state.length;
    if (i === length) state.length = stack.push({});
    var ref = stack[i];
    ref.args = args;

    if (i === length) {
      var fn = typeof init === 'function';

      var _ref = (fn ? options : init) || options || defaults,
          asy = _ref.async,
          always = _ref.always;

      ref.$ = fn ? init(value) : getValue(void 0, value);
      ref._ = asy ? updates.get(hook) || updates.set(hook, reraf()) : hookdate;

      ref.f = function (value) {
        var $value = reducer(ref.$, value);

        if (always || ref.$ !== $value) {
          ref.$ = $value;

          ref._(hook, null, ref.args);
        }
      };
    }

    return [ref.$, ref.f];
  }; // useState

  var useState = function useState(value, options) {
    return useReducer(getValue, value, void 0, options);
  }; // useContext

  var hooks = new WeakMap();

  var invoke$1 = function invoke(_ref2) {
    var hook = _ref2.hook,
        args = _ref2.args;
    hook.apply(null, args);
  };

  var createContext = function createContext(value) {
    var context = {
      value: value,
      provide: provide
    };
    hooks.set(context, []);
    return context;
  };
  var useContext = function useContext(context) {
    var _state2 = state,
        hook = _state2.hook,
        args = _state2.args;
    var stack = hooks.get(context);
    var info = {
      hook: hook,
      args: args
    };
    if (!stack.some(update, info)) stack.push(info);
    return context.value;
  };

  function provide(value) {
    if (this.value !== value) {
      this.value = value;
      hooks.get(this).forEach(invoke$1);
    }
  }

  function update(_ref3) {
    var hook = _ref3.hook;
    return hook === this.hook;
  } // dropEffect, hasEffect, useEffect, useLayoutEffect


  var effects = new WeakMap();
  var fx = umap(effects);

  var stop = function stop() {};

  var createEffect = function createEffect(asy) {
    return function (effect, guards) {
      var i = state.i++;
      var _state3 = state,
          hook = _state3.hook,
          after = _state3.after,
          stack = _state3.stack,
          length = _state3.length;

      if (i < length) {
        var info = stack[i];
        var _update = info.update,
            values = info.values,
            _stop = info.stop;

        if (!guards || guards.some(different, values)) {
          info.values = guards;
          if (asy) _stop(asy);
          var clean = info.clean;

          if (clean) {
            info.clean = null;
            clean();
          }

          var _invoke = function _invoke() {
            info.clean = effect();
          };

          if (asy) _update(_invoke);else after.push(_invoke);
        }
      } else {
        var _update2 = asy ? reraf() : stop;

        var _info = {
          clean: null,
          update: _update2,
          values: guards,
          stop: stop
        };
        state.length = stack.push(_info);
        (fx.get(hook) || fx.set(hook, [])).push(_info);

        var _invoke2 = function _invoke2() {
          _info.clean = effect();
        };

        if (asy) _info.stop = _update2(_invoke2);else after.push(_invoke2);
      }
    };
  };

  var dropEffect = function dropEffect(hook) {
    (effects.get(hook) || []).forEach(function (info) {
      var clean = info.clean,
          stop = info.stop;
      stop();

      if (clean) {
        info.clean = null;
        clean();
      }
    });
  };
  var hasEffect = effects.has.bind(effects);
  var useEffect = createEffect(true);
  var useLayoutEffect = createEffect(false); // useMemo, useCallback

  var useMemo = function useMemo(memo, guards) {
    var i = state.i++;
    var _state4 = state,
        stack = _state4.stack,
        length = _state4.length;
    if (i === length) state.length = stack.push({
      $: memo(),
      _: guards
    });else if (!guards || guards.some(different, stack[i]._)) stack[i] = {
      $: memo(),
      _: guards
    };
    return stack[i].$;
  };
  var useCallback = function useCallback(fn, guards) {
    return useMemo(function () {
      return fn;
    }, guards);
  }; // useRef

  var useRef = function useRef(value) {
    var i = state.i++;
    var _state5 = state,
        stack = _state5.stack,
        length = _state5.length;
    if (i === length) state.length = stack.push({
      current: value
    });
    return stack[i];
  };

  function different(value, i) {
    return value !== this[i];
  }

  var transpiled = null; // the angry koala check @WebReflection/status/1133757401482584064

  try {
    transpiled = new {
      o: function o() {}
    }.o();
  } catch ($) {}

  var extend = function extend(Super) {
    return /*#__PURE__*/function (_Super) {
      _inherits(_class, _Super);

      var _super = _createSuper(_class);

      function _class() {
        _classCallCheck(this, _class);

        return _super.apply(this, arguments);
      }

      return _class;
    }(Super);
  };

  if (transpiled) {
    var getPrototypeOf = Object.getPrototypeOf,
        setPrototypeOf = Object.setPrototypeOf;

    var _ref$1 = (typeof Reflect === "undefined" ? "undefined" : typeof(Reflect)) === 'object' ? Reflect : {
      construct: function construct(Super, args, Target) {
        var a = [null];

        for (var i = 0; i < args.length; i++) {
          a.push(args[i]);
        }

        var Parent = Super.bind.apply(Super, a);
        return setPrototypeOf(new Parent(), Target.prototype);
      }
    },
        construct = _ref$1.construct;

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

  var hooks$1 = {
    useCallback: useCallback,
    useContext: useContext,
    useEffect: useEffect,
    useLayoutEffect: useLayoutEffect,
    useMemo: useMemo,
    useReducer: useReducer,
    useRef: useRef,
    useState: useState
  };

  var _custom = custom({
    transform: function transform() {
      return function (markup) {
        return replace(markup, registry);
      };
    }
  }),
      lighterRender = _custom.render,
      lighterHTML = _custom.html,
      lighterSVG = _custom.svg;

  var secret = "_\uD83D\uDD25";
  var defineProperties = Object.defineProperties;
  var $html = new WeakMap$1();
  var $svg = new WeakMap$1();
  var $mappedAttributes = new WeakMap$1();
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
    };

    if ('render' in prototype && prototype.render.length) {
      var oninit = prototype.oninit;
      defineProperties(prototype, {
        oninit: {
          configurable: configurable,
          value: function value() {
            var hook = augmentor(this.render.bind(this, hooks$1));
            defineProperties(this, {
              render: {
                configurable: configurable,
                value: hook
              }
            });
            this.addEventListener('disconnected', dropEffect.bind(null, hook), false);
            if (oninit) oninit.apply(this, arguments);
          }
        }
      });
    } // setup the init dispatch only if needed
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
    var mappedAttributes = Class.mappedAttributes || [];
    mappedAttributes.forEach(function (name) {
      var _ = new WeakMap$1();

      var listening = ('on' + name in prototype);
      if (listening) events.push(name);
      properties[name] = {
        configurable: configurable,
        get: function get() {
          return _.get(this);
        },
        set: function set(detail) {
          _.set(this, detail);

          if (listening) {
            var e = evt(name);
            e.detail = detail;
            if (ws.has(this)) this.dispatchEvent(e);else {
              var dispatch = $mappedAttributes.get(this);
              if (dispatch) dispatch.push(e);else $mappedAttributes.set(this, [e]);
            }
          }
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

  var defineHook = function defineHook(name, hook) {
    if (name in hooks$1) throw new Error('duplicated hook ' + name);
    hooks$1[name] = hook(hooks$1);
  };

  var evt = function evt(type) {
    return new Event$1(type);
  };

  var html = function html() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Hole('html', args);
  };

  html["for"] = lighterHTML["for"];

  var svg = function svg() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return new Hole('svg', args);
  };

  svg["for"] = lighterSVG["for"];

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
    return function (template) {
      for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        values[_key3 - 1] = arguments[_key3];
      }

      var local = wm.get(template) || setParsed(wm, template, self[secret]);
      return lighterRender(self, function () {
        return type.apply(void 0, [local].concat(values));
      });
    };
  };

  function addListener(type) {
    this.addEventListener(type, this);
  }

  function dispatchEvent(event) {
    this.dispatchEvent(event);
  }

  function getHTML() {
    return $html.get(this) || setWrap(this, html, $html);
  }

  function getSVG() {
    return $svg.get(this) || setWrap(this, svg, $svg);
  }

  function handleEvent(event) {
    this["on".concat(event.type)](event);
  }

  function init() {
    if (!ws.has(this)) {
      ws.add(this);
      this[secret].events.forEach(addListener, this);
      this.dispatchEvent(evt('init'));
      var events = $mappedAttributes.get(this);

      if (events) {
        $mappedAttributes["delete"](this);
        events.forEach(dispatchEvent, this);
      }
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

  var create$1 = Object.create,
      defineProperty = Object.defineProperty,
      defineProperties$1 = Object.defineProperties,
      getOwnPropertyNames = Object.getOwnPropertyNames,
      getOwnPropertySymbols = Object.getOwnPropertySymbols,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
      keys$1 = Object.keys;
  var HTML = {
    element: HTMLElement
  };
  var cc = new WeakMap$1();
  var dc = new WeakMap$1();
  var oc = new WeakMap$1();
  var fragments = new WeakMap$1();

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
    var statics = create$1(null);
    var prototype = create$1(null);
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
        case 'mappedAttributes':
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
    if ((cssText || '').length) {
      var style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) style.styleSheet.cssText = cssText;else style.appendChild(document.createTextNode(cssText));
      var head = document.head || document.querySelector('head');
      head.insertBefore(style, head.lastChild);
    }
  };

  var ref$1 = function ref(self, name) {
    return self ? self[name] || (self[name] = {
      current: null
    }) : {
      current: null
    };
  };

  var register = function register($, definition, uid) {
    var _customElements;

    var validName = /^([A-Z][A-Za-z0-9_]*)(<([A-Za-z0-9:._-]+)>|:([A-Za-z0-9:._-]+))?$/;
    if (!validName.test($)) throw 'Invalid name';
    var name = RegExp.$1,
        asTag = RegExp.$3,
        asColon = RegExp.$4;
    var tagName = asTag || asColon || definition.tagName || definition["extends"] || 'element';
    var isFragment = tagName === 'fragment';
    if (isFragment) tagName = 'element';else if (!/^[A-Za-z0-9:._-]+$/.test(tagName)) throw 'Invalid tag';
    var hyphenizedName = '';
    var suffix = '';

    if (tagName.indexOf('-') < 0) {
      hyphenizedName = uhyphen(name) + uid;
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
      registry.re = regExp(keys$1(registry.map));
    }

    if (isFragment) {
      var _render = Class.prototype.render;
      defineProperty(Class.prototype, 'render', {
        configurable: true,
        value: function value() {
          if (_render) _render.apply(this, arguments);

          if (this.parentNode) {
            var firstChild = this.firstChild;
            var contents = null;

            if (firstChild) {
              var range = document.createRange();
              range.setStartBefore(firstChild);
              range.setEndAfter(this.lastChild);
              contents = range.extractContents();
              this.parentNode.replaceChild(contents, this);
            }
          }
        }
      });
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

  var render = function render(where, what) {
    return lighterRender(where, typeof what === 'function' ? what : what instanceof Hole ? function () {
      return what;
    } : runtime(what));
  };

  var dcid = Math.random();

  var runtime = function runtime(Component) {
    var Class = dc.get(Component);

    if (!Class) {
      var name = ('Heresy' + ++dcid).replace(/[^He-y0-9]/g, '');
      dc.set(Component, Class = define(name, Component));
    }

    return function () {
      return Class["new"]();
    };
  };

  var setupIncludes = function setupIncludes(Class, tagName, is, u) {
    var prototype = Class.prototype;
    var details = info(tagName, is);
    var styles = [selector(details)];
    var includes = Class.includes || Class.contains;

    if (includes) {
      var map = {};
      keys$1(includes).forEach(function ($) {
        var uid = "-".concat(u.id, "-").concat(u.i++);

        var _register = register($, includes[$], uid),
            Class = _register.Class,
            is = _register.is,
            name = _register.name,
            tagName = _register.tagName;

        styles.push(selector(map[name] = setupIncludes(Class, tagName, is, u)));
      });
      var re = regExp(keys$1(map));
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
        var _render2 = prototype.render;
        var _info = value.info;
        defineProperty(prototype, 'render', {
          configurable: true,
          value: function value() {
            var tmp = getInfo();
            setInfo(_info);

            var out = _render2.apply(this, arguments);

            setInfo(tmp);
            return out;
          }
        });
      }
    }

    if ('style' in Class) injectStyle(Class.style.apply(Class, styles));
    return details;
  };

  exports.contextual = contextual;
  exports.createContext = createContext;
  exports.define = define;
  exports.defineHook = defineHook;
  exports.html = html;
  exports.ref = ref$1;
  exports.render = render;
  exports.svg = svg;

  return exports;

}(document,{}));
