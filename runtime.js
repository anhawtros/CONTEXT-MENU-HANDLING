a = {runtime: {
  onMessage: (e => ({
    addListener(r, t, ...s) {
      r.addListener(e.get(t), ...s)
    }, hasListener: (r, t) => 
    r.hasListener(e.get(t)), removeListener(r, t) {
      r.removeListener(e.get(t))}
  })) (new class extends WeakMap {
    constructor(e, r) {
      super(r), this.createItem = e
    } get(e) {
      return this.has(e) || 
        this.set(e,this.createItem(e)), 
        super.get(e)}
  } (e => 'function' != 
       typeof e ? e : 
       function(r, t, s) {
  let n = e(r, t); 
     if((e => e && 'object' == 
     typeof e && 'function' == 
     typeof e.then)(n)) 
     return n.then
     (s, e=> {
       console.error(e), s(e)
     }), !0; 
void 0 !== 
  n && s(n)}))}};