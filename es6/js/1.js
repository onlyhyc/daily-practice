let name = Symbol();
{
	var person = {};
	person[name] = "1";
	console.log(person[name]);
}
{
	let name = Symbol();
	person[name] = "2";
	console.log(person[name]);
}
	console.log(person[name]);