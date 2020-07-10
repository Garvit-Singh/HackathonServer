const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: { type: String, required: true },
	desc: { type: String, required: true },
	borrow: { type: Boolean, required: true },
	price: { type: Number },
	comments: [ { body: String, date: Date } ],
	status: { type: String, required: true },
	buyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Product', productSchema);
