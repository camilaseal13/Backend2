import Ticket from "../models/Ticket.js";

export default class TicketsDAO {
  static async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return ticket.save();
  }
}
