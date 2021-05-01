const shell = require('shelljs');
const {repository} = require('./helpers');

const getCommit = () => {
  const commitHash = shell.exec("git log --pretty=%H | head -1");
  const commitLink = `https://console.aws.amazon.com/codesuite/codecommit/repositories/${repository}/commit/${commitHash}`;
  console.log(commitLink);
  return commitLink;
};

module.exports = getCommit;
