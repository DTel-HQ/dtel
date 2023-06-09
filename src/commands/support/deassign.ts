import { Numbers } from "@prisma/client";
import Command from "../../internals/commandProcessor";
import { parseNumber } from "../../internals/utils";

export default class Deassign extends Command {
	async run(): Promise<void> {
		await this.interaction.deferReply();

		const numberToDeassign = parseNumber(this.interaction.options.getString("number_or_channel", true));

		let number: Numbers | null;
		if (numberToDeassign.length > 11) {
			number = await this.db.numbers.findUnique({
				where: {
					channelID: numberToDeassign,
				},
			});
		} else {
			number = await this.db.numbers.findUnique({
				where: {
					number: numberToDeassign,
				},
			});
		}

		if (!number) {
			this.interaction.editReply({
				embeds: [this.client.errorEmbed("Couldn't find that number.")],
			});
			return;
		}

		try {
			const res = await this.client.deleteNumber(number.number);

			if (res === false) throw new Error();
		} catch {
			this.interaction.editReply({
				embeds: [this.client.errorEmbed("Couldn't delete that number.")],
			});
			return;
		}

		this.interaction.editReply({
			embeds: [{
				color: this.config.colors.success,
				author: {
					name: this.userDisplayName,
					icon_url: this.interaction.user.displayAvatarURL(),
				},
				title: "R.I.P",
				description: `\`${number.number}\` has been deassigned.`,
			}],
		});
	}
}
