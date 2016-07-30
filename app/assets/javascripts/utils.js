function amountFormat(amount) {
    return '$ ' + Number(amount).toLocaleString();
}

function orderInAsc(list, key) {
    var result = list.sort(function (a, b) {
        if (a[key] > b[key]) {
            return 1;
        } else if (a[key] < b[key]) {
            return -1;
        }
        return 0;
    });

    return result;
}

function orderInDesc(list, key) {
    var result = list.sort(function (a, b) {
        if (a[key] > b[key]) {
            return -1;
        } else if (a[key] < b[key]) {
            return 1;
        }
        return 0;
    });
    
    return result;
}
