// 全局数据补0
// 全局格式化时间
window.formatDate = function (str) {
    // 把字符串格式的日期转换为对象形式
    const date = new Date(str)
    // 基于日期对象可以获取年月日时分秒

    // 获取的年份
    const year = date.getFullYear()
    // 获取的月份
    const month = padZero(date.getMonth() + 1)
    // 获取的日期
    const day = padZero(date.getDate())
    // 获取的小时
    const hours = padZero(date.getHours())
    // 获取的分钟
    const Minutes = padZero(date.getMinutes())
    // 拼接日期
    return year + '-' + month + '-' + day + ' ' + hours + ':' + Minutes
}

// 补零函数
function padZero(n) {
    if (n < 10) {
        return '0' + n
    } else {
        return n
    }
}