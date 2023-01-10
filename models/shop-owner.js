
const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const shopOwnerSchema = new Schema({
    shop_name: { type: String, required: true },
    owner_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    license: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    equipments: { type: String, required: true },
    category: { type: String, required: true },
    password: { type: String, required: true }
})

shopOwnerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

shopOwnerSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

const shopOwnerModel = model('shopowner', shopOwnerSchema)

module.exports = shopOwnerModel;
