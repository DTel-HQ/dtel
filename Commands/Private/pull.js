const { exec } = require("child_process");
const { readdir } = require("fs-nextra");
const clear = require("clear-module");


module.exports = async(client, msg, suffix) => {
	exec("git pull");

	const configuration = await readdir("./Configuration/");
	const internals = await readdir("./Internals/");
	const structures = await readdir("./Structures/");

	for (let c of configuration) clear(c);
	for (let i of internals) clear(i);
	for (let s of structures) clear(s);
};
