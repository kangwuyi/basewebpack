/**
 * 二分法遍历数组
 * 时间复杂度:O(log2n)
 */

export default function (arr, target) {
    var src;
    for(let i =0;i<arr.length;i++){
        if(('' + Object.keys(arr[i])[0]) === target){
            src =  Object.values(arr[i])[0];
        }
    }
    return src;
}

function test (arr, target) {
    let s = 0;
    let e = arr.length - 1;
    let m = Math.floor((s + e) / 2);
    let sortTag = arr[s] <= arr[e];//确定排序顺序

    while (s < e && ('' + Object.keys(arr[m])[0]) !== target) {
        console.log('--start')
        console.log(('' + Object.keys(arr[m])[0]))
        console.log(target)
        console.log(('' + Object.keys(arr[m])[0]) !== target)
        console.log('--end')
        if (arr[m] > target) {
            sortTag && (e = m - 1);
            !sortTag && (s = m + 1);
        } else {
            !sortTag && (e = m - 1);
            sortTag && (s = m + 1);
        }
        m = Math.floor((s + e) / 2);
    }
console.log(arr[m])
    if (('' + Object.keys(arr[m])[0]) === target) {
        console.log('找到了,位置%s');
        return Object.values(arr[m])[0];
    } else {
        console.log('没找到');
        return -1;
    }

}
