const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	exec("git pull");
};
