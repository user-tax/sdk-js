var ContentType, dump;

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

ContentType = 'Content-Type';

export default (Throw) => {
  var HEADERS, _headers, call, conf, proxy, sdkUrl;
  HEADERS = {};
  conf = (url, lang, id) => {
    var o;
    sdkUrl = url;
    o = {
      'Accept-Language': lang || ''
    };
    if (id) {
      o.id = id;
    } else {
      delete HEADERS.id;
    }
    Object.assign(HEADERS, o);
  };
  call = async(url, o) => {
    var bin, err, r;
    try {
      r = (await fetch(url, o));
    } catch (error) {
      err = error;
      return (await Throw(err, call, url, o));
    }
    if (![200, 304].includes(r.status)) {
      return (await Throw(r, call, url, o));
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
        var h, o;
        if (_headers) {
          h = _headers;
          _headers = void 0;
        } else {
          h = {...HEADERS};
        }
        o = {
          credentials: 'include',
          headers: h,
          method: 'POST'
        };
        if (args.length) {
          o.body = dump(args);
          if (!(ContentType in h)) {
            h[ContentType] = '';
          }
        }
        return call(sdkUrl + prefix, o);
      }
    });
  };
  return [proxy(''), conf];
};
