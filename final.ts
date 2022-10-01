import { createWriteStream } from "fs";

const onReady = () => {
	const chan = await client.channels.fetch("401779881135964170") as VoiceChannel;
	const conn = await joinVoiceChannel({
		adapterCreator: chan.guild.voiceAdapterCreator,
		channelId: chan.id,
		guildId: chan.guildId,
	});

	const data: incomingData[] = [];

	conn.receiver.speaking.on("start", userID => {
		console.log(`${userID} started speaking`);
		const stream = conn.receiver.subscribe(userID, {
			autoDestroy: true,
			end: {
				behavior: EndBehaviorType.AfterInactivity,
				duration: 100,
			},
		});

		const opusDecoder = new opus.Decoder({ rate: 48000, channels: 2, frameSize: 20 });
		stream.pipe(opusDecoder);

		console.log("decoding");

		data.push({
			decoder: opusDecoder,
			userID: userID,
		});

		opusDecoder.on("end", () => {
			console.log(`${userID} ended, removing`);
			const toRemove = data.find(d => d.userID === userID);
			if (toRemove && data.indexOf(toRemove) > 0) data.splice(data.indexOf(toRemove), 1);
		});
	});

	const outStrm = createWriteStream(`${__dirname}/../../output.pcm`);

	// eslint-disable-next-line no-unmodified-loop-condition
	setInterval(() => {
		if (data.find(d => d.decoder.readable)) {
		// const outputArr = Buffer.alloc(3840);
			const ready = data.filter(d => d.decoder.readable);
			const sources: Int16Array[] = [];

			for (const i of ready) {
				const val: Int16Array = new Int16Array(i.decoder.read());
				if (!val) continue;
				sources.push(val);
			}

			const maxLength = sources.reduce((max, source) => Math.max(max, source.length), 0);
			const outputArray = new Int16Array(maxLength);
			const sourcesCount = sources.length;

			for (const source of sources) {
				for (let i = 0; i < source.length; i++) {
					outputArray[i] = safeInt((outputArray[i] || 0) + (source[i] / sourcesCount));
				}
			}
			// for (const array of arrays) {
			// 	for (let i = 0; i < outputArr.length; i++) outputArr[i] += array[i];
			// }

			outStrm.write(Buffer.from(outputArray));
		}
	}, 20);
};

interface incomingData {
	userID: string,
	decoder: Readable
}

const safeInt = (int: number): number => Math.min(Math.max(int, -32768), 32767);
