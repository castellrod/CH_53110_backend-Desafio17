const {modeloTickets} = require('./models/tickets.model');

class TicketManager {
     async getAllTickets() {
        try{
            const tickets = await modeloTickets.find();
            return tickets;
        } catch (error) {
            throw new Error('Error al obtener los tickets desde MongoDB: ' + error.message);
        }
    }

    async createTicket(data) {
        try{
            const newTicket = await modeloTickets.create(data);
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error('Error al agregar el ticket a MongoDB: ' + error.message);
        }
    }
}

module.exports = TicketManager;