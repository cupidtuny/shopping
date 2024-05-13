import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    image: String,
    salt: {
        type: String
    }
});

userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
    if (!this.password) {
        next();
    } else {
        this.password = this.hashPassword(this.password);
        next();
    }
});
export default mongoose.model('User', userSchema);
