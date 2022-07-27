import { Numbers } from "@prisma/client";
import { EmbedBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class CInfo extends Command {
	async run(): Promise<void> {
		const callID = this.interaction.options.getString("call_id", true);

		const call = await this.db.calls.findUnique({
			where: {
				id: callID,
			},
			include: {
				from: true,
				to: true,
			},
		});

		if (!call) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("Couldn't find a call with that ID")],
			});
			return;
		}

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
				value: createNumberDetails(call.from),
				inline: true,
			}, {
				name: "To",
				value: createNumberDetails(call!.to),
				inline: true,
			}, {
				name: "Information",
				value: [
					`**Picked up**:`,
					`- At: ${blockFormat(call.pickedUp?.at.toString() || "N/A")}`,
					`- By: ${blockFormat(call.pickedUp ? `${pickedUpUser?.tag} (${pickedUpUser?.id})` : "N/A")}`,
					`**Ended**:`,
					`- At: ${blockFormat(call.ended?.at.toString() || "N/A")}`,
					`- By: ${blockFormat(call.ended ? `${endedUser?.tag} (${endedUser?.id})` : "N/A")}`,
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
