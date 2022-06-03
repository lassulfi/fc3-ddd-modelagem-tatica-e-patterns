import NotificationError from "../../../domain/@shared/notification/notification.error";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-objects/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const address = new Address("Street", 123, "zip", "city");
const customer = CustomerFactory.createWithAddress("John", address);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const findCustomerSpy = jest
      .spyOn(customerRepository, "find")
      .mockReturnValue(Promise.resolve(customer));

    const upateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await upateCustomerUseCase.execute(input);

    expect(output).toStrictEqual(input);
    expect(findCustomerSpy).toHaveBeenCalledWith(customer.id);
  });

  it("should thrown an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const findCustomerSpy = jest
      .spyOn(customerRepository, "find")
      .mockReturnValue(Promise.resolve(customer));

    const upateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(upateCustomerUseCase.execute(input)).rejects.toThrow(
      new NotificationError([
        {
          message: "Name is required",
          context: "customer",
        },
      ])
    );
    expect(findCustomerSpy).toHaveBeenCalledWith(customer.id);
  });

  it("should thrown an error when address is missing", async () => {
    const customerRepository = MockRepository();
    const findCustomerSpy = jest
      .spyOn(customerRepository, "find")
      .mockReturnValue(Promise.resolve(customer));

    const upateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    input.name = "John Updated";
    input.address.street = "";

    await expect(upateCustomerUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
    expect(findCustomerSpy).toHaveBeenCalledWith(customer.id);
  });
});
