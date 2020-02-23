import DMNumber from "./dmnumber";
import { ReqlClient } from "rethinkdbdash"

/**
* Create an account
* @param {string} id - Account ID
* @param {ReqlClient} r - DB instance
* @param {object?} account - Account data
* @constructor
*/

export default class Account {
	private _balance: number = 100;
	private _frozen: boolean = false;
	private _prefix: string = ">";
	private _status: string = "idle";
	public vip: number = 0;
	readonly toStore: any[] = []

	constructor(readonly id: string, private r: ReqlClient, account?: object) {
		Object.assign(this, account);
	}

	public get balance() {
		return this._balance;
	}

	public freeze(status: string): boolean {
		if (this._frozen) return false;
		this._status = status;
		return this._frozen = true;
	}

	public get number(): DMNumber | null {
		return null //not yet
	}

	public get prefix(): string {
		return this._prefix;
	}

	public setBalance(amount: number): Account {
		this._balance = amount;
		this.r!.table("Accounts").get(this.id).update({ balance: this._balance });
		return this;
	}

	public setPrefix(prefix: string): Account {
		this._prefix = prefix;
		this.r!.table("Accounts").get(this.id).update({ prefix: this._prefix });
		return this;
	}

	public get status(): string {
		return this._status!;
	}

	public get transactions(): any {
		return this.r.table("Transactions").filter(this.r.row("fromID").eq(this.id).or(this.r.row("toID").eq(this.id))).default([]);
	}

	public unfreeze(): Account {
		this._frozen = false;
		this._status = "idle";
		return this;
	}
};
