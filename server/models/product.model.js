const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const ProductCollection = 'product';

module.exports.Product = class Product {
    constructor(productId, productName, unit, price, note) {
        (this.productId = productId),
            (this.productName = productName),
            (this.unit = unit),
            (this.price = price),
            (this.note = note);
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProductCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getProductByProductId = async (productId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProductCollection);

    let result = await collection.find({ productId: productId }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProductCollection);

    let check = await collection.find({ productId: data.productId }).toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection
                .find({ productId: data.productId })
                .toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProductCollection);

    const result = await collection.updateMany(
        { productId: data.productId },
        {
            $set: {
                productId: data.productId,
                productName: data.productName,
                unit: data.unit,
                price: data.price,
                note: data.note,
            },
        },
    );

    Connect.disconnect();

    return result;
};

module.exports.Delete = async (productId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProductCollection);

    let result = await collection.deleteMany({ productId: productId });

    Connect.disconnect();

    return result;
};
