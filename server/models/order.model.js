const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const OrderCollection = 'order';

module.exports.Order = class Order {
    constructor(
        orderId,
        consumerId,
        consumerName,
        address,
        phoneNumber,
        numberOrder,
        dateCreated,
        totalPrice,
        receiver,
        transpoter,
        status,
        note,
    ) {
        (this.orderId = orderId),
            (this.consumerId = consumerId),
            (this.consumerName = consumerName),
            (this.address = address),
            (this.phoneNumber = phoneNumber),
            (this.numberOrder = numberOrder),
            (this.dateCreated = dateCreated),
            (this.totalPrice = totalPrice),
            (this.receiver = receiver),
            (this.transpoter = transpoter),
            (this.status = status),
            (this.note = note);
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getOrderByOrderId = async (orderId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderCollection);

    let result = await collection.find({ orderId: orderId }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderCollection);

    let check = await collection.find({ orderId: data.orderId }).toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection.find({ orderId: data.orderId }).toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderCollection);

    const result = await collection.updateMany(
        { orderId: data.orderId },
        {
            $set: {
                consumerId: data.consumerId,
                consumerName: data.consumerName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                numberOrderId: data.numberOrderId,
                dateCreated: data.dateCreated,
                totalPrice: data.totalPrice,
                receiverId: data.receiver,
                transpoter: data.transpoter,
                status: data.status,
                note: data.note,
            },
        },
    );

    Connect.disconnect();

    return result;
};

module.exports.Delete = async (orderId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderCollection);

    let result = await collection.deleteMany({ orderId: orderId });

    Connect.disconnect();

    return result;
};
