"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  <Div>\n    <H1>Hello there</H1>\n    <P>This is how custom elements look via heresy.</P>\n    <P>Isn't this awesome?</P>\n  </Div>\n  <MyButton props=", "/>\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Click ", "!"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _heresy = heresy,
    define = _heresy.define,
    html = _heresy.html,
    render = _heresy.render; // a div

define(
/*#__PURE__*/
function (_HTMLDivElement) {
  _inherits(Div, _HTMLDivElement);

  function Div() {
    _classCallCheck(this, Div);

    return _possibleConstructorReturn(this, _getPrototypeOf(Div).apply(this, arguments));
  }

  _createClass(Div, null, [{
    key: "tagName",
    get: function get() {
      return 'div';
    }
  }]);

  return Div;
}(_wrapNativeSuper(HTMLDivElement))); // a paragraph

define(
/*#__PURE__*/
function (_HTMLParagraphElement) {
  _inherits(P, _HTMLParagraphElement);

  function P() {
    _classCallCheck(this, P);

    return _possibleConstructorReturn(this, _getPrototypeOf(P).apply(this, arguments));
  }

  _createClass(P, null, [{
    key: "tagName",
    get: function get() {
      return 'p';
    }
  }]);

  return P;
}(_wrapNativeSuper(HTMLParagraphElement))); // a h1

define(
/*#__PURE__*/
function (_HTMLHeadingElement) {
  _inherits(H1, _HTMLHeadingElement);

  function H1() {
    _classCallCheck(this, H1);

    return _possibleConstructorReturn(this, _getPrototypeOf(H1).apply(this, arguments));
  }

  _createClass(H1, null, [{
    key: "tagName",
    get: function get() {
      return 'h1';
    }
  }]);

  return H1;
}(_wrapNativeSuper(HTMLHeadingElement))); // define the custom element (class name mandatory)

define(
/*#__PURE__*/
function (_HTMLButtonElement) {
  _inherits(MyButton, _HTMLButtonElement);

  function MyButton() {
    _classCallCheck(this, MyButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(MyButton).apply(this, arguments));
  }

  _createClass(MyButton, [{
    key: "connectedCallback",
    // (optional) render once connected
    value: function connectedCallback() {
      this.render();
    } // (optional) populate this button content
    //            (kinda useless with void elements such img, input, ...)

  }, {
    key: "render",
    value: function render() {
      // this.html or this.svg are provided automatically
      this.html(_templateObject(), this.props.name);
    }
  }, {
    key: "props",
    // (optional) intercepts some attribute (any value)
    set: function set(props) {
      this._props = props;
    },
    get: function get() {
      return this._props;
    }
  }], [{
    key: "tagName",
    // the only mandatory static field
    get: function get() {
      return 'button';
    }
  }]);

  return MyButton;
}(_wrapNativeSuper(HTMLButtonElement)));
render(document.body, function () {
  return html(_templateObject2(), {
    name: 'Magic'
  });
});