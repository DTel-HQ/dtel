import PayCommonFunctions from "./pay common";

export default class Pay extends PayCommonFunctions {
	async run(): Promise<void> {
		const userID = this.interaction.options.getString("id", true);

		const user = await this.client.getUserOrNull(userID);

		if (!user) {
			await this.interaction.reply({
				embeds: [this.client.errorEmbed(this.t("userNotFound"))],
			});
			return;
		}

		const account = await this.fetchAccount(userID);

		return this.payUser(account, user);
	}
}
