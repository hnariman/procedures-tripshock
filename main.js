const prompts = require("prompts");
const chalk = require("chalk");
const moment = require("moment");
const shell = require("shelljs");

const REPOSITORY = "ts_front_ssr";
const AWS_PROFILE = "tripshock";

const errorMessage = (message) => console.error(chalk.bold.red(message));
const congratsMessage = (message) =>
  console.log(chalk.bold.greenBright(message));

const createBranch = (response) => {
  if (response.link === "") {
    errorMessage("unable to create new branch");
    errorMessage("faulty link and/or ticket name");
    return;
  }
  const mondayid = response.link.match(/\d{10}/);
  return (mondayid + "_" + response.ticket.replace("/", "")).replace(
    /\s/g,
    "_"
  );
  // TODO:
  // also shall create branch on aws by command
  console.log(
    ` aws codecommit create-branch --repository-name MyDemoRepo --branch-name MyNewBranch --commit-id 317f8570EXAMPLE`
  );
};
const createFinalReport = (response) => {
  const template = `

## Version ( ${moment().format("DD-MM-YYYY")} )

### [ ${response.ticket} ]( ${response.link} )

[ Monday: ${createBranch(response)} ]( commit link )

[Dev. Nariman] (mailto:hnariman@gmail.com) 

* changes
`;

  console.log(template);
  return template;
};
const createPR = (response) => {
  const branch = () => shell.exec("git branch --show-current");
  const description = () => createFinalReport(response);
  const pr = {
    title: "",
    description: description(),
    clientRequestToken: "",
    repositoryName: "ts_front_ssr",
    sourceReference: branch(),
    destinationReference: "dev",
  };
  //--client-request-token '' \
  const awsCommand = `aws codecommit create-pull-request --title ${pr.title} --description ${pr.description} --targets repositoryName=${pr.repositoryName},sourceReference=${pr.sourceReference},destinationReference=${pr.destinationReference} --profile ${AWS_PROFILE}`;
  console.log(awsCommand);
};

const getCommit = () => {
  //aws codecommit get-commit --repository-name MyDemoRepo --commit-id 7e9fd3091thisisanexamplethisisanexample1
  // commit id of last commit: git log --pretty=%H | head -1
  // but doesn't return the link : aws codecommit get-commit --repository-name "ts_front_ssr" --commit-id 7698df1d376b00edabbf3e02943df2de5ba7e79f
  // taken from browser: https://console.aws.amazon.com/codesuite/codecommit/repositories/ts_front_ssr/commit/6b1455a9059931b4ea22dea73744ba8cf5c6f4da?region=us-east-1
  const commitHash = shell.exec("git log --pretty=%H | head -1");
  const commitLink = `https://console.aws.amazon.com/codesuite/codecommit/repositories/${REPOSITORY}/commit/${commitHash}`;
};

(async () => {
  const response = await prompts([
    {
      type: "multiselect",
      name: "action",
      message: "Actions:",
      choices: [
        {
          title: "get commit link",
          description: "get commit link on codecommit",
          value: "commitLink",
        },
        {
          title: "branch name",
          description: "create aws branch with proper name",
          value: "branch",
        },
        {
          title: "commit message",
          description: "generate commit message for aws CodeCommit",
          value: "commit",
        },
        {
          title: "pull request log message",
          description:
            "generate a pull request and log message by corporate template",
          value: "PR",
        },
        {
          title: "final message",
          description: "generate a final message for Monday.com board",
          value: "final",
        },
      ],
    },
    {
      type: "text",
      name: "link",
      message: "Please copy paste a Monday link",
    },

    {
      type: "text",
      name: "ticket",
      message: "Please copy and paste the ticket name",
    },
  ]);
  // DEBUG:
  console.log("action type: ", response);
  if (response.action.includes("branch"))
    congratsMessage(`Branch created:\t${createBranch(response)}`);
  if (response.action.includes("final")) createFinalReport(response);
  if (response.action.includes("PR")) createPR(response);
  if (response.action.includes("commitLink")) getCommit();
})();
