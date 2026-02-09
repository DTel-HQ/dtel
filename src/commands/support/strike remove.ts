import { Strikes } from "@src/database/generated";
import Command from "@src/internals/commandProcessor";
import { getUsername } from "@src/internals/utils";

export default class StrikeRemove extends Command {
	async run(): Promise<void> {
		const strikeID = this.interaction.options.getString("strike_id", true);

		let strike: Strikes;
		try {
			strike = await this.db.strikes.delete({
				where: {
					id: strikeID,
				},
			});
		} catch {
			await this.interaction.reply({
				embeds: [this.client.errorEmbed("Strike could not be removed (make sure it exists).")],
			});
			return;
		}

		const strikeCount = (await this.db.strikes.aggregate({
			where: {
				offender: strike.offender,
			},
			_count: {
				_all: true,
			},
		}))._count._all;

		const offender = await this.client.resolveGuildChannelNumberUser(strike.offender);

		await this.interaction.reply({
			embeds: [{
				color: this.config.colors.success,
				title: "✅ Strike removed",
				description: `Strike removed from **${(offender.user ? getUsername(offender.user) : null) || offender.guild?.name || "Unknown Offender"}** (${strike.offender})`,
				footer: {
					text: `They now have ${strikeCount} ${strikeCount > 1 ? "strikes" : "strike"}`,
				},
			}],
		});
	}
}
