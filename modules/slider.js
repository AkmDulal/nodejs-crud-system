const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
    fullName: {
        type: String,
        required: 'This field is required.',
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('slider', sliderSchema)
