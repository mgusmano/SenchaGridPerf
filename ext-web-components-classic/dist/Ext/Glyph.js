import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import Ext_Base from '../Ext/Base.js';

var Ext_Glyph = /*#__PURE__*/function (_Ext_Base) {
  _inheritsLoose(Ext_Glyph, _Ext_Base);

  Ext_Glyph.PROPERTIES = function PROPERTIES() {
    return [];
  };

  Ext_Glyph.EVENTS = function EVENTS() {
    return [{
      name: 'ready',
      parameters: 'cmp,cmpObj'
    }, {
      name: 'created',
      parameters: 'cmp'
    }];
  };

  Ext_Glyph.getProperties = function getProperties(properties) {
    properties = properties.concat(Ext_Glyph.PROPERTIES());
    return Ext_Base.getProperties(properties);
  };

  Ext_Glyph.getEvents = function getEvents(events) {
    events = events.concat(Ext_Glyph.EVENTS());
    return Ext_Base.getEvents(events);
  };

  _createClass(Ext_Glyph, null, [{
    key: "observedAttributes",
    get: function get() {
      var attrs = _Ext_Base.observedAttributes;
      Ext_Glyph.PROPERTIES().forEach(function (property, index, array) {
        attrs.push(property);
      });
      Ext_Glyph.EVENTS().forEach(function (eventparameter, index, array) {
        attrs.push('on' + eventparameter.name);
      });
      return attrs;
    }
  }]);

  function Ext_Glyph(properties, events) {
    return _Ext_Base.call(this, properties.concat(Ext_Glyph.PROPERTIES()), events.concat(Ext_Glyph.EVENTS())) || this;
  }

  var _proto = Ext_Glyph.prototype;

  _proto.connectedCallback = function connectedCallback() {
    _Ext_Base.prototype.connectedCallback.call(this);
  };

  _proto.attributeChangedCallback = function attributeChangedCallback(attrName, oldVal, newVal) {
    _Ext_Base.prototype.attributeChangedCallback.call(this, attrName, oldVal, newVal);
  };

  return Ext_Glyph;
}(Ext_Base);

export { Ext_Glyph as default };