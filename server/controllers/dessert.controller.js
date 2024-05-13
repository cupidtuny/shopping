import Dessert from '../models/dessert.model.js';

const newAdd = async (req, res) => {
    try {
        const { dessert, calory, fat, carb, protein } = req.body.temp;

        const newDessert = new Dessert({
            dessert: dessert,
            calory: calory,
            fat: fat,
            carb: carb,
            protein: protein
        });

        await newDessert.save().then((result) => {
            res.status(200).send({ message: 'Success', data: result });
        });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: 'Error connecting to server' });
    }
};

const getAll = async (req, res) => {
    try {
        const result = await Dessert.find({});
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: 'Error connecting to server' });
    }
};

const update = async (req, res) => {
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
            res.status(200).send({ message: 'success' });
        });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: 'Error connecting to server' });
    }
};

const deleteData = async (req, res) => {
    try {
        await Dessert.findByIdAndDelete({ _id: req.body._id }).then(() => {
            res.status(200).send({ message: 'Deleted the item!' });
        });
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: 'Error connecting to server' });
    }
};

export default { newAdd, getAll, update, deleteData };
