const user = require("../models/user");

const login = async (req, res) => {
  let images = ["avatar.png","avatar2.png","avatar3.png","avatar4.jpg","avatar5.jpg"];
  let names = ["ahmed","mohamed","mahmoud","salma","fatma","darin","osama","marwan","malak","mina"];
  let departement = ["A1","A2","A3","B1","B2","B3","C1","C2","C3","C4"];
  let thedep = departement[Math.floor(Math.random() * departement.length)];
  let theimage = images[Math.floor(Math.random() * images.length)];
  let theName = names[Math.floor(Math.random() * names.length)];
  const userDate = await user.create({
    name: theName,
    img: theimage,
    departement: thedep,
  });
  res.status(200).json(userDate);
};

const getUserById = async (req, res) => {
  const userDate = await user.findById(req.params.id);
  res.status(200).json(userDate);
};

module.exports = { login, getUserById };
