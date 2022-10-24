const arrayEquals = (arr1,arr2) => {
    let a = [ ...arr1 ];
    let b = [ ...arr2 ];
    if(a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

export default arrayEquals