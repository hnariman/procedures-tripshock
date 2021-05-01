const chalk = require('chalk');
const shell = require('shelljs');
const repository = shell.exec("git remote get-url origin | sed 's/.git//g' | grep -oP '([^/]*$)'");
const errorMessage = (message) => error(chalk.bold.red(message));
const congratsMessage = (message) => console.log(chalk.bold.greenBright(message));

module.exports = {repository, errorMessage, congratsMessage};
