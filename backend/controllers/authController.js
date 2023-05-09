const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/BadRequestError");
const UnathenticatedError = require("../errors/UnauthenticatedError");

//@desc     Register a user
//@route    POST /api/v1/auth/register
//@access   public
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({ firstName, lastName, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token: token,
  });
};

//@desc     Login a user
//@route    POST /api/v1/auth/login
//@access   public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnathenticatedError("Invalid Credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnathenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token: token,
  });
};

//@desc     Update logged-in user info
//@route    POST /api/v1/auth/update
//@access   protected
exports.updateUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token: token,
  });
};
