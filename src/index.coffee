dump = (args)=>
  {length} = args
  if length
    if length == 1
      [a0] = args
      if not Array.isArray a0
        args = a0
    return JSON.stringify args
  ''

< (sdkUrl, Throw)=>

  call = (func, args)=>
    r = await fetch(
      sdkUrl+func
      method: 'POST'
      body: dump args
      headers:
        'content-type':'json'
    )
    if not [200,304].includes(r.status)
      return Throw r
    text = await r.text()
    if text
      return JSON.parse text
    return

  proxy = (prefix)=>
    new Proxy(
      =>
      get:(_,key)=>
        if prefix
          prefix += '.'
        proxy prefix+key

      apply:(_,self,args)=>
        call prefix, args
    )


  [
    (s)=>
      sdkUrl = s
      return
    proxy('')
  ]

