const config = require('./config');
const readLineSync = require('readline-sync');
const Twilio = require('twilio');

const NO_CHOICE_MADE = -1;

const {
  TWILIO_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  MY_SPOUSE_NUMBER
} = config;

const client = new Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

const animals = ['Lion', 'Elephant', 'Crocodile', 'Giraffe', 'Hippo'];

const index = readLineSync.keyInSelect(animals, 'Which is your favorite animal?');

if (index === NO_CHOICE_MADE) {
  process.exit(0);
}

const smsMessage = {
  body: `Hi Bub, ${animals[index]} goes to your room.`,
  from: TWILIO_PHONE_NUMBER,
  to: MY_SPOUSE_NUMBER
};

console.log(`sending message: ${smsMessage.body}`);

// Send the text message.
client.messages.create(smsMessage)
  .then(({ sid }) => {
    console.log('SMS sent. Id:', sid);
  })
  .catch((error) => {
    console.error('Error sending Twilio message', error);
  });