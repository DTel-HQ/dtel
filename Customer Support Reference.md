## Customer Support Reference
This is a reference to the commands Customer Support has access to. **Your action is logged in #bot-log.**

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
