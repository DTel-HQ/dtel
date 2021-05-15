# Customer Support
## How do I join the Customer Support team?
The **only way** to join the CS team is to fill out our [**application form**](https://dtel.typeform.com/to/wHjMpX). Your application will put into the pool, but will only be looked at once a spot opens. The maximum amount of team members is currently **the number closest to (server count / 100)** (excluding supervisors or higher). It may take **weeks or months ~~or years~~** for your application to be read. **Asking a staff member to read your application will result in an AUTOMATIC DENIAL.** During your wait, you should stay in the DTel HQ. Failure to remain in the server until your application is read will also result in an automatic denial.

# Guide
Welcome to the Customer Support guide. This guide contains info about some of the commands that (presuming you're CS) you can use. Check `>cshelp` for all the commands at your disposal. **Your actions are recorded in #bot-log.**

If you have any questions about commands that are **not** mentioned here, you may ask about it in a staff channel in DTel's HQ. Staff commands should **only** be used in either the staff channel or in DMs with the bot.

## Dealing with \*611 calls
This section only details the general conduct expected from members of our support team, the tools at your disposal are explained below.

* The CS \[agent] who picked up the call is the only one allowed to speak, unless otherwise directed. You can put `>` before your message so the other side can't see it.
* Try to lead any conversation into a pleasant direction.
* If you don't know the appropriate action, ask more experienced CS or a supervisor/boss and wait for their response.

## Deassigning a number
Use `>deassign <Number>`.
Used when someone asks for their number to be removed. Make sure to use `>permcheck <caller's user ID>` in the call and used `>ninfo <number>` to check if they need refunding (see below).

## Moving/changing a number
* VIP numbers: you should use `>reassign <number/channel> <number/channel>` to change or move the number.
* Normal numbers: use `>deassign` as explained above and, if applicable, refund the credits they spent on extending their number (calculations in table below). Tell the user that they can make a new number themselves by using `>wizard`.

| Time       | Credits |
|------------|---------|
| Full month | 500     |
| 21-31 days | 450     |
| 11-20 days | 300     |
| 1-10 days  | 150     |

*Make sure to* **remove one month** *from the remaining time.* This is because the first month is free.

## How to get more information
We currently have info commands for:

* users (`>uinfo <user id/mention>`)
* numbers (`>ninfo <number>`)
* calls (`>cinfo <call id, see #bot-log>`)
* messages inside calls (`>id(entify) <call id> <msg id>`, check `>cshelp` for more information)
* and mailbox messages (`>minfo <number/channel of the mailbox> <message id, run >mailbox to get it>`)

## Adding credits
Please ask a boss. The command is >addcredit, but you ***must*** consult a boss.

## Dealing with troll calls (or any kind of abuse)
*Sometimes* people can be annoying and are just trying to have fun. That is the case with troll calls.
The following explains **what is** and **what is NOT** a troll call:

* People calling and talking about something irrelevant to DTel - troll call
* A person calls 611 but does not understand what it is/does or mistakes it for another special number (233/411) - NOT a troll call, inform them then hang up (although if they do this repeatedly then it likely is a troll call)
* Caller begins to say impolite/vulgar things to or about you - troll call
* Caller who is reporting a troll - NOT a troll call

If a troll call occurs, warn the user and give them a strike (`>strike <user id> <reason>`.) The user will automatically be blacklisted after 3 strikes. If the bot failed to blacklist the user (if the bot doesn't say "They have been blacklisted." in the embed footer in response to your 3rd strike), or if the offense is severe enough you may directly blacklist the user (`>blacklist <user id> <reason>`.)

(You can get their user ID from the call or in #bot-logs (it's at the end of the line):
![User ID](http://i.imgur.com/ntxEwAA.png) or by enabling Discord's Developer Mode and right clicking/tapping on the user's profile and selecting "Copy ID".)

If you want to **un-blacklist** someone, run the blacklist command *again* with the same user ID.

For a quick reference to help you decide what is and what isn't trolling, you may refer to the Wikipedia article on [Internet trolling](https://en.wikipedia.org/wiki/Internet_troll).

## Backdooring
Sometimes you may need extra proof for a troll call report. Or maybe you need to join a server to help a user out. In any case, you can use `>backdoor <number/channel id>` to get an invite.

## Broadcasting
If you're trying to help someone out or want to tell them something, and you can't/don't want to call them + they dont have a mailbox set up, you can use `>broadcast <number/channel id> <message>` to send them a message. *Only use this for CS purposes.*

## Busy-ness
We have a system of a user being "busy" when they use certain commands to avoid conflicts. Usually a user becomes un-busy when the command is "done". However, sometimes a user gets stuck in the busy state. You can use `>unbusy <user id/mention>` to free them up. If commands still don't work for them, contact a boss.

<script data-goatcounter="https://dtel.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
