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
            message: 'Invalid Email'
        }
    },
    thoughts: [
        // ids reference thought model
    ],
    friends: [
        // ids reference user model
    ]
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