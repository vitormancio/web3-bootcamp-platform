const functions = require('firebase-functions')
const addUserToRole = require('./discord_integration')
const { sendEmail } = require('./emails')
const { PubSub } = require('@google-cloud/pubsub')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()
const pubsub = new PubSub()

exports.sendEmail = functions.https.onRequest(async (req, resp) => {
  resp.send(
    await sendEmail(
      req.query.template,
      '🏕️ Seu primeiro Smart Contract na Ethereum',
      req.query.to
    )
  )
})

exports.helloPubSub = functions.pubsub
  .topic('course_day_email')
  .onPublish((message) => {
    const data = JSON.parse(Buffer.from(message.data, 'base64'))

    console.log(`Sending message template ${data.template} to ${data.to}`)

    return sendEmail(
      data.template,
      '🏕️ Seu primeiro Smart Contract na Ethereum',
      data.to
    )
  })

exports.sendEmailToAllUsers = functions.https.onRequest(async (req, resp) => {
  db.collection('users')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const user = doc.data()
        if (user.email) {
          const messageObject = { to: user.email, template: 'course_day' }
          const messageBuffer = Buffer.from(
            JSON.stringify(messageObject),
            'utf8'
          )

          pubsub
            .topic('course_day_email')
            .publishMessage({ data: messageBuffer })
        }
      })
    })
  resp.send('OK')
})

exports.addUserToDiscord = functions.https.onRequest(async (req, resp) => {
  addUserToRole(req.query.user_id, req.query.role_id).then((r) =>
    resp.send('OK')
  )
})

exports.addAllUsersFromCohortToDiscord = functions.https.onRequest(
  async (req, resp) => {
    const cohort_id = req.cohort_id
  }
)
