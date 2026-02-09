import config from "@src/config/config";
import { winston } from "@src/instances/winston";
import { putCallOnHold } from "@src/internals/calls/hold/putCallOnHold";
import { unholdCall } from "@src/internals/calls/hold/unholdCall";
import Command from "@src/internals/commandProcessor";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { EmbedBuilder } from "discord.js";

export default class Hold extends Command {
	async run(): Promise<void> {
		// TODO: Real type guards on these classes
		const call = this.call!;

		if (!call.pickedUp) {
			await this.interaction.reply({
				embeds: [this.client.errorEmbed("You can't hold a call that hasn't been picked up yet!")],
			});
			return;
		}

		const baseEmbed = {
			color: config.colors.info,
		};

		const { otherSide } = splitCallSidesByChannel(call, this.interaction.channelId);

		const thisSideEmbed = EmbedBuilder.from(baseEmbed);
		const otherSideEmbed = EmbedBuilder.from(baseEmbed);
		// Hold call
		if (!call.hold.onHold) {
			await putCallOnHold(call, this.interaction.channelId);
			thisSideEmbed.setDescription("You have put the call on hold. Use `/hold` to resume the call.");
			otherSideEmbed.setDescription("The other side have put you on hold. Please wait...");
			winston.silly(`Call ID ${call.id} was put on hold by ${this.interaction.user.username} (${this.interaction.user.id})`);
		} else {
			await unholdCall(call);
			if (call.hold.holdingSide != this.interaction.channelId) {
				await this.interaction.reply({
					embeds: [this.client.errorEmbed("You can't release the hold if you didn't start it!")],
				});
				return;
			}

			thisSideEmbed.setDescription("You have released the hold on this call");
			otherSideEmbed.setDescription("The other side have ended the hold!");

			winston.silly(`Call ID ${call.id} was released from hold by ${this.interaction.user.username} (${this.interaction.user.id})`);
		}

		thisSideEmbed.setTitle(`⏳ Call ${call.hold.onHold ? "held" : "resumed"}`);
		otherSideEmbed.setTitle(`⏳ Call ${call.hold.onHold ? "held" : "resumed"}`);

		// Send the embeds
		await this.interaction.reply({
			embeds: [thisSideEmbed],
		});
		await this.client.sendCrossShard({
			embeds: [otherSideEmbed],
		}, otherSide.channelID);
	}
}
