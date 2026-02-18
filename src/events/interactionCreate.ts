import {
	CommandInteraction,
	MessageComponentInteraction,
	ModalSubmitInteraction,
	Interaction,
	SnowflakeUtil,
	InteractionType,
	PermissionsBitField,
	ChatInputCommandInteraction,
	ApplicationCommandOptionType,
} from "discord.js";
import Commands from "@src/config/commands";
import Command, { CommandType, PermissionLevel, SubcommandData } from "@src/interfaces/commandData";
import Constructable from "@src/interfaces/constructable";
import DTelClient from "@src/internals/client";
import Processor, { ChannelBasedInteraction } from "@src/internals/processor";
import i18n, { getFixedT } from "i18next";
import { winston } from "@src/instances/winston";
import config from "@src/config/config";
import { getCallByChannel } from "@src/internals/calls/db/get-by-channel/GetCallByChannel";
import { isBlacklisted } from "@src/redis/operations/blacklist/GetBlacklistFromCache";

// Call interactions
import Call233Open from "@src/interactions/call/233-open";
import Call233Renew from "@src/interactions/call/233-renew";
import Call411ManageAddModal from "@src/interactions/call/411-manage-add-modal";
import Call411ManageDeleteCancel from "@src/interactions/call/411-manage-delete-cancel";
import Call411ManageDeleteConfirm from "@src/interactions/call/411-manage-delete-confirm";
import Call411ManageEditModal from "@src/interactions/call/411-manage-edit-modal";
import Call411ManageSelector from "@src/interactions/call/411-manage-selector";
import Call411SearchExit from "@src/interactions/call/411-search-exit";
import Call411SearchModalSubmit from "@src/interactions/call/411-search-modal-submit";
import Call411SearchNext from "@src/interactions/call/411-search-next";
import Call411SearchPrev from "@src/interactions/call/411-search-prev";
import Call411SearchSearch from "@src/interactions/call/411-search-search";
import Call411Selector from "@src/interactions/call/411-selector";
import Call411VipCustomnameModalSubmit from "@src/interactions/call/411-vip-customname-modal-submit";
import Call411VipHideSelector from "@src/interactions/call/411-vip-hide-selector";
import Call411VipSelector from "@src/interactions/call/411-vip-selector";
import Call411VipUpgradeLength from "@src/interactions/call/411-vip-upgrade-length";
import CallHangup from "@src/interactions/call/hangup";
import CallPickup from "@src/interactions/call/pickup";

// Mailbox interactions
import MailboxClearConfirm from "@src/interactions/mailbox/clear/confirm";
import MailboxDeleteSelect from "@src/interactions/mailbox/delete/select";
import MailboxMessagesNext from "@src/interactions/mailbox/messages/next";
import MailboxMessagesPrev from "@src/interactions/mailbox/messages/prev";
import MailboxSendInitiate from "@src/interactions/mailbox/send/initiate";
import MailboxSendModal from "@src/interactions/mailbox/send/modal";
import MailboxSettingsUpdate from "@src/interactions/mailbox/settings/update";

// Mention interactions
import MentionRemoveSelector from "@src/interactions/mention/remove/selector";

// Wizard interactions
import WizardModalSubmit from "@src/interactions/wizard/modalSubmit";
import WizardReady from "@src/interactions/wizard/ready";

// Static mapping of interaction paths to processor classes
const INTERACTION_PROCESSORS: Record<string, Constructable<Processor<ChannelBasedInteraction>>> = {
	// Call interactions
	"call/233-open": Call233Open,
	"call/233-renew": Call233Renew,
	"call/411-manage-add-modal": Call411ManageAddModal,
	"call/411-manage-delete-cancel": Call411ManageDeleteCancel,
	"call/411-manage-delete-confirm": Call411ManageDeleteConfirm,
	"call/411-manage-edit-modal": Call411ManageEditModal,
	"call/411-manage-selector": Call411ManageSelector,
	"call/411-search-exit": Call411SearchExit,
	"call/411-search-modal-submit": Call411SearchModalSubmit,
	"call/411-search-next": Call411SearchNext,
	"call/411-search-prev": Call411SearchPrev,
	"call/411-search-search": Call411SearchSearch,
	"call/411-selector": Call411Selector,
	"call/411-vip-customname-modal-submit": Call411VipCustomnameModalSubmit,
	"call/411-vip-hide-selector": Call411VipHideSelector,
	"call/411-vip-selector": Call411VipSelector,
	"call/411-vip-upgrade-length": Call411VipUpgradeLength,
	"call/hangup": CallHangup,
	"call/pickup": CallPickup,
	// Mailbox interactions
	"mailbox/clear/confirm": MailboxClearConfirm,
	"mailbox/delete/select": MailboxDeleteSelect,
	"mailbox/messages/next": MailboxMessagesNext,
	"mailbox/messages/prev": MailboxMessagesPrev,
	"mailbox/send/initiate": MailboxSendInitiate,
	"mailbox/send/modal": MailboxSendModal,
	"mailbox/settings/update": MailboxSettingsUpdate,
	// Mention interactions
	"mention/remove/selector": MentionRemoveSelector,
	// Wizard interactions
	"wizard/modalSubmit": WizardModalSubmit,
	"wizard/ready": WizardReady,
};

export const interactionCreateHandler = async(client: DTelClient, _interaction: Interaction): Promise<void> => {
	const interaction = _interaction as CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction;

	const t = getFixedT(interaction.locale, "events.interactionCreate");

	if (await isBlacklisted(interaction.user.id)) {
		await interaction.reply(i18n.t("errors.blacklisted", {
			lng: interaction.locale,
		}));
		return;
	}

	const call = interaction.channelId ? await getCallByChannel(interaction.channelId) : null;

	let commandName: string;
	let processor: Constructable<Processor<ChannelBasedInteraction>>;
	let commandData: Command;
	let permissionLevel: PermissionLevel = PermissionLevel.none;

	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			const typedInteraction = interaction as ChatInputCommandInteraction;

			commandName = typedInteraction.commandName;
			const cmd = Commands.find(c => c.name === commandName);
			if (!cmd) throw new Error(`Could not find command data for command ${commandName}`);
			commandData = cmd;

			if (commandData.notExecutableInCall && call) {
				await interaction.reply({
					embeds: [client.errorEmbed(i18n.t("errors.notExecutableInCall"))],
				});
				return;
			}


			const subCommand = typedInteraction.options.getSubcommand(false);
			if (subCommand) {
				const subData = commandData.options?.find(o => o.name === subCommand) as SubcommandData | null;
				if (!subData) throw new Error();

				processor = subData.processor ?? commandData.processor;

				commandName = `${commandName} ${subCommand}`;
				permissionLevel = subData.permissionLevel;
			} else {
				processor = commandData.processor;
				permissionLevel = commandData.permissionLevel;
			}

			break;
		}
		case InteractionType.MessageComponent:
		case InteractionType.ModalSubmit: {
			const typedInteraction = interaction as MessageComponentInteraction|ModalSubmitInteraction;

			if (interaction.type === InteractionType.ModalSubmit && interaction.message?.interaction && interaction.message?.interaction?.user.id != interaction.user.id) {
				await interaction.reply(t("errors.wrongUser"));
				return;
			}

			// Interaction expiry after 2 minutes
			if (typedInteraction.message && (Date.now() - SnowflakeUtil.timestampFrom(typedInteraction.message.id)) > (2 * 60 * 1000)) {
				await interaction.reply({
					content: i18n.t("events.interactionCreate.errors.expiredInteraction", { lng: interaction.locale }),
					ephemeral: true,
				});

				return;
			}

			const split = typedInteraction.customId.split("-");
			if (split.length < 2) {
				await interaction.reply({
					embeds: [client.errorEmbed(i18n.t("errors.unexpected", { lng: interaction.locale }))],
					ephemeral: true,
				});
				winston.error(`Message component interaction custom ID not valid.`);
				return;
			}

			commandName = split[0];
			let interactionName: string = split.slice(1, split.length).join("-");

			if (commandName.startsWith("dtelnoreg")) return;

			const cmd = Commands.find(c => c.name === commandName);
			if (!cmd) throw new Error(`Could not find command data for command ${commandName}`);
			commandData = cmd;

			const subCommand = cmd.options?.filter(o => o.type === ApplicationCommandOptionType.Subcommand) as SubcommandData[] | null;

			let processorPath: string;
			if (subCommand && subCommand.length > 0) {
				commandName = `${split[0]} ${split[1]}`;
				interactionName = split[2];

				permissionLevel = subCommand.find(c => c.name == split[1])?.permissionLevel || PermissionLevel.none;
				processorPath = `${split[0]}/${split[1]}/${interactionName}`;
			} else {
				permissionLevel = commandData.permissionLevel;
				processorPath = `${split[0]}/${interactionName}`;
			}

			const paramsToSend: string[] = [];

			if (interactionName.includes("-params-")) {
				const paramSplit = interactionName.split("-params-");
				interactionName = paramSplit[0];
				const params = paramSplit[1];

				if (params) {
					const parsedParams = params.split("-");
					for (let i = 0; i < parsedParams.length; i++) {
						paramsToSend.push(parsedParams[i]);
					}
				}
				// Rebuild processor path without params
				if (subCommand && subCommand.length > 0) {
					processorPath = `${split[0]}/${split[1]}/${interactionName}`;
				} else {
					processorPath = `${split[0]}/${interactionName}`;
				}
			}

			commandData.params = paramsToSend;

			// Get processor from static mapping
			processor = INTERACTION_PROCESSORS[processorPath];
			if (!processor) {
				throw new Error(`Could not find processor for interaction path: ${processorPath}`);
			}
		}
	}

	commandData = commandData!; // It definitely exists if it got this far
	if (commandData.useType === CommandType.call && !call) {
		await interaction.reply({
			embeds: [client.errorEmbed(i18n.t("errors.onlyExecutableInCall"))],
		});
		return;
	}

	const processorClass = new processor(client, interaction, commandData);
	try {
		const userPermissions = await client.getPerms(interaction.user.id);
		// Bypass checks if ran by a maintainer
		if (userPermissions != PermissionLevel.maintainer) {
			switch (permissionLevel) {
				case PermissionLevel.maintainer: {
					if (userPermissions != PermissionLevel.maintainer) {
						await processorClass.notMaintainer();
						return;
					}
					break;
				}
				case PermissionLevel.customerSupport: {
					if (userPermissions as number < PermissionLevel.customerSupport) {
						await processorClass.permCheckFail();
						return;
					}
					if (interaction.guildId !== config.supportGuild.id && !config.devMode) {
						await processorClass.notInSupportGuild();
						return;
					}
					break;
				}
				case PermissionLevel.serverAdmin: {
					if (!(interaction.member!.permissions as PermissionsBitField).has(PermissionsBitField.Flags.ManageGuild)) {
						await processorClass.permCheckFail();
						return;
					}
					break;
				}
			}
		}

		await processorClass._run();
	} catch (_err) {
		const err = _err as Error;
		winston.error(`Error occurred whilst executing interaction for/from command: ${commandName!}`, err.stack);
		await interaction.reply({
			embeds: [client.errorEmbed(i18n.t("errors.unexpected", { lng: interaction.locale }))],
		});
	}
};

