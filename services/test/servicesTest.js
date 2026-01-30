const { deductStock } = require("../stockServices");
const Product = require("../../models/Product");

jest.mock("../../models/Product");

describe("deductStock Service Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error if productId or quantity is invalid", async () => {
    await expect(deductStock(null, 5)).rejects.toThrow(
      "Invalid product or quantity",
    );
    await expect(deductStock("p1", 0)).rejects.toThrow(
      "Invalid product or quantity",
    );
  });

  it("should throw error if stock is insufficient or product not found", async () => {
    Product.findOneAndUpdate.mockResolvedValue(null);

    await expect(deductStock("p1", 10)).rejects.toThrow(
      "Insufficient stock or product not found",
    );

    expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "p1", stock: { $gte: 10 } },
      { $inc: { stock: -10 } },
      { new: true },
    );
  });

  it("should deduct stock successfully", async () => {
    const mockProduct = { _id: "p1", stock: 5 };
    Product.findOneAndUpdate.mockResolvedValue(mockProduct);

    const result = await deductStock("p1", 3);

    expect(result).toEqual(mockProduct);
    expect(Product.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "p1", stock: { $gte: 3 } },
      { $inc: { stock: -3 } },
      { new: true },
    );
  });
});
