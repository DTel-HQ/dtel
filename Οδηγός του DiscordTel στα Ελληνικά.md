# Καλωσήρθατε στο DiscordTel!
This guide will assist newcomers in setting up DTel for their server!

## 1. Προσκαλώντας το μπότ => Διαλέγοντας το κανάλι του
Κάνε κλίκ [εδώ](https://discordapp.com/oauth2/authorize?client_id=224662505157427200&scope=bot&permissions=84997) για να προσκαλέσετε το μπότ στον επιθυμητό σς σέρβερ, και μετά διαλέξτε/δημιουργήστε το κανάλι όπου θα λειτουργέι.

## 2. Choosing a number
Το πρόθεμα για τους αριθμούς είναι `0301` για έναν αριθμό καναλιού ή `0900` for a mobile number. Before proceeding, please decide your preferred number.

Όλοι οι αριθμοί είναι 11ψήφιοι. π.χ. `0301XXXXXXX`.Μπορείτε να καλέσε αριθμούς με γράμματα, για αυτό **εαν** θέλετε να βρείτε τον 7ψηφία λέξη σε νούμερα, (π.χ. 0301-ELLINAS), μπορείτε να χρησιμοποιήσετε [αυτό το εργαλείο](http://word2number.com).

Discord servers with 100+ members that provide a service may be eligible for `0800`/`0844` prefixes. Contact austinhuang in the support server.

## 3. Running the wizard
`>wizard`

Run this command in the channel you chose earlier.

The bot will send a message like this (will be similar, not the same): 
![registernumber](http://i.imgur.com/zMKAkPr.png)

If you want a mobile number (prefix `0900`), run `>wizard` in a DM (Direct Message) with the DTel bot.

The wizard is only available to register `0301` and `0900` numbers. For all other numbers, please refer to calling Customer Support: `>pdial *611`.

## 4. Setting up the mailbox
`>mailbox`

This command provides access to your mailbox. When someone calls you, and you don't pick up or you hangup, the caller has the possibility to leave a message. To use this fuction, you need to set the mailbox up.
For this, type `>mailbox settings` in the channel with your number assigned, and you will see something similar to this:

![pic](http://i.imgur.com/mv3h3nX.png)

Now, type `>mailbox settings [Your mailbox text]`. With that, you have successfully setup your mailbox!

Once someone leaves a message, you will receive a message, and to read the message, you need to type `>mailbox messages`, which will bring up a message like this: 

![pic](http://i.imgur.com/nba617d.png)

To delete the message, you can type `>mailbox messages [ID] delete`. In the case above, the ID is 6dd7.
You can also call the person that left the message! For that type `>mailbox messages [ID] callback`

## 5. Confirmation
Congratulations! You set up your number.
The bot should send a message like this:
![message](http://i.imgur.com/vuOzp4d.png)

Read the [Payment](http://discordtel.readthedocs.io/en/latest/Payment/) section for information about how to extend your number.
