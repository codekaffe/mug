const { connect } = require('mongoose');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const WAKATIME_TOKEN = process.env.WAKATIME_TOKEN;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;

let db;

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then((conn) => {
    db = conn;
    // console.log('conn: ', conn);
    console.log('Db... okay! :)');
  })
  .catch((err) => {
    console.log(err);
    console.log('Db... not okay! :(');
    process.exit(1);
  });

module.exports = {
  GITHUB_TOKEN,
  WAKATIME_TOKEN,
  DISCORD_TOKEN,
  MONGODB_URI,
  db: () => db,
};
