const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');


const offerSchema = mongoose.Schema(
    {
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        adId: { type: mongoose.Types.ObjectId, required: true },
        userId: { type: mongoose.Types.ObjectId, required: true },
        accepted: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);



offerSchema.plugin(toJSON);
offerSchema.plugin(paginate);

offerSchema.statics.isOfferTaken = async function (offer, excludeUserId) {
  const offers = await this.findOne({ offer, _id: { $ne: excludeUserId } });
  return !!offers;
};

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
