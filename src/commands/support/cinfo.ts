import { ActiveCalls, ArchivedCalls, Numbers } from "@prisma/client";
import { EmbedBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";
import { getUsername } from "../../internals/utils";

type activeOrArchivedCallWithNumbers = (ActiveCalls | ArchivedCalls);

export default class CInfo extends Command {
	async run(): Promise<void> {
		const callID = this.interaction.options.getString("call_id", true);

		let call: activeOrArchivedCallWithNumbers | null = await this.db.activeCalls.findUnique({
			where: {
				id: callID,
			},
			include: {
				from: true,
				to: true,
			},
		});

		if (!call) {
			call = await this.db.archivedCalls.findUnique({
				where: {
					id: callID,
				},
			});
		}

		if (!call) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("Couldn't find a call with that ID")],
			});
			return;
		}

		const from = await this.db.numbers.findUnique({
			where: {
				number: call.fromNum,
			},
		});

		const to = await this.db.numbers.findUnique({
			where: {
				number: call.toNum,
			},
		});


		const startedUser = await this.client.getUser(call.started.by).catch(() => null);
		const pickedUpUser = call.pickedUp?.by ? await this.client.getUser(call.pickedUp.by).catch(() => null) : null;
		const endedUser = call.ended?.by ? await this.client.getUser(call.ended.by).catch(() => null) : null;

		// This looks like shit but works
		const embed = new EmbedBuilder()
			.setColor(this.config.colors.info)
			.setTitle("Call information")
			.setDescription([
				`Showing details for call: \`${callID}\``,
				`Use \`/identify\` to identify the sender of a message.`,
			].join("\n"))
			.addFields([{
				name: "From",
				value: createNumberDetails(from),
				inline: true,
			}, {
				name: "To",
				value: createNumberDetails(to),
				inline: true,
			}, {
				name: "Information",
				value: [
					`**Picked up**:`,
					`- At: ${blockFormat(call.pickedUp?.at.toString() || "N/A")}`,
					`- By: ${blockFormat(call.pickedUp ? `${pickedUpUser ? getUsername(pickedUpUser) : "Unknown"} (${pickedUpUser?.id})` : "N/A")}`,
					`**Ended**:`,
					`- At: ${blockFormat(call.ended?.at.toString() || "N/A")}`,
					`- By: ${blockFormat(call.ended ? `${endedUser ? getUsername(endedUser) : "Unknown"} (${endedUser?.id})` : "N/A")}`,
					`**Random**: ${blockFormat(call.randomCall ? "Yes" : "No")}`,
					// `Transferred by: ${blockFormat(call. ? "Yes" : "No")}`,
					`**Started**:`,
					`- At: ${blockFormat(call.started.at.toString())}`,
					`- By: ${blockFormat(`${startedUser?.tag} (${startedUser?.id})`)}`,
				].join("\n"),
				inline: false,
			}]);

		this.interaction.reply({ embeds: [embed] });
	}
}

const blockFormat = (block: string): string => `\`${block}\``;

const createNumberDetails = (number: Numbers | null): string => {
	if (!number) {
		return `Number has been deleted.`;
	}

	return [
		`**Number**: ${blockFormat(number.number)}`,
		`**Channel**: \`${blockFormat(number.channelID)}\``,
		`**Hidden**: \`${blockFormat(number.vip?.hidden ? `True` : `False`)}\``,
		`**Caller ID**: \`${blockFormat(number.vip?.name || `None`)}\``,
	].join("\n");
};
