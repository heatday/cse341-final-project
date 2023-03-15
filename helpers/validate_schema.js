const mongoose = require ('mongoose');

const authSchema = new mongoose.Schema({
    NamePlant:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20
    },
    Description:{
        type: String,
        required: true,
        minlength: 50,
        maxlength: 100
    },
    Type_of_tree:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20
    },
    gender_of_tree:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20
    }

});

const validate_data = mongoose.model('validate_data', authSchema);