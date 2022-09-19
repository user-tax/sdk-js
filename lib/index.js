var HEADERS, dump;

import {
  unpack
} from 'msgpackr';

dump = (args) => {
  var a0, length;
  ({length} = args);
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

HEADERS = {
  'content-type': ''
};

export default (Throw, sdkUrl) => {
  var _headers, call, proxy;
  call = async(func, args, headers) => {
    var bin, r;
    r = (await fetch(sdkUrl + func, {
      method: 'POST',
      body: dump(args)
    }, headers));
    if (![200, 304].includes(r.status)) {
      return Throw(r, func, args, headers, call);
    }
    bin = (await r.arrayBuffer());
    if (bin.byteLength) {
      return unpack(new Uint8Array(bin));
    }
  };
  //, { moreTypes:true int64AsNumber:true }
  proxy = (prefix) => {
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
          _headers = {...HEADERS};
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
        return call(prefix, args, h);
      }
    });
  };
  return [
    proxy(''),
    (s) => {
      sdkUrl = s;
    }
  ];
};
