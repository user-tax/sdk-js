"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _msgpackr = require("msgpackr");

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

var _default = (Throw, ...args) => {
  var HEADERS, _headers, call, conf, proxy, sdkUrl;

  HEADERS = {
    'content-type': ''
  };

  conf = (url, lang, id) => {
    var o;
    sdkUrl = url;
    o = {
      'accept-language': lang || ''
    };

    if (id !== location.hostname) {
      o.id = id;
    } else {
      delete HEADERS.id;
    }

    Object.assign(HEADERS, o);
  };

  conf(...args);

  call = async (headers, func, args) => {
    var bin, r;
    r = await fetch(sdkUrl + func, {
      method: 'POST',
      body: dump(args),
      headers
    });

    if (![200, 304].includes(r.status)) {
      return await Throw(r, call, headers, func, args);
    }

    bin = await r.arrayBuffer();

    if (bin.byteLength) {
      return (0, _msgpackr.unpack)(new Uint8Array(bin));
    }
  }; //, { moreTypes:true int64AsNumber:true }


  proxy = prefix => {
    return new Proxy(() => {}, {
      get: (_, key) => {
        var p;
        p = prefix;

        if (p) {
          p += '.';
        }

        return proxy(p + key);
      },
      set: (_, key, val) => {
        if (!_headers) {
          _headers = { ...HEADERS
          };
        }

        _headers[key] = val;
        return true;
      },
      apply: (_, self, args) => {
        var h;

        if (_headers) {
          h = _headers;
          _headers = void 0;
        } else {
          h = HEADERS;
        }

        return call(h, prefix, args);
      }
    });
  };

  return [proxy(''), conf];
};

exports.default = _default;