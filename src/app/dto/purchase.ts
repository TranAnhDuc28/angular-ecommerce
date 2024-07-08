import { Address } from "../common/address";
import { Customer } from "../common/customer";
import { Order } from "../common/order";
import { OrderItem } from "../common/order-item";

export class Purchase {

    customer?: Customer;
    shippingAddress?: Address;
    billingAddress?: Address;
    order?: Order;
    orderItems?: OrderItem[];

}
