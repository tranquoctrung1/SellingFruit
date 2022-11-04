const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const OrderDetailCollection = 'orderdetail';

module.exports.OrderDetail = class OrderDetail {
    constructor(orderId, productId, productName, amount, price, note) {
        (this.orderId = orderId),
            (this.productId = productId),
            (this.productName = productName),
            (this.amount = amount),
            (this.price = price),
            (this.note = note);
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderDetailCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getOrderDetailByOrderId = async (orderId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderDetailCollection);

    let result = await collection.find({ orderId: orderId }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderDetailCollection);

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
    await this.Delete(data.orderId);

    return await this.Insert(data);
};

module.exports.Delete = async (orderId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(OrderDetailCollection);

    let result = await collection.deleteMany({ orderId: orderId });

    Connect.disconnect();

    return result;
};
