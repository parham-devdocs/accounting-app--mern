import InComeModel from "../models/incomeModel.js"

export const addIncome =async (req,res) => {
    const { title, amount, category, description, date } = req.body
    
    const income = InComeModel({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({message:"all fields are required"})
        }
        if (amount<=0 || !amount==="number") {
            return res.status(400).json({message:"amount must be a positive number"})
        }
        await income.save()
        res.status(201).json(income)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "something went wrong in the server!" })
        
    }
}





export const getIncomes = async(req,res) => {
    
    
    try {
            const incomes = await InComeModel.find().sort({createdAt:-1});
res.status(200).send(incomes)
    } catch (error) {
        console.log(error.message)
                res
                  .status(500)
                  .json({ error: "something went wrong in the server!" });

    }

}





export const deleteIncome = async (req, res) => {
const {id}=req.params
  try {
      const deletedIncome = await InComeModel.findByIdAndDelete
          (id);
      if (!deletedIncome) {
         return res.status(404).json({ message: "Income not found" });
      }
                 console.log(id);

    res.status(200).json({message:"income deleted"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "something went wrong in the server!" });
  }
};