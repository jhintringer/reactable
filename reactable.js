Object.prototype.watch = function(prop, fn, originalObj, originalProp) {
    if(typeof prop == 'object') {
        for(var p in prop) {
            if(prop.hasOwnProperty(p)) {
                prop.watch.bind(prop)(p, fn, prop, p);
            }
        }
        return prop;
    } else {
        if(!originalObj) originalObj = this;
        if(!originalProp) originalProp = prop;

        let curVal = this[prop];
        if(typeof curVal == 'object') {
            for(var p in curVal) {
                if(curVal.hasOwnProperty(p)) curVal.watch(p, fn, originalObj, originalProp);
            }
        }
        fn = fn.bind(originalObj);
        let watcher = {};
        watcher[prop] = { 
            get: function() { return curVal; },
            set: function(newVal) { 
                if(curVal == newVal) return;
                if(typeof newVal == 'object') {
                    for(var p in newVal) {
                        if(newVal.hasOwnProperty(p)) newVal.watch(p, fn, originalObj, originalProp);
                    }
                }
                let beforeVal = curVal;
                let before = originalObj[originalProp];
                try { before = JSON.parse(JSON.stringify(before)); } catch(e) {}

                curVal = newVal;

                let after = originalObj[originalProp];
                try { after = JSON.parse(JSON.stringify(after)); } catch(e) {}
                fn(originalProp, before, after, prop, beforeVal, newVal);
            }
        };
        Object.defineProperties(this, watcher);
    }
};