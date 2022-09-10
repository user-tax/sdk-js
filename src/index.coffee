dump = (args)=>
  {length} = args
  if length
    if length == 1
      [a0] = args
      if not Array.isArray a0
        args = a0
    return JSON.stringify args
  ''

< (Throw,sdkUrl)=>

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
        p = prefix
        if p
          p += '.'
        proxy p+key

      apply:(_,self,args)=>
        call prefix, args
    )


  [
    proxy('')
    (s)=>
      sdkUrl = s
      return
  ]

