> msgpackr > unpack

dump = (args)=>
  {length} = args
  if length
    if length == 1
      [a0] = args
      if not Array.isArray a0
        args = a0
    return JSON.stringify args
  ''

< (Throw)=>
  + sdkUrl

  HEADERS = {
    'Content-Type':''
  }

  call = (url, o)=>
    {headers} = o
    if headers
      for [k,v] from Object.entries HEADERS
        if k not of headers
          headers[k]=v
    else
      o.headers = HEADERS
    try
      r = await fetch(sdkUrl+url,o)
    catch err
      return await Throw err, call, url, o
    if not [200,304].includes(r.status)
      return await Throw r, call, url, o
    bin = await r.arrayBuffer()
    if bin.byteLength
      return unpack new Uint8Array(bin)
    #, { moreTypes:true int64AsNumber:true }
    return

  init = (url,lang)=>
    confLang lang
    sdkUrl = url
    return

  confLang = (lang)=>
    HEADERS['Accept-Language'] = lang or ''
    return

  + _headers

  proxy = (prefix)=>
    new Proxy(
      =>
      get:(_,key)=>
        p = prefix
        if p
          p += '.'
        proxy p+key

      set: (_, key, val)=>
        if not _headers
          _headers = {}
        _headers[key] = val
        true

      apply:(_,self,args)=>
        if _headers
          h = _headers
          _headers = undefined
        o = {
          credentials: 'include'
          headers: h
          method: 'POST'
        }
        if args.length
          o.body = dump args
        call prefix, o
    )

  [
    proxy('')
    init
    confLang
  ]

