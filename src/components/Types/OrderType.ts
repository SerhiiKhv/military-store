import {DeliveryType} from "@/components/Types/DeliveryType";

export type OrderType = {
    userId: string
    shopItems: any
    contactInformation: {
        name: String,
        email: String,
        phone: String,
    }
    delivery: DeliveryType,
    payment: String
    status: Boolean
    _id?: string,
    orderNumber?: number,
    price: number
}
