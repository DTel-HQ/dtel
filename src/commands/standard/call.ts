import Command from "../../internals/commandProcessor";
import CallClient from "../../internals/callClient";
import { ActionRowBuilder, APIEmbed, ButtonBuilder, ButtonStyle } from "discord.js";

export default class Call extends Command {
	async run(): Promise<void> {
		// Since we're in here, we can assume that there's no call in progress
		switch (this.interaction.options.getString("number", true)) {
			case "*233": {
				// TODO: *233
				break;
			}
			case "*411": {
				// TODO: *411
				break;
			}
			default: {
				await this.interaction.deferReply();

				const callObject = new CallClient(this.client, {
					from: this.number!.number,

					to: this.interaction.options.getString("number", true),
					startedBy: this.interaction.user.id,
					random: false,
				});

				try {
					await callObject.initiate();
					this.interaction.editReply({
						embeds: [{
							color: this.config.colors.info,
							...this.t("initiated", {
								number: this.interaction.options.getString("number", true),
								callID: callObject.id,
							}) as APIEmbed,
						}],
					});
				} catch (e) {
					// This works as when we error out in CallClient, we return a translation path instead of an error message
					// Feel free to change it
					if (e instanceof Error) {
						if (e.message === "otherSideInCall") {
							this.interaction.editReply({
								embeds: [{
									color: this.config.colors.info,
									...this.t("waitPrompt") as APIEmbed,
								}],
								components: [
									new ActionRowBuilder<ButtonBuilder>()
										.addComponents([
											new ButtonBuilder({
												customId: "call-waitAccept",
												label: this.t("waitAccept")!,
												style: ButtonStyle.Primary,
												emoji: "✅",
											}),
											new ButtonBuilder({
												customId: "call-waitDeny",
												label: this.t("waitDeny")!,
												style: ButtonStyle.Secondary,
												emoji: "❌",
											}),
										]),
								],
							});

							setTimeout(() => {
								this.interaction.deleteReply().catch(() => null);
							}, 60000);

							// TODO: Deal with call waiting in some way

							return;
						}

						this.interaction.editReply({
							embeds: [this.client.errorEmbed(this.t(`errors.${e.message}`))],
						});
					} else {
						this.interaction.editReply({
							embeds: [this.client.errorEmbed(this.t(`errors.unexpected`))],
						});
					}
				}
			}
		}
	}
}
