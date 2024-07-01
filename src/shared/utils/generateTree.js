/* eslint-disable */
function generateTree(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parent_id';
    if (!childrenAttr) childrenAttr = 'children';

    var treeList = [];
    var lookup = {};
    list.forEach(function(obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function(obj) {
        if (obj[parentAttr] != null) {
            if (lookup[obj[parentAttr]] !== undefined) {
                lookup[obj[parentAttr]][childrenAttr].push(obj);
            } else {
                 //console.log('Missing Parent Data: ' + obj[parentAttr]);
                 treeList.push(obj);
            }               
        } else {
            treeList.push(obj);
        }
    });
    //remove children = []
    removeChildren(treeList, idAttr, parentAttr, childrenAttr);
    
    return treeList;
};
//remove children = []
function removeChildren(treeList, idAttr, parentAttr, childrenAttr){
    treeList.forEach(obj=>{
        if(obj[childrenAttr].length===0){
            obj[childrenAttr] = null;
        }else{
            removeChildren(obj[childrenAttr],idAttr, parentAttr, childrenAttr);
        }
    })
}

//https://stackoverflow.com/questions/46847573/building-tree-array-of-objects-from-flat-array-of-objects
function createTree (data, root, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parent_id';
    if (!childrenAttr) childrenAttr = 'children';

    var r = [], o = {};
    data.forEach(function (a) {
        if (o[a[idAttr]] && o[a[idAttr]][childrenAttr]) {
            a[childrenAttr] = o[a[idAttr]] && o[a[idAttr]][childrenAttr];
        }
        o[a[idAttr]] = a;
        if (a[parentAttr] === root) {
            r.push(a);
        } else {
            o[a[parentAttr]] = o[a[parentAttr]] || {};
            o[a[parentAttr]][childrenAttr] = o[a[parentAttr]][childrenAttr] || [];
            o[a[parentAttr]][childrenAttr].push(a);
        }
    });
    return r;
}

function generateTreePrime(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parent_id';
    if (!childrenAttr) childrenAttr = 'children';

    var treeList = [];
    var lookup = {};
    list.forEach(function(obj) {
        lookup[obj[idAttr]] = obj;
        lookup['key'] = obj[idAttr];
        lookup['data'] = obj;
        obj[childrenAttr] = [];
        obj['data'] = Object.assign({},obj);
        obj['data'][childrenAttr]=[]
    });
    
    list.forEach(function(obj) {
        
        if (obj[parentAttr] != null) {
            if (lookup[obj[parentAttr]] !== undefined) {
                lookup[obj[parentAttr]][childrenAttr].push(obj);
            } else {
                 //console.log('Missing Parent Data: ' + obj[parentAttr]);
                treeList.push(obj);
            }               
        } else {
            
            treeList.push(obj);
        }
    });
    //remove children = []
    removeChildren(treeList, idAttr, parentAttr, childrenAttr);
    
    return treeList;
};


export { generateTree, createTree, generateTreePrime };