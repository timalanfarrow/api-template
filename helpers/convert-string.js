module.exports = {
	snakeToCamel : v => v.replace( /_\w/g, m => m[1].toUpperCase() ),
	camelToSnake : v => v.replace( /[A-Z]/g, m => `_${m.toLowerCase()}` ),
};
