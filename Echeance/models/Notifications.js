var mongoose = require("mongoose");

var NotificationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  /** *********************       NotificationTontine **************************************** */

  IdTontine: {
    type: String,
    required: false,
  },
  NomTontine: {
    type: String,
    required: false,
  },
  TypeNotification: {
    type: String,
    required: false,
  },
  DateTontine: {
    type: Number,
    required: false,
  },
  Ordre: {
    type: Number,
    required: false,
  },
  Cumule: {
    type: Number,
    required: false,
  },
  Iteration: {
    type: Number,
    required: false,
  },
  Montant: {
    type: Number,
    required: false,
  },
  DateNotif: {
    type: Number,
    required: false,
  },
  /** *********************       Notification PDL **************************************** */
  idPret: {
    type: String,
    required: false,
  },
  idEcheance: {
    type: String,
    required: false,
  },
  borrower: {
    type: String,
    required: false,
  },
  intermediate: {
    type: String,
    required: false,
  },
  montant: {
    type: Number,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
  dateLimite: {
    type: Number,
    required: false,
  },
  DateLancement: {
    type: Number,
    required: false,
  },

  vu: {
    type: Boolean,
    required: true,
    default: false,
  },
  elimine: {
    type: Boolean,
    required: true,
    default: false,
  },
  /** *********************       NotificationTransfert **************************************** */

  senderT: {
    type: String,
    required: false,
  },
  borrower: {
    type: String,
    required: false,
  },
  fnamesenderT: {
    type: String,
    required: false,
  },
  namesenderT: {
    type: String,
    required: false,
  },
  TransferDate: {
    type: Number,
    required: false,
  },
  amountT: {
    type: Number,
    required: false,
  },
  /** *********************       NotificationTransfert **************************************** */
  idCredit: {
    type: String,
    required: false,
  },
});

var NotificationS = mongoose.model("NotificationS", NotificationSchema);
module.exports = NotificationS;
