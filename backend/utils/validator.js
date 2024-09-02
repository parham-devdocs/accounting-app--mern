const  validate = (schema) => async (req, res, next) => {
  const { Username, Email, Password, Confirm } = req.body;
  try {
    await schema.validate({
      Username,
      Email,
      Password,
      Confirm,
    });
    console.log(Username);
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

export default validate