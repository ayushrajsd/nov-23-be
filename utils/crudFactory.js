const checkInput = function (req, res, next) {
  const details = req.body;
  const isEmpty = Object.keys(details).length === 0;
  if (isEmpty) {
    res.status(400).json({
      message: "error",
      data: "Input fields cannot be empty",
    });
  } else {
    next();
  }
};

/** Route handlers */

const getAllFactory = (elementModel) =>
  async function (req, res) {
    try {
      const data = await elementModel.find();
      if (data.length === 0) {
        throw new Error("No data found");
      } else {
        res.status(200).json({
          message: "success",
          data: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "error",
        data: err.message,
      });
    }
  };

const createFactory = (elementModel) =>
  async function (req, res) {
    try {
      const details = req.body;
      const data = await elementModel.create(details);
      res.status(200).json({
        message: "data was created successfully",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        message: "error",
        data: err.message,
      });
    }
  };

const getElementByIdFactory = (elementModel) =>
  async function (req, res) {
    try {
      const { id } = req.params; // 1234
      const data = await elementModel.findById(id);
      if (!data) {
        // throw new Error("No data found");
        res.status(404).json({
            message: "error",
            data: "No data found",
        })
      } else {
        res.status(200).json({
          message: "success",
          data: data,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "error",
        data: err.message,
      });
    }
  };

const updateElementByIdFactory = (elementModel) => async function (req, res) {
  try {
    const { id } = req.params;
    const details = req.body;
    const updatedData = await elementModel.findByIdAndUpdate(id, details, {
      new: true,
    });
    if (!updatedData) {
      throw new Error("No user found");
    } else {
      res.status(200).json({
        message: "data was updated successfully",
        data: updatedData,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

const deleteElementByIdFactory = (elementModel) => async function (req, res) {
  try {
    const { id } = req.params;
    const deletedData = await elementModel.findByIdAndDelete(id);
    if (!deletedData) {
      throw new Error("No data found");
    } else {
      res.status(200).json({
        message: "data was deleted successfully",
        data: deletedData,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message,
    });
  }
}

module.exports = {
    getAllFactory,
    createFactory,
    getElementByIdFactory,
    updateElementByIdFactory,
    deleteElementByIdFactory,
  checkInput,
};
