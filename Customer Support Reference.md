## Customer Support Reference
This is a reference to the commands Customer Support has access to. **Your action is logged in #bot-log.**
**If** you have any questions on commands that are **not** referenced here, please ask in the staff chat. Thanks.
Also, **please** only use staff commands *either* in the **staff chat** or in **a direct message to the bot.**

## Want to work here?
Unfortunately, getting Customer Support is invite-only at the moment.

## Assign a number
1. Assume you picked up the 611 call. Go to #bot-log.
2. Search for `281816105289515008`. Navigate to the latest result.
3. Copy the opposite side's channel ID (For `between Channel A and Channel B`, copy `B`).
4. Ask for the preferred number. Make sure it follows [this](http://discordtel.readthedocs.io/en/latest/Server%20Setup/#2-choose-a-number).
5. Type in DM (DO NOT TYPE IN #611 CHANNEL): `>assign <Channel_ID> <Number>`.

## Deassign a number
`>deassign <Channel_ID> <Number>`. Only do it if:

* Number is not callable;
* Number is mistakenly assigned;
* The owner requests a removal;
* The users of this number abuse the system (Contact austinhuang first);
* The owner of the number wants it moved to another channel (Make sure you have the channel ID they want it moved to).

## Extend a number
`>extend <Number> <# of months>`. Only do it if:

* For your own salary (You can extend your own numbers for free, but less than 3 numbers please);
* When the number is assigned there's less than 10 days left in that month (Extend 1 month).

## Number info
`>ninfo <Number>`. This gives you the JSON object of the number, which contains the number's *channel ID* it is assigned to, the number itself, **and** the expiry date (the year and month). You can use the channel ID and number to *assign*, *de-assign*, or *extend* a number.

![Example ninfo command](http://i.imgur.com/eQoVpIO.png)

## Adding credits
If you can't run the *extend* command, you can add credits.
You **can** add credits to yourself, but **DON'T** give them away if there isn't any reason.
Dos and don'ts:

* Give credits if extend command is disabled - and person has had problems with renewing etc.
* Give credits to yourself (It's allowed, that's what austinhuang says).
* Don't give credits if you're giving it away to someone who **hasn't** had any problems with renewing, etc.

## Dealing with troll calls
*Sometimes* people can be annoying and just try to have fun. That is the case with troll calls.
**These** are the cases of **what are** and **what are NOT** troll calls:

* People calling, talking about something to wind you up - Troll Call
* A person calls 611 who doesn't understand what it is - NOT a Troll Call
* Someone who tries to say impolite/vulgar things to you - Troll Call
* Someone who is reporting someone that is trolling - NOT a Troll Call

**If** a *troll* call **occurs**, please use the blacklist command on their user ID, in a format like this:

`>blacklist <User ID>`
You can get the User ID from bot-logs (it's at the end of the line):
![User ID](http://i.imgur.com/ntxEwAA.png)

**If** you want to un-blacklist someone, run the blacklist command *again*, with the same user ID.

If you want **to** understand what is trolling and what is not, please refer to this Wikipedia article on [Internet trolling.](https://en.wikipedia.org/wiki/Internet_troll)
