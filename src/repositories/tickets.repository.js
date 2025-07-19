import TicketsDAO from "../dao/tickets.dao.js";

export default class TicketsRepository {
  static async createTicket(ticketData) {
    return TicketsDAO.create(ticketData);
  }
}
