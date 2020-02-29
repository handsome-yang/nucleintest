export function UrlSearch(key) {
	let name, value, str = location.href, num = str.indexOf("?"); //取得整个地址栏
	str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
	let arr = str.split("&"); //各个参数放到数组里
	var resStr = ''
	arr.forEach(item => {
		if (item.includes(`${key}=`)) {
			resStr = item.split("=")[1];
		}
	})
	return resStr
}