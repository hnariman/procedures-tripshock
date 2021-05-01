const shell = require("shelljs");
const { AWS_PROFILE } = require("../constants");
const { repository } = require("./helpers");
const createFinalReport = require("./createFinalReport");
const prompt = require("prompts");

const createPR = async (response) => {
  const branch = () => shell.exec("git branch --show-current");
  const description = () => createFinalReport({ response, changes });
  const changes = await prompt({
    type: "text",
    name: "item",
    message: "Please enter description of changes made:",
  });
  const pr = {
    title: branch(),
    description: description(),
    clientRequestToken: "",
    repositoryName: repository,
    sourceReference: branch(),
    destinationReference: "dev",
  };

  const awsCommand = `aws codecommit create-pull-request \ 
--title ${pr.title} --description ${pr.description} \
--targets repositoryName=${pr.repositoryName},sourceReference=${pr.sourceReference},destinationReference=${pr.destinationReference} \
--profile ${AWS_PROFILE}`;

  //  console.log(awsCommand);
  return awsCommand;
};

module.exports = createPR;
