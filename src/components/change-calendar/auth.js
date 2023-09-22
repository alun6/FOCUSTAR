export function distinct(arr, o) {//去重
    var i, j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i][o] == arr[j][o]) {
                arr.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return arr;
}
export function setShowHideFn(datalist, nodes, key, disabled) { // 树组件---递归处理显示隐藏左侧数据
    const forStr = function (list) {
        for (let i = 0; i < list.length; i++) {
            nodes.map((o) => {
                if (list[i][key] && o[key] == list[i][key]) {
                    list[i].disabled = disabled
                }
            })
            if (list[i].children) {
                forStr(list[i].children)
            }
        }
    }
    forStr(datalist)
}

