const createBranch = require("./createBranch");
const getCommit = require("./getCommit");
//const createBranch = require("./createBranch");
//const getCommit = require("./getCommit");
const moment = require("moment");
const developer = process.env.DEVELOPER || "anonymous";
const email = process.env.DEVELOPER_EMAIL || "info@tripshock.com";
const prompts = require("prompts");

const getChanges = async () => {
  const changes = await prompts({
    type: "text",
    message: "please enter any changes made",
    name: "detail",
  });
};

const createFinalReport = ({ response, changes }) => {
  const template = `

## Version ( ${moment().format("DD-MM-YYYY")} )

### [ ${response.ticket} ]( ${response.link} )

[ Monday: ${createBranch(response)} ]( ${getCommit()} )

[Dev. ${developer}] (mailto:${email}) 

${Object.values(changes).map(x => "*  "+x)}
 `;

  console.log(template);
  return template;
};

module.exports = createFinalReport;
