import { PermissionLevel } from "@src/interfaces/commandData";
import config from "@src/config/config";

const { callPhones } = config;

export const getPhone = (level: PermissionLevel): string => {
	switch (level) {
		default: {
			return callPhones.default;
		}

		case PermissionLevel.donator: {
			return callPhones.donator;
		}

		case PermissionLevel.serverAdmin: {
			return callPhones.admin;
		}

		case PermissionLevel.maintainer:
		case PermissionLevel.customerSupport: {
			return callPhones.support;
		}

		case PermissionLevel.contributor: {
			return callPhones.contributor;
		}
	}
};
