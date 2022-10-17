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

ContentType = 'Content-Type'

< (Throw)=>
  + sdkUrl
  HEADERS = { }

  conf = (url,lang,id)=>
    sdkUrl = url
    o = {
      'Accept-Language': lang or ''
    }
    if id
      o.id = id
    else
      delete HEADERS.id
    Object.assign HEADERS, o
    return

  call = (url, o)=>
    try
      r = await fetch(url,o)
    catch err
      return await Throw err, call, url, o
    if not [200,304].includes(r.status)
      return await Throw r, call, url, o
    bin = await r.arrayBuffer()
    if bin.byteLength
      return unpack new Uint8Array(bin)
    #, { moreTypes:true int64AsNumber:true }
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
          _headers = {...HEADERS}
        _headers[key] = val
        true

      apply:(_,self,args)=>
        if _headers
          h = _headers
          _headers = undefined
        else
          h = {...HEADERS}
        o = {
          credentials: 'include'
          headers: h
          method: 'POST'
        }
        if args.length
          o.body = dump args
          if ContentType not of h
            h[ContentType] = ''
        call sdkUrl+prefix, o
    )

  [
    proxy('')
    conf
  ]

