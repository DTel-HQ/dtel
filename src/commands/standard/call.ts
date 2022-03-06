import Command from "../../internals/commandProcessor";
import CallClient from "../../internals/callClient";

export default class Call extends Command {
	async run(): Promise<void> {
		switch (this.interaction.options.getString("number")) {
			case "*233": {
				// TODO: *233
				break;
			}
			case "*411": {
				// TODO: *411
				break;
			}
			default: {
				const callObject = new CallClient(this.client, {
					from: this.number,

					to: this.interaction.options.getString("number"),
					startedBy: this.interaction.user.id,
					random: false,
				});

				try {
					await callObject.initiate();
					this.interaction.reply({
						embeds: [{
							color: this.config.colors.info,
							...this.t("initiated", {
								number: this.interaction.options.getString("number"),
								callID: callObject._id,
							}),
						}],
					});
				} catch (e) {
					// This works as when we error out in CallClient, we return a translation path instead of an error message
					// Feel free to change it
					this.interaction.reply({
						embeds: [this.client.errorEmbed(this.t(`errors.${e.message}`))],
						ephemeral: true,
					});
				}
			}
		}
	}
}
