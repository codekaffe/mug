const { Octokit } = require('@octokit/rest');
const got = require('got');

const userAgent = `Kaffe Overseer v${require('../../package.json').version}`;
const github = new Octokit({ userAgent, auth: process.env.GITHUB_TOKEN });

// async function run2() {
//   const { body } = await got('https://wakatime.com/api/v1/users/current/summaries', {
//     headers: {
//       Authorization: `Basic ${Buffer.from(process.env.WAKATIME_TOKEN).toString('base64')}`,
//       'User-Agent': userAgent,
//     },
//     searchParams: {
//       range: 'Today',
//     },
//     responseType: 'json',
//   });

//   log(body);
// }

module.exports = class Github {
  static async getUser() {
    const user = await github.users.getAuthenticated();
    return user.data;
  }

  static async getRepos() {
    const repos = await github.repos.listForAuthenticatedUser({
      username: 'joaquimnet',
      per_page: 1000,
      type: 'owner',
      sort: 'updated',
    });

    return repos.data;
  }
};
