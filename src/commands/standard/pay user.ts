import PayCommonFunctions from "./pay common";

export default class Pay extends PayCommonFunctions {
	async run(): Promise<void> {
		const user = this.interaction.options.getUser("user", true);

		const account = await this.fetchAccount(user.id);

		return this.payUser(account, user);
	}
}
