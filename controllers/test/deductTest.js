const { deductStockController } = require("../saleController");
const { deductStock } = require("../../services/stockServices");

jest.mock("../../services/stockServices");

describe("deductStockController Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 400 if quantity is <= 0", async () => {
    req.body = { productId: "p1", quantity: 0 };

    await deductStockController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Quantity must be greater than zero",
    });
  });

  it("should return error if stock is insufficient", async () => {
    req.body = { productId: "p1", quantity: 5 };
    deductStock.mockResolvedValue({ stock: -1 });

    await deductStockController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Insufficient stock",
    });
  });

  it("should deduct stock successfully", async () => {
    req.body = { productId: "p1", quantity: 2 };
    deductStock.mockResolvedValue({ stock: 8 });

    await deductStockController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Stock deducted successfully",
      remainingStock: 8,
    });
  });
});
