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
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        // ids reference user model
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
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