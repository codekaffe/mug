const got = require('got');

const userAgent = `Kaffe Overseer v${require('../../package.json').version}`;

const headers = {
  Authorization: `Basic ${Buffer.from(process.env.WAKATIME_TOKEN).toString('base64')}`,
  'User-Agent': userAgent,
};

module.exports = class Wakatime {
  static async getUser() {
    const { body } = await got('https://wakatime.com/api/v1/users/current', {
      headers,
      responseType: 'json',
    });

    return body;
  }

  static async getSummaries(range = 'Today') {
    const { body } = await got('https://wakatime.com/api/v1/users/current/summaries', {
      headers,
      searchParams: {
        range,
      },
      responseType: 'json',
    });

    return body;
  }
};
