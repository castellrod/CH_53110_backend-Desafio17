class TicketDTO{
    constructor(ticket){
        this.code = ticket.code;
        this.purchaseDatetime = ticket.purchase_datetime;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}

module.exports = TicketDTO;