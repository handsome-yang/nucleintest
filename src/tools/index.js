export function UrlSearch(key) {
	let name, value, str = location.href, num = str.indexOf("?");
	str = str.substr(num + 1); 
	let arr = str.split("&");
	var resStr = ''
	arr.forEach(item => {
		if (item.includes(`${key}=`)) {
			resStr = item.split("=")[1];
		}
	})
	return resStr
}