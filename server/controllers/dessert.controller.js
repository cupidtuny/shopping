const Dessert = require('../models/dessert.model');

exports.newAdd = async (req, res) => {
  try {
    const { dessert, calory, fat, carb, protein } = req.body.data;

    const newDessert = new Dessert({
      dessert: dessert,
      calory: calory,
      fat: fat,
      carb: carb,
      protein: protein
    });

    await newDessert.save().then(() => {
      res.status(200).send('Success');
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'Error connecting to server' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Dessert.find({});
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'Error connecting to server' });
  }
};

exports.update = async (req, res) => {
  try {
    const { _id, dessert, calory, fat, carb, protein } = req.body.data;

    await Dessert.findByIdAndUpdate(
      { _id: _id },
      {
        dessert: dessert,
        calory: calory,
        fat: fat,
        carb: carb,
        protein: protein
      }
    ).then(() => {
      res.status(200).send('success');
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'Error connecting to server' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Dessert.findByIdAndDelete({ _id: req.body._id }).then(() => {
      res.status(200).send('Deleted the item!');
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'Error connecting to server' });
  }
};
