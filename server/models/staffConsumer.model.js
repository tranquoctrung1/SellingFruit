const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const StaffConsumerCollection = 'staffConsumer';

module.exports.StaffConsumer = class StaffConsumer {
    constructor(staffId, consumerId) {
        (this.staffId = staffId), (this.consumerId = consumerId);
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffConsumerCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffConsumerCollection);

    await collection.deleteMany({ staffId: data.staffId });

    let temp = [];
    temp.push(data);

    let result = await collection.insertMany(temp);

    Connect.disconnect();

    return result.insertedCount;
};
