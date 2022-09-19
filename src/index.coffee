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

  + headers

  call = (func, args)=>
    if headers
      h = headers
      headers = undefined
    else
      h = HEADERS
    r = await fetch(
      sdkUrl+func
      method: 'POST'
      body: dump args
      headers: h
    )
    if not [200,304].includes(r.status)
      return Throw r, func, args, call
    bin = await r.arrayBuffer()

    if bin.byteLength
      return unpack new Uint8Array(bin)
    #, { moreTypes:true int64AsNumber:true }
    return

  proxy = (prefix)=>
    new Proxy(
      =>
      get:(_,key)=>
        p = prefix
        if p
          p += '.'
        proxy p+key

      set: (_, key, val)=>
        if not headers
          headers = {...HEADERS}
        headers[key] = val
        true

      apply:(_,self,args)=>
        call prefix, args
    )

  [
    proxy('')
    (s)=>
      sdkUrl = s
      return
  ]

