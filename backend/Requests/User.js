const { User } = require("../sequelize");
const bcrypt = require("bcrypt");

module.exports.signUp = async function (req, res) {
  try {
    const { email, password } = req.body.user;

    const validate = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!!validate) {
      const checkUserEmail = await checkEmail(email);

      if (checkUserEmail) {
        res.status(404).json({
          message: "Email already taken",
        });
      } else {
        await User.sync({ alter: true });

        const salt = bcrypt.genSaltSync(10);
        const bcryptPassword = bcrypt.hashSync(password, salt);

        const new_user = await User.create({
          email: email,
          password: bcryptPassword,
        });
        await new_user.save();

        res.status(200).json({
          userDetails: {
            id: new_user.dataValues.id,
            email: new_user.dataValues.email,
          },
        });
      }
    } else {
      res.status(404).json({
        message: "Email is incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports.signIn = async function (req, res) {
  try {
    const { email, password } = req.body.user;

    const validate = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!!validate) {
      const user = await checkEmail(email);

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) {
        res.status(404).json({
          message: "Wrong password",
        });
      } else {
        res.status(200).json({
          userDetails: {
            id: user.id,
            email: user.email,
          },
        });
      }
    } else {
      res.status(404).json({
        message: "Email is incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

checkEmail = async function (email) {
  const result = await User.findOne({ where: { email: email }, raw: true });
  if (result === null) return false;
  else if (result.email === email) return result;
};
