const arr = [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]
const newArr = []
for(let i =0;i<arr.length;i++){
    if(!newArr.includes(arr[i])){
        newArr.push(arr[i])
    }
}
return newArr

function unique(arr){
    return [...new Set(arr)]
}