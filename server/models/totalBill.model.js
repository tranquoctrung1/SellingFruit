const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const TotaBillCollection = 'totalBill';

module.exports.TotalBill = class TotalBill {
    constructor(id, total) {
        this.id = id;
        this.total = total;
    }
};

module.exports.getTotalBill = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(TotaBillCollection);

    let result = await collection.find({ id: 'selling' }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Update = async (total) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(TotaBillCollection);

    const result = await collection.updateMany(
        { id: 'selling' },
        {
            $set: {
                total: total,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};
