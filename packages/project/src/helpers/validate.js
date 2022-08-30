function isString(data, allowNull = false) {
	return allowNull
		? typeof data === 'string'
			? true
			: false
		: typeof data === 'string' && data !== ''
		? true
		: false;
}

function isNumber(data, allowNull = false) {
	return allowNull
		? typeof data === 'number'
			? true
			: false
		: typeof data === 'number' && data !== ''
		? true
		: false;
}

function isBoolean(data) {
	return typeof data === 'boolean' ? true : false;
}

function isObject(data, allowEmpty = false) {
	return allowEmpty
		? typeof data === 'object' && !Array.isArray(data)
			? true
			: false
		: typeof data === 'object' &&
		  !Array.isArray(data) &&
		  Object.keys(data).length !== 0
		? true
		: false;
}

function isArray(data, allowEmpty) {
	return allowEmpty
		? Array.isArray(data)
			? true
			: false
		: Array.isArray(data) && data.length !== 0
		? true
		: false;
}

export default {
	isArray,
	isBoolean,
	isNumber,
	isObject,
	isString,
};
