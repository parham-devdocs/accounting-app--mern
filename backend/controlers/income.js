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

export const editIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const { id } = req.params;

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const updatedData = await InComeModel.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Data updated", data: updatedData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong on the server!" });
  }
};


export const aggregateIncomes = async (req, res) => {
  const date = new Date();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  try {
    const items = await InComeModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$category", // Group by the category field

          value: { $sum: "$amount" }, // Sum the amount for the Housing category
        },
      },
    ]);
    const modifiedItems = [];
    items.map((item) => {
      modifiedItems.push({ label: item._id, value: item.value, id: item._id });
    });
    res.status(201).json({message:modifiedItems})
  } catch (error) {
    res.status(500).json({message:"something wrong happend in the server"})
  }
  
};
