import Command from "../../internals/commandProcessor";
import CallClient from "../../internals/callClient";
import { MessageEmbedOptions } from "discord.js";

export default class Call extends Command {
	async run(): Promise<void> {
		// Since we're in here, we can assume that there's no call in progress
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
					from: this.number!.number,

					to: this.interaction.options.getString("number", true),
					startedBy: this.interaction.user.id,
					random: false,
				});

				try {
					await callObject.initiate();
					this.interaction.reply({
						embeds: [{
							color: this.config.colors.info,
							...this.t("initiated", {
								number: this.interaction.options.getString("number", true),
								callID: callObject.id,
							}) as MessageEmbedOptions,
						}],
					});
				} catch (e) {
					// This works as when we error out in CallClient, we return a translation path instead of an error message
					// Feel free to change it
					if (e instanceof Error) {
						this.interaction.reply({
							embeds: [this.client.errorEmbed(this.t(`errors.${e.message}`))],
							ephemeral: true,
						});
					} else {
						this.interaction.reply({
							embeds: [this.client.errorEmbed(this.t(`errors.unexpected`))],
							ephemeral: true,
						});
					}
				}
			}
		}
	}
}
