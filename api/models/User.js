const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: { type: String, required: true },
	bitsID: { type: String, required: true },
	password: { type: String, required: true},
	Hostel: { type: String, required: true },
	room_no: { type: String, required: true },
	products: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } ]
});

module.exports = mongoose.model('User', userSchema);
