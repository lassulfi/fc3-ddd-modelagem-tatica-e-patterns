import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class CustomerChangedAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: CustomerChangedAddressEvent): void {
        const {id, name, address} = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name}, alterado para ${address}`)
    }

}