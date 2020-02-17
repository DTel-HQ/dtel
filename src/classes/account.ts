import DTelNumber from "./dtelnumber";

export default class Account {
	private _balance: Number = 100;
	private _frozen: Boolean = false;
	private _prefix: String = ">";
	private _status: String = "idle";
	public vip: Number = 0;

	readonly toStore: any[] = [

	]

	constructor(readonly id: number, account?: object) {
		Object.assign(this, account);
	}

	public get balance() {
		return this._balance;
	}

	public freeze(status?: String): Boolean {
		if (this._frozen) return false;
		this._status = status;
		return this._frozen = true;
	}

	public get number(): DTelNumber {
		return //number;
	}

	public get prefix(): String {
		return this._prefix;
	}

	public setBalance(amount: Number): Account {
		this._balance = amount;
		r.table("Accounts").get(this.id).update({ balance: this._balance });
		return this;
	}

	public setPrefix(prefix: string): Account {
		this._prefix = prefix;
		r.table("Accounts").get(this.id).update({ prefix: this._prefix });
		return this;
	}

	public get status(): String {
		return this._status;
	}

	public get transactions(): Object[] {
		return r.table("Transactions").filter(r.row("fromID").eq(this.id).or(r.row("toID").eq(this.id))).default([]);
	}

	public unfreeze(): void {
		this._frozen = false;
		this._status = "idle";
	}
};
