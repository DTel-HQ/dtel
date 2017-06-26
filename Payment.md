# Lottery!
You can type `>lottery <Number of entries>` to enter the lottery. The draw is at Eastern Time 01:00 AM everyday. Each entry cost 5 credits and the money goes into the jackpot.

# How do I renew my number?

## Payment bots do not work due to a patch in Discord's algorithm disabling bot-to-bot DM's
## Payment bots

| Bot Name                                         | Tax Rate |
|--------------------------------------------------|----------|
| [Tatsumaki](http://tatsumaki.xyz)                | 20%      |
| [Mantaro](https://github.com/Mantaro/MantaroBot) | 40%      |
| [Hifumi](http://hifumibot.xyz/)                  | 40%      |

### 1. Figure out the tax rate

| Usage                         | Pay by Tatsu | Pay by Mantano | Pay by Hifumi | We get |
|-------------------------------|--------------|----------------|---------------|--------|
| Renew your number for 1 month | 2500         | 2000           | 3333          | 2000   |
| 1 message sent using payphone | 10           | 8              | 14            | 8      |

*Side note: Tatsumaki's 20% tax exists on its side ("Amount due after tax" as you see), where others' tax exists on our side.*

### 2. Earn money

Read your preferred bots'/bot's documentation to learn how to earn money.

### 3. Topping Up
In any server with both your preferred payment bot(s) and DiscordTel: **IF they are ALL online,** run the following commands for the bot(s):

**WARNING: DO NOT TOP-UP WHEN DISCORDTEL IS OFFLINE!**

* `t!credit @DiscordTel <Amount>` for Tatsumaki
* `~>transfer @DiscordTel <Amount>` for Mantaro
* `~transfer <Amount> @DiscordTel` for Hifumi

Your `<Amount>` is the price that you are transferring to the bot. After you run the command you will receive a confirmation.

Type `>help` before you make a transaction to see if DiscordTel is online. If you did not receive the credits in your DTel account, contact [DiscordTel HQ](https://discord.gg/RN7pxrB) or `>dial *611` when DTel comes back online.

### 4. Checking your balance
You can use `>balance` in any channel, even the channel doesn't have DTel service enabled. The server must have DTel installed.

### I'm a developer and I want DiscordTel to accept payments from my bot!
1. Your bot has to be in over 1000 servers.
2. Your bot must DM DiscordTel when a transaction to DiscordTel is performed, and the DM **must** include the user's ID and the amount of transaction.
3. Once you qualify and you have contacted austinhuang#1076, we'll figure out the tax rate based on your currency's rarity (how easy it is to get it, how much you'll get for each command, etc).

## Donation
$1 CAD = 1 billion DiscordTel credits.

### Reference rate
Actual rate determined by real time currency exchange rate.

* 1 USD = 1348650000 credits
* 1 Robux = 1/80 USD = 16858125 credits
* 1 satoshi = 35273 credits, as of May 25 2017
* 1 Aeroplan mile = 1/138 CAD = 7246376.81 credits

### Methods
By gift cards. Currently accept: Steam, Rixty, Roblox, PlayStation, XBOX, virtually everything with a code, not physical card.

For Canadians, you can also perform an Interac E-Transfer to `austinhuang0131@gmail.com`. Don't forget to DM austinhuang#1076 the secret question and response!

We do not accept direct PayPal donations, however, you can use [this](https://www.paypal.com/us/webapps/mpp/shopping-selection) to donate with PayPal.

## Using your balance
### Renew your number
`>dial *233` in the channel that has DTel service enabled, then type the amount of months you want to renew for.

### Payphone
`>pdial <Number>`.
Using the payphone will charge you 8 DiscordTel credits. For other bots, see the **tax rate chart** above.
