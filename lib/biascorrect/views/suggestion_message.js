
exports.suggestion_message = ({
  DIVERSITY,
  BAD_WORD,
  REPLACEMENT,
  REASON
}) => ({
   "blocks":[
      {
         "type":"section",
         "text":{
            "type":"mrkdwn",
            "text":"psst! consider using:"
         }
      },
      {
         "type":"divider"
      }
   ],
   "attachments":[
      {
         "color":"#f2c744",
         "blocks":[
            {
               "type":"section",
               "text":{
                  "type":"mrkdwn",
                  "text": "_" + BAD_WORD + "_"
               }
            }
         ]
      },
      {
         "color":"#36a64f",
         "blocks":[
            {
               "type":"section",
               "text":{
                  "type":"mrkdwn",
                  "text": "_" + REPLACEMENT + "_"
               }
            }
         ]
      }
   ]
})
