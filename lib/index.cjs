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

var _default = Throw => {
  var HEADERS, _call, _headers, call, conf, proxy, sdkUrl, todo;

  HEADERS = {
    'Content-Type': ''
  };

  _call = async (url, o) => {
    var bin, err, headers, k, r, ref, v, x;
    ({
      headers
    } = o);

    if (headers) {
      ref = Object.entries(HEADERS);

      for (x of ref) {
        [k, v] = x;

        if (!(k in headers)) {
          headers[k] = v;
        }
      }
    } else {
      o.headers = HEADERS;
    }

    try {
      r = await fetch(sdkUrl + url, o);
    } catch (error) {
      err = error;
      return await Throw(err, call, url, o);
    }

    if (![200, 304].includes(r.status)) {
      return await Throw(r, call, url, o);
    }

    bin = await r.arrayBuffer();

    if (bin.byteLength) {
      return (0, _msgpackr.unpack)(new Uint8Array(bin));
    }
  }; //, { moreTypes:true int64AsNumber:true }


  todo = [];

  call = (url, o) => {
    return new Promise((resolve, reject) => {
      return todo.push([url, o, resolve, reject]);
    });
  };

  conf = (url, lang) => {
    var args;
    sdkUrl = url;
    HEADERS['Accept-Language'] = lang || '';
    call = _call;

    for (args of todo) {
      call(...args.slice(0, 2)).then(...args.slice(2));
    }

    todo = [];
  };

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
          _headers = {};
        }

        _headers[key] = val;
        return true;
      },
      apply: (_, self, args) => {
        var h, o;

        if (_headers) {
          h = _headers;
          _headers = void 0;
        }

        o = {
          credentials: 'include',
          headers: h,
          method: 'POST'
        };

        if (args.length) {
          o.body = dump(args);
        }

        return call(prefix, o);
      }
    });
  };

  return [proxy(''), conf];
};

exports.default = _default;