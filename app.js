const express = require('express')
const bodyParser = require('body-parser')
const { createEventAdapter } = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const { WebClient } = require('@slack/web-api')
require('dotenv').config()

const biascorrect = require('./lib/biascorrect/biascorrect')
const biascorrect_views = require('./lib/biascorrect/views/suggestion_message')
const suggestion_message = biascorrect_views.suggestion_message

const port = process.env.PORT || 3000

const app = express()
const token = process.env.SLACK_BOT_TOKEN
const webClient = new WebClient(token)

const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET)

app.use('/slack/events', slackEvents.expressMiddleware())
app.use('/slack/actions', slackInteractions.expressMiddleware())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

console.log(process.env.SLACK_SIGNING_SECRET)




slackEvents.on('message', async (event) => {
  // Filter out messages from bots

  if (event.bot_id) {
    return;
  }
  try {
    const corrections = biascorrect.BIAS_CORRECTION(event.text)
    if (corrections.length) corrections.map( async correction => {
      const mentionResponseBlock = { ...suggestion_message(correction), ...{channel: event.user}}
      const res = await webClient.chat.postMessage(mentionResponseBlock)
    })
  } catch (e) {
    console.log(JSON.stringify(e))
  }
})

app.get('/', function (req, res) {
  res.send('Hello EB from Node running in Docker!\n');
});

// Starts server
app.listen(port, function() {
  console.log('Bot is listening on port ' + port)
})
