import DTelNumber from "./dtelnumber";
import { ReqlClient } from "rethinkdbdash"

export default class Account {
	constructor(readonly id: Number, account?: object, r: ReqlClient) {
		Object.assign(this, account);
		this.r = r;
	}
	// For my own sake, can you keep constructors at top of files so I can know if they are constructed
	private _balance: number = 100;
	private _frozen: boolean = false;
	private _prefix: string = ">";
	private _status: string = "idle";
	private r?: ReqlClient = undefined;
	public vip: number = 0;

	readonly toStore: any[] = [

	]

	public get balance() {
		return this._balance;
	}

	public freeze(status: string): boolean {
		if (this._frozen) return false;
		this._status = status;
		return this._frozen = true;
	}

	public get number(): DTelNumber {
		return new DTelNumber();//number;
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

	public get transactions(): object[] {
		return this.r.table("Transactions").filter(r.row("fromID").eq(this.id).or(r.row("toID").eq(this.id))).default([]);
	}

	public unfreeze(): void {
		this._frozen = false;
		this._status = "idle";
	}
};
