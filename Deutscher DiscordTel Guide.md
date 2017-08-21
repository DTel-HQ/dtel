# Willkommen bei DiscordTel!
Diese Anleitung soll Neulingen dabei helfen, DiscordTel für einen Server aufzusetzen und einzustellen.

## 1. Den Bot einladen => Den Channel aussuchen
Klicke [hier](https://discordapp.com/oauth2/authorize?client_id=224662505157427200&scope=bot&permissions=84997) um den Bot auf den Server einzuladen, dann wähle oder erstelle einen Channel, dem die DiscordTel-Nummer hinzugefügt werden soll.

## 2. Eine Nummer auswählen
Die allgemeine aktuelle Vorwahl ist `0301` für eine Channelnummer oder `0900` für eine Mobilnummer. Bevor du weitermachst, suche dir eine Nummer aus.

Alle Nummern haben 11 Stellen. z.B. `0301XXXXXXX`. Du kannst Nummern mithile von Buchstaben anstatt von Zahlen wählen, **wenn** du ein 7-stelliges Wort in eine Nummer umwandeln möchtest (z.B. 0301-BCHSTBN) (für Buchstaben), kannst du [dieses Tool](http://word2number.com) benutzen.

Discord-Server mit 100+ Mitgliedern, die einen Service anbieten, können eine `0800`/`0844`-Vorwahl beantragen. Kontaktiere dafür @austinhuang#1076 auf dem Support-Server.

## 3. Den Setup-Wizard ausführen
`>wizard`

Schicke diesen Command in dem DiscordTel-Channel, den du in Schritt 1 ausgewählt hast.

Der Bot wird die eine ähnliche Nachricht wie diese schicken: 
![registernumber](http://i.imgur.com/zMKAkPr.png)

Wenn du eine Mobilnummer haben möchtest, (Vorwahl `0900`), schicke `>wizard` in einer PM (Privatnachricht) an den Dtel-Bot.

Der Setup-Wizard kann nur `0301` und `0900` Nummern registrieren. Für alle anderen Nummern kontaktiere bitte den Kunden-Support: `>pdial *611`.

## 4. Die Mailbox einrichten
`>mailbox`

Dieser Command lässt dich auf deine Mailbox zugreifen. Wenn dich jemand anruft, du den Anruf aber nicht annimst oder ihn ablehnst, hat der Anrufer die Möglichkeit, eine Nachricht zu hinterlassen. Um diese Funktion zu benutzen, muss die Mailbox aber erstmal eingerichtet werden. Tippe dafür einfach `>mailbox settings` in dem Channel der deiner Nummer zugeordnet ist, und du wirst eine Nachricht wie diese sehen:

![pic](http://i.imgur.com/mv3h3nX.png)

Jetzt tippe `>mailbox settings [Dein Mailbox Text]`. Damit hast du die Mailbox erfolgreich eingerichtet!

Wenn jemand eine Nachricht hinterlässt, wirst du eine Benachrichtigung vom Bot erhalten. Um deine Nachrichten lesen zu können, gib ein: `>mailbox messages`, woraufhin der Bot dir eine Nachricht wie diese schickt:

![pic](http://i.imgur.com/nba617d.png)

Um eine Nachricht zu löschen, tippe `>mailbox messages [ID] delete`, in obigen Beispiel ist die ID 6dd7.
Du kannst die Person, die die Nachricht hinterlassen hat auch zurückrufen! Dafür schreibe `>mailbox messages [ID] callback`.

## 5. Bestätigung
Glückwunsch! Du hast nun deine Telefonnummer eingerichtet.
Der Bot sollte dir nun eine Nachricht wie diese schicken:
![message](http://i.imgur.com/vuOzp4d.png)

Lies den Artikel zur [Bezahlung](http://discordtel.readthedocs.io/en/latest/Payment/), um zu erfahren, wie du deine Nummer erweitern kannst.
