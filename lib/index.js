var dump;

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

export default (Throw, sdkUrl) => {
  var call, proxy;
  call = async(func, args) => {
    var bin, r;
    r = (await fetch(sdkUrl + func, {
      method: 'POST',
      body: dump(args),
      headers: {
        'content-type': 'json'
      }
    }));
    if (![200, 304].includes(r.status)) {
      return Throw(r);
    }
    bin = (await r.arrayBuffer());
    if (bin.byteLength) {
      return unpack(new Uint8Array(bin), {
        moreTypes: true,
        int64AsNumber: true
      });
    }
  };
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
      apply: (_, self, args) => {
        return call(prefix, args);
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
