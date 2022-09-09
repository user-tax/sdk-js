var dump;

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

export default (sdkUrl, Throw) => {
  var call, proxy;
  call = async(func, args) => {
    var r, text;
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
    text = (await r.text());
    if (text) {
      return JSON.parse(text);
    }
  };
  proxy = (prefix) => {
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
  return [
    (s) => {
      sdkUrl = s;
    },
    proxy('')
  ];
};
