import TicketsRepository from "../repositories/tickets.repository.js";
import { v4 as uuidv4 } from "uuid";

export default class PurchaseService {
  static async purchaseCart(user, cart) {
    if (!cart.products || cart.products.length === 0)
      throw new Error("Carrito vacío");

    let totalAmount = 0;
    for (const item of cart.products) {
      if (item.product.stock >= item.quantity) {
        item.product.stock -= item.quantity;
        totalAmount += item.product.price * item.quantity;
        await item.product.save();
      } else {
        throw new Error(`Stock insuficiente para ${item.product.title}`);
      }
    }

    const ticket = await TicketsRepository.createTicket({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: user.email,
    });

    return { status: "success", ticket };
  }
}
