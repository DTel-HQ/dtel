import { MessageActionRow, MessageButton } from "discord.js";
import Command from "../../internals/commandProcessor";


export default class Eval extends Command {
	async run(): Promise<void> {
		this.interaction.reply({
			embeds: [{
				color: this.config.colors.yellowbook,
				title: "DTel Phone Number Registry",
				description: "📖 Read this before continuing",
				fields: [{
					name: "🧹 This is a roleplay bot!",
					value: "It cannot be used to call real phone numbers.",
				}, { // TODO: Fill in missing segment here
					name: "🏛️ The legal stuff",
					value: `Full documentation is located at ${this.config.siteLink}. \nIt contains important information such as our [Privacy Policy](https://dtel.austinhuang.me/en/latest/Privacy/).`,
				}],
			}],
			components: [
				new MessageActionRow().addComponents(new MessageButton().setLabel("I'm ready!").setCustomId("wizard-ready").setEmoji("✔️").setStyle("PRIMARY")),
			],
		});
	}
}
