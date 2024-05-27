// Proxy object
let obj ={
    i : 0
}

// Create your own proxy object which return i+1 every time if its accessed
console.log(obj.i) // 1
console.log(obj.i) // 2
console.log(obj.i) // 3

let proxyObj = new Proxy(obj, {    
    get: function(target, prop) {
        if (prop == 'i'){
            target[prop]+=1;
            return target[prop]
        }
    }
})


console.log(proxyObj.i)
console.log(proxyObj.i)
console.log(proxyObj.i)
