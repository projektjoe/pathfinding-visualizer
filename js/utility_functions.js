sumArray = function(a, b) {
    var c = [];
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      c.push((a[i] || 0) + (b[i] || 0));
    }
    return c;
}
arraysEqual = function(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
elementIsInArray = function(Element,Array){
    for (let i =0; i<Array.length; i++){
        if(arraysEqual(Array[i],Element)){
            return i;
        }
    }
    return -1;
}