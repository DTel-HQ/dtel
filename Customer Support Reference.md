# Customer Support Guidebook
Welcome to the Customer Support guidebook. Commands that support members have access to are listed in this guidebook. **Your actions are recorded in #bot-log.**
If you have any questions about commands that are **not** referenced here, you may ask about it in a staff channel on DTel's HQ.
Staff commands should **only** be used in either the staff channel or in direct messaging with the bot.

## How do I become a Customer Support?
The **only way** to become part of the Customer Support team is to fill out an application, located [here](https://discordtel.typeform.com/to/cR3ovo). Your application will put into the pool, but will only be looked at once a spot opens. The maximum amount of team members is currently **eighteen (18)**. It may take **weeks or months** for your application to be read. **Asking a staff member to read your application will result in an AUTOMATIC DENIAL.**

## Assigning a number
1. Assume you picked up the 611 call. Go to #bot-log.
2. Search for `281816105289515008`. Navigate to the latest result.
3. Copy the opposite side's channel ID (For `between Channel A and Channel B`, copy `B`).
4. Ask the client for their preferred number. Make sure it follows [these guidelines](http://discordtel.readthedocs.io/en/latest/Server%20Setup/#2-choose-a-number).
5. Type in DM or in a staff channel (DO NOT TYPE IN #611 CHANNEL): `>assign <Channel_ID> <Preferred_Number>`.

## Deassigning a number
`>deassign <Channel_ID> <Number>`. Use this command only if:

* The number is not callable;
* The number is mistakenly assigned;
* The owner requests for removal of their number;
* The users of this number abuse the system (Contact austinhuang first);
* The owner of the number wants it moved to another channel (Make sure you have the channel ID they want it moved to).

## Extending a number
`>extend <Number> <# of months>`. Use this command only if:

* For your own salary (You can extend your own numbers for free, but less than 3 numbers please);
* When the number is assigned there's less than 10 days left in that month (Extend 1 month).

## Number info
`>ninfo <Number>`
This gives you the JSON object of the number, which contains the number's *channel ID* that it is assigned to, the number itself, and the expiration date (the year and month). You can use the channel ID and number to *assign*, *de-assign*, or *extend* a number.

![Example ninfo command](http://i.imgur.com/eQoVpIO.png)

## Adding credits
If, for whatever reason, `>extend` is not functional, you may give credits to yourself or a caller.
You may add credits to yourself as you please, but **DO NOT** give them away without a valid reason.
Dos and don'ts:

* Give credits if extend command is disabled - and person has had problems with renewing etc.
* Give credits to yourself (It's allowed, that's what austinhuang says).
* Don't give credits if you're giving it away to someone who **hasn't** had any problems with renewing, etc.

## Dealing with troll calls
*Sometimes* people can be annoying and just try to have fun. That is the case with troll calls.
**These** are the cases of **what are** and **what are NOT** troll calls:

* People calling, talking about something irrelevant to DiscordTel - Troll Call
* A person calls 611 but does not understand what it does - NOT a Troll Call
* Caller begins to say impolite/vulgar things to or about you - Troll Call
* Caller who is reporting a troller - NOT a Troll Call

If a *troll* call occurs, use the blacklist command on their user ID, in a format like this:

`>blacklist <User ID>`
You can get the User ID from #bot-logs (it's at the end of the line):
![User ID](http://i.imgur.com/ntxEwAA.png)

If you desire to **un-blacklist** someone, run the blacklist command *again* with the same user ID.

For a quick reference to decide what is trolling and what is not trolling, you may refer to this Wikipedia article on [Internet trolling](https://en.wikipedia.org/wiki/Internet_troll).
