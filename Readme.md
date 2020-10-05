
For Carrie:

## RUN 
for fast local iteration use:
- console 1: ngrok http 8080
- console 2: node app.js

Then go over at https://api.slack.com/apps/A01BK2VGZ43/event-subscriptions
and change the **Enable Events**.**Request URL** to the ngrok url to get from the first console, and add a /slack/events suffix to that url, paste that and you are set, you are good to go. Don't forget to 'Save changes'.

## RUN
for staging at AWS:
Grab the folders internal to this repository, and compact them onto a .zip file. Then drag and drop that over ElasticBeanStalk for a quick deploy
Then grab the url provided by ElasticBeanStalk, and use that instead of the url we talked about in the paragraph below

Remember to use the Amazon Linux 64 bit Version 1 -- instead of the default which is the version 2
