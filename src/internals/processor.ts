// TODO: Localize (use this.t)
import { CommandInteraction, InteractionResponse, MessageComponentInteraction, ModalSubmitInteraction } from "discord.js";
import DTelClient from "./client";
import config from "../config/config";
import CommandDataInterface, { CommandType } from "../interfaces/commandData";
import { Numbers, Accounts } from "@prisma/client";
import { db } from "../database/db";
import CallClient from "./callClient";
import { fetchNumber, formatShardNumber, getAccount } from "./utils";
import { TFunction } from "i18next";

type ChannelBasedInteraction = CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction;

abstract class Processor {
	config = config;

	client: DTelClient;
	db = db;
	interaction: ChannelBasedInteraction;
	commandData: CommandDataInterface;
	number: Numbers | null = null;
	account: Accounts | null = null;

	call?: CallClient;
	abstract t: TFunction;

	constructor(client: DTelClient, interaction: ChannelBasedInteraction, commandData: CommandDataInterface) {
		this.client = client;
		this.interaction = interaction;
		this.commandData = commandData;
	}

	checkPermissions(): boolean {
		return true;
	}

	permCheckFail(): Promise<InteractionResponse> {
		return this.interaction.reply({
			ephemeral: true,
			embeds: [{
				color: 0xFF0000,
				title: ":x: No permission!",
				description: "You do not have permission run do this.\nGet someone with the `MANAGE_SERVER` permission to run it for you.",
			}],
		});
	}

	abstract run(): void;

	async fetchNumber(number?: string): Promise<Numbers | null> {
		return fetchNumber(number || this.interaction.channelId!);
	}

	async fetchAccount(userID = this.interaction.user.id): Promise<Accounts> {
		let account = await getAccount(userID);

		if (!account) {
			account = await this.db.accounts.create({
				data: {
					id: userID || this.interaction.user.id,
				},
			});
		}

		// We can be sure there's an account here
		return account!;
	}

	async _run(): Promise<void> {
		if (this.commandData.useType === CommandType.call) {
			this.call = this.client.calls.find(c => c.from.channelID === this.interaction.channelId || c.to.channelID === this.interaction.channelId);
			if (!this.call) {
				await this.noCallFound();
				return;
			}
		} else {
			if (this.commandData.numberRequired) {
				this.number = await this.fetchNumber();
				if (!this.number) {
					await this.noNumberFound();
					return;
				}
			}
			if (this.commandData.accountRequired) {
				this.account = await this.fetchAccount();
			}
		}
		this.run();
	}

	noNumberFound(): Promise<InteractionResponse> {
		return this.interaction.reply({
			ephemeral: true,
			embeds: [{
				color: 0xFF0000,
				title: ":x: Error!",
				description: "You need a number to do this. Ask an admin to run `/wizard` to get one.",
			}],
		});
	}

	noCallFound(): Promise<InteractionResponse> {
		return this.interaction.reply({
			ephemeral: true,
			embeds: [this.client.errorEmbed("This command only works when in a call. Why not call someone using `/call`?")],
		});
	}
	noAccount(): Promise<InteractionResponse> {
		return this.interaction.reply({
			embeds: [this.client.errorEmbed("That user doesn't have an account.")],
			ephemeral: true,
		});
	}

	notMaintainer(): Promise<InteractionResponse> {
		return this.interaction.reply({
			embeds: [{
				color: 0xFF0000,
				title: ":x: No permission!",
				description: "You must be a maintainer to execute this command!",
			}],
		});
	}

	guildOnly(): Promise<InteractionResponse> {
		return this.interaction.reply({
			embeds: [this.client.errorEmbed("This command can only be ran in a server!")],
		});
	}

	numberShouldStartWith(): string {
		return this.interaction.guild ? `03${formatShardNumber(Number(process.env.SHARDS))}` : "0900";
	}

	targetUserNotFound(): Promise<InteractionResponse> {
		return this.interaction.reply({
			ephemeral: true,
			embeds: [this.client.errorEmbed(this.t("errors.userNotFound"))],
		});
	}

	notInSupportGuild(): Promise<InteractionResponse> {
		return this.interaction.reply({
			ephemeral: true,
			embeds: [this.client.errorEmbed("This command cannot be ran outside of the support server.")],
		});
	}
}
export default Processor;
