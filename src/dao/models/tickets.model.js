const mongoose = require("mongoose")
const {v4: uuidv4} = require("uuid")

const ticketsColl = "tickets"
const ticketsSchema = new mongoose.Schema({
    code: { type: String, unique: true, default: uuidv4, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
}, { timestamps: {createdAt: "purchase_datetime", updatedAt: false} })


const modeloTickets = mongoose.model(ticketsColl, ticketsSchema)
module.exports = {modeloTickets}