
const Key = 'goodsdata' 

export function getItem() {
	return localStorage.getItem(Key)
}
//goodid:1,count:1
export function setItem(value) {
	let jsonStr = getItem(Key)
	jsonStr = jsonStr || '[]'
	let jsonObj = JSON.parse(jsonStr)
	jsonObj.push(value)
	localStorage.setItem(Key,JSON.stringify(jsonObj))
}
export function removeItem() {
	
}