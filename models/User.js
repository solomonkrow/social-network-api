const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
    username: {
        type: String, 
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: ,
            message: 'Invalid Email'
        }
    },
    thoughts: [],
    friends: []
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.users.length;
});

const User = model('user', userSchema);

module.exports = User;