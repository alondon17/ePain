export const pather=(obj,path)=>{
    if(typeof path==='string')
    return obj[path]
    var result=obj
    path.forEach(element => {
        result=result[element]
    });
    return result
}