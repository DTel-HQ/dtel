import DMNumber from "./dmnumber";
import { util } from "../constants/interfaces";
import { Languages } from "../constants/enums";
import { settings } from "../configuration/config";

/**
* Create an account
* @param {string} id - Account ID
* @param {ReqlClient} r - RDB client
* @param {object?} account - Account data
* @constructor
*/

export default class Account {
	private _balance: number = 100;
	private _frozen: boolean = false;
	private _prefix: string = settings.prefix;
	private _status: string = "idle";
	private _language: keyof typeof Languages = "en";
	public vip: number = 0;
	readonly toStore: any[] = []

	constructor(readonly id: string, private util: util, account?: object) {
		Object.assign(this, account);
	}

	public get balance() {
		return this._balance;
	}

	public get language(): string {
		return this._language;
	}

	public get number(): DMNumber | null {
		return null //not yet
	}

	public get prefix(): string {
		return this._prefix;
	}

	public get status(): string {
		return this._status!;
	}

	public get transactions(): any {
		// TODO: make it an index
		return this.util.db.r.table("Transactions").filter(this.util.db.r.row("fromID").eq(this.id).or(this.util.db.r.row("toID").eq(this.id))).default([]);
	}

	public freeze(status: string): boolean {
		if (this._frozen) return false;
		this._status = status;
		return this._frozen = true;
	}

	public setBalance(amount: number): Account {
		this._balance = amount;
		this.util.db.r!.table("Accounts").get(this.id).update({ _balance: this._balance });
		return this;
	}

	public setLanguage(lang: keyof typeof Languages) {
		this._language = lang;
		this.util.db.r!.table("Accounts").get(this.id).update({ _language: this._language });
	}

	public setPrefix(prefix: string | null): Account {
		if (prefix === null) this._prefix = settings.prefix;
		else this._prefix = prefix;
		this.util.db.r!.table("Accounts").get(this.id).update({ _prefix: this._prefix });
		return this;
	}

	public unfreeze(): Account {
		this._frozen = false;
		this._status = "idle";
		return this;
	}
};
