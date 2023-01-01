import { EmbedField } from "discord.js";
import { PermissionLevel } from "../../interfaces/commandData";
import Command from "../../internals/commandProcessor";

export default class Strikes extends Command {
	async run() {
		const offender = this.interaction.options.getString("offender", false) || this.interaction.user.id;

		if (offender != this.interaction.user.id && await this.client.getPerms(this.interaction.user.id) < PermissionLevel.customerSupport) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("You don't have permission to check the strikes of others!")],
			});
			return;
		}

		await this.interaction.deferReply();

		const strikes = await this.db.strikes.findMany({
			where: {
				offender,
			},
		});

		if (strikes.length === 0) {
			this.interaction.editReply({
				embeds: [{
					color: this.config.colors.success,
					title: "✨ Clean!",
					description: "This ID has no strikes!",
				}],
			});
			return;
		}

		const fields: EmbedField[] = [];

		for (const strike of strikes) {
			const staff = await this.client.users.fetch(strike.created.by).catch(() => null) || { tag: "Unknown#0000" };

			fields.push({
				name: `Strike \`${strike.id}\` by ${staff.tag}`,
				value: `• **Reason**: ${truncate(strike.reason, 800) || "No reason provided"}\n• **ID**: ${strike.id}`,
				inline: false,
			});
		}

		await this.interaction.editReply({
			embeds: [{
				color: this.config.colors.yellowbook,
				title: "⚠️ Strikes found!",
				description: `This ${strikes[0].type === "USER" ? "user" : "server"} has ${strikes.length} strike${strikes.length != 1 ? "s" : ""}!`,
				fields,
			}],
		});
	}
}

// Function to truncate a string to a certain length
function truncate(str: string, len: number) {
	if (str.length > len) {
		return `${str.slice(0, len - 3)}...`;
	} else {
		return str;
	}
}
