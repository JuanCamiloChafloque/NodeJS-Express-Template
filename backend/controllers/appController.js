const { StatusCodes } = require("http-status-codes");

//@desc     Get home message
//@route    GET /api/v1/app
//@access   public
exports.getHome = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Home App successfully rendered!",
  });
};
