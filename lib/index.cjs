"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var dump;

dump = args => {
  var a0, length;
  ({
    length
  } = args);

  if (length) {
    if (length === 1) {
      [a0] = args;

      if (!Array.isArray(a0)) {
        args = a0;
      }
    }

    return JSON.stringify(args);
  }

  return '';
};

var _default = (Throw, sdkUrl) => {
  var call, proxy;

  call = async (func, args) => {
    var r, text;
    r = await fetch(sdkUrl + func, {
      method: 'POST',
      body: dump(args),
      headers: {
        'content-type': 'json'
      }
    });

    if (![200, 304].includes(r.status)) {
      return Throw(r);
    }

    text = await r.text();

    if (text) {
      return JSON.parse(text);
    }
  };

  proxy = prefix => {
    return new Proxy(() => {}, {
      get: (_, key) => {
        if (prefix) {
          prefix += '.';
        }

        return proxy(prefix + key);
      },
      apply: (_, self, args) => {
        return call(prefix, args);
      }
    });
  };

  return [proxy(''), s => {
    sdkUrl = s;
  }];
};

exports.default = _default;