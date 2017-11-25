# Καλωσήρθατε στο DiscordTel!
Αυτός ο οδηγός προορίζεται για αρχαρίους που θέλουν να χρησιμοποιήσουν το DisordTel στους σέρβερ τους.

## 1. Προσκαλώντας το μπότ => Διαλέγοντας το κανάλι του
Κάνε κλίκ [εδώ](https://discordapp.com/oauth2/authorize?client_id=224662505157427200&scope=bot&permissions=84997) για να προσκαλέσετε το μπότ στον επιθυμητό σς σέρβερ, και μετά διαλέξτε/δημιουργήστε το κανάλι όπου θα λειτουργέι.

## 2. Choosing a number
Το πρόθεμα για τους αριθμούς είναι `0301` για έναν αριθμό καναλιού ή `0900` for a mobile number. Before proceeding, please decide your preferred number.

Όλοι οι αριθμοί είναι 11ψήφιοι. π.χ. `0301XXXXXXX`.Μπορείτε να καλέσε αριθμούς με γράμματα, για αυτό **εαν** θέλετε να βρείτε τον 7ψηφία λέξη σε νούμερα, (π.χ. 0301-ELLINAS), μπορείτε να χρησιμοποιήσετε [αυτό το εργαλείο](http://word2number.com).

Σέρβερς με 100+ μέλη που παρέχουν κάποια υπηρεσία μπορείνα είναι "δικαιούχοι" `0800`/`0844` προθεμάτων. Επικοινωνήστε μαζί μας [εδώ](https://discord.gg/uw2dfYf).

## 3. Εκτελώντας τον οδηγό έναρξης
`>wizard`

Τρέξτε αυτή την εντολή στο κανάλι που επιλέξατε προηγουμένως.

To bot θα στείλει ενα μήνυμα **παρόμοιο** (οχι ίδιο): 
![registernumber](http://i.imgur.com/zMKAkPr.png)

Εαν θέλετε έναν κινητό αριθμό (πρόθεση `0900`), τρέτξτε το `>wizard` στα DM (Direct Message) με το DTel bot.

Ο οδηγός ειναι διαθέσιμος μόνο για την καταχώρηση αριθμών `0301` και `0900`. Για τους υπόλοιπους αριθμούς, αναφερθείτε στην Εξυπηρέτηστ Πελατών: `>pdial *611`.

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
