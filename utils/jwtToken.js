// Create token and saving in cookie
const NODE_ENV = process.env.NODE_ENV;

console.log(NODE_ENV);
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
    
  //option for cookie
// options for cookie
  const options = {

    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
 secure: NODE_ENV === "prodution" ? true : false,
    httpOnly: NODE_ENV === "production" ? true : false,
  };

  res.status(statusCode).cookie("access_token", token, options).send({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
