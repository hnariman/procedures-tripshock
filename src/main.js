const prompts = require("prompts");
require("dotenv").config();

const {
  createBranch,
  getCommit,
  createFinalReport,
  createPR,
  parseTicket,
} = require("./actions");

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
        {
          title: "parse ticket",
          description: "get ticket name from link",
          value: "ticket",
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
  //console.log("action type: ", response);
  if (response.action.includes("branch"))
    congratsMessage(`Branch created:\t${createBranch(response)}`);
  if (response.action.includes("final")) createFinalReport(response);
  if (response.action.includes("PR")) createPR(response);
  if (response.action.includes("commitLink")) getCommit();
//  if (response.action.includes("ticket")) parseTicket(response);
})();
