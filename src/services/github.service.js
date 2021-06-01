const { Octokit } = require('@octokit/rest');
const got = require('got');
const { GITHUB_TOKEN } = require('../config');

const userAgent = `Kaffe Overseer v${require('../../package.json').version}`;
const github = new Octokit({ userAgent, auth: GITHUB_TOKEN });

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
