export const ticketDTO = (ticket) => ({
  code: ticket.code,
  amount: ticket.amount,
  purchaser: ticket.purchaser,
  purchase_datetime: ticket.purchase_datetime,
});
