const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DessertSchema = new Schema({
   dessert:{
    type:String,
    default:"",
   },
   calory:{
    type:Number,
    default:0
   },
   fat:{
    type:Number,
    default:0
   },
   carb:{
    type:Number,
    default:0
   },
   protein:{
    type:Number,
    default:0
   },
   createAt:{
    type:Date,
    default:Date.now()
   },
   updateAt:{
    type:Date,
    default:Date.now()
   }
});

module.exports = mongoose.model('Dessert', DessertSchema);