var _url, call, dump, proxy;

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

_url = '';

call = async(func, args) => {
  var r, text;
  r = (await fetch(_url + func, {
    method: 'POST',
    body: dump(args),
    headers: {
      'content-type': 'json'
    }
  }));
  if (!r.ok) {
    throw (await r.text());
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

export const sdkUrl = (s) => {
  _url = s;
};

export default proxy('');
