dump = (args)=>
  {length} = args
  if length
    if length == 1
      [a0] = args
      if not Array.isArray a0
        args = a0
    return JSON.stringify args
  ''

_url = ''

call = (func, args)=>
  r = await fetch(
    _url+func
    method: 'POST'
    body: dump args
    headers:
      'content-type':'json'
  )
  if not r.ok
    throw await r.text()
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

< sdkUrl = (s)=>
  _url = s
  return

export default proxy('')

