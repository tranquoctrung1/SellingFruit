const ConnectDB = require('../db/connect');
const mongo = require('mongodb');
const TotalBillModel = require('./totalBill.model');
const OrderDetailModel = require('./orderdetail.model');

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

module.exports.getBigestNumberOrder = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderCollection);

    let result = await collection
        .find({})
        .sort({ numberOrder: -1 })
        .limit(1)
        .toArray();

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

    let bigestNumberOrder = await TotalBillModel.getTotalBill();

    let listOrderDetail = [...data.listOrderDetail];

    delete data.listOrderDetail;

    let total;
    if (bigestNumberOrder.length > 0) {
        data.numberOrder = bigestNumberOrder[0].total + 1;
        total = data.numberOrder;
    } else {
        data.numberOrder = 1;
        total = 1;
    }

    data.orderId = `${data.orderId}_${data.numberOrder}`;
    data.dateCreated = new Date(data.dateCreated);
    data.dateCreated.setHours(data.dateCreated.getHours() + 7);

    for (let item of listOrderDetail) {
        item.orderId = data.orderId;
    }

    let temp = [];
    temp.push(data);

    let result = await collection.insertMany(temp);

    if (result.insertedCount >= 1) {
        await TotalBillModel.Update(total);
        await OrderDetailModel.Insert(listOrderDetail);
        result = await collection.find({ orderId: data.orderId }).toArray();
    }

    Connect.disconnect();

    return result;
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
