import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });
    it("should throw error when customer id is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });
    it("should throw error when item list is empty", () => {
        expect(() => {
            const order = new Order("123", "123", []);
        }).toThrowError("Items are required");
    });
    it("should calculate total", () => {
        const item1 = new OrderItem("i1", "Item 1", 100);
        const item2 = new OrderItem("i2", "Item 2", 200);
        const order1 = new Order("o1", "c1", [item1]);
        const total1 = order1.total();

        expect(total1).toBe(100);

        const order2 = new Order("o2", "c2", [item1, item2]);
        const total2 = order2.total();
        expect(total2).toBe(300);
    })
});