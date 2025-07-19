import PurchaseService from "../services/purchase.service.js";

export const purchase = async (req, res) => {
  try {
    const result = await PurchaseService.purchaseCart(req.user, req.body.cart);
    res.send(result);
  } catch (error) {
    res.status(400).send({ status: "error", message: error.message });
  }
};
