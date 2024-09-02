import UserModel from "../models/users";






export const addUser = async (req, res) => {
  const { username,password,Confirm,email } = req.body;

  const user = InComeModel({
      username,
      password,
      Confirm
  });
    
res.send(req.body)
};
