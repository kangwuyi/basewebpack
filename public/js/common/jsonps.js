/**
 * 清理传送数据
 */
export default function (data) {
    return JSON.parse(JSON.stringify(data));
}