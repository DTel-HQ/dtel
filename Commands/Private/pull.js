const { exec } = require("child_process");
const { readdir } = require("fs-nextra");

module.exports = async(client, msg, suffix) => {
	exec("git pull");

	const configuration = await readdir("./Configuration/");
	const internals = await readdir("./Internals/");
	const structures = await readdir("./Structures/");

	for (let c of configuration) reload(c);
	for (let i of internals) reload(i);
	for (let s of structures) reload(s);
};
