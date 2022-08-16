const $ = (s) => {
    return document.querySelector(s)
}
const $all = (s) => {
    return document.querySelectorAll(s)
}
const shuffle = (arr) => {
    let j, temp
    for(let i = arr.length - 1; i > 0; i --){
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
    return arr
}
export {$, $all, shuffle}