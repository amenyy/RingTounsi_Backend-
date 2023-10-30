exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.athleteBoard = (req, res) => {
  res.status(200).send("Athlete Content.");
};

exports.coachBoard = (req, res) => {
  res.status(200).send("Coach Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
