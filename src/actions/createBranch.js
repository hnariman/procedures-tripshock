const {errorMessage} = require('./helpers');

const createBranch = (response) => {
  if (response.link === "") {
    errorMessage("unable to create new branch");
    errorMessage("faulty link and/or ticket name");
    return;
  }
  const mondayid = response.link.match(/\d{10}/);
  return (mondayid + "_" + response.ticket.replace("/", "")).replace( /\s/g, "_");
  console.log(
    ` aws codecommit create-branch --repository-name MyDemoRepo --branch-name MyNewBranch --commit-id 317f8570EXAMPLE`
  );
};

module.exports = createBranch;
