const auth = async (req, res, next) => {
  try {
    console.log(req.cookies.token);
    console.log(req.header);
  } catch (error) {
    res.status(401).send(error);
  }
};

export default auth;
