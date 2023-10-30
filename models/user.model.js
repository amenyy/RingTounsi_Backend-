module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    date_inscription: {
      type: Sequelize.DATE,
    },
  });

  return User;
};
