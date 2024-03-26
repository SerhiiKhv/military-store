export type OrderType = {
    userId: string
    shopItems: any
    contactInformation: {
        name: String,
        email: String,
        phone: String,
    }
    delivery: {
        deliveryMethod: String,
        dateDelivery: String,
        departmentNumber: String,
        firstName: String,
        surName: String,
        patronymic: String,
        address: String,
        time: String,
    },
    payment: String
    status: Boolean
}
