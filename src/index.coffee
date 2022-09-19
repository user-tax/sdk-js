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

HEADERS = { 'content-type':'' }

< (Throw,sdkUrl)=>

  call = (func, args, headers)=>
    r = await fetch(
      sdkUrl+func
      method: 'POST'
      body: dump args
      headers
    )
    if not [200,304].includes(r.status)
      return Throw r, call, headers, func, args
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
          h = HEADERS
        call prefix, args, h
    )

  [
    proxy('')
    (s)=>
      sdkUrl = s
      return
  ]

