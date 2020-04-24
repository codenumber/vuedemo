
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
export function removeItem(id) {
	let arr = JSON.parse(getItem()) || []
	for (let i = arr.length - 1;i >= 0; i --) {
		if (arr[i].goodsId == id) {
			arr.splice(i,1)
		}
	}
	console.log(arr)
	localStorage.setItem(Key,JSON.stringify(arr))
}
export function getGoodsObj() {
	let data = JSON.parse(getItem()) || []
	let obj = {}
	for (let i = 0;i < data.length; i++) {
		let item = data[i]
		if (!obj[item.goodsId]) {
			obj[item.goodsId] = parseInt(item.goodsCount)
		} else {
			obj[item.goodsId] = obj[item.goodsId] + parseInt(item.goodsCount)
		}
	}
	return obj
}
export function upDataLocalSg(obj) {
	let arr = JSON.parse(getItem())
	console.log(arr)
	if (obj.type == "add") {
		arr.push({goodsId: obj.goodsid,goodsCount: 1})
	} else {
		for (let i = 0;i < arr.length; i++) {
			let item = arr[i]
			if(item.goodsId == obj.goodsid) {
				if (item.goodsCount > 1) {
					item.goodsCount --
					break
				} else {
					arr.splice(item,1)
					break
				}
			}
		}
	}
	localStorage.setItem(Key,JSON.stringify(arr))
}