module.exports = d => {
	let postData = { data: { } };
	if (d.content) postData.data.content = d.content;
	if (d.embed) postData.data.embed = d.embed;
	return postData;
};
