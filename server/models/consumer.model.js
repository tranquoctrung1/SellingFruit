const ConnectDB = require('../db/connect');
const mongo = require('mongodb');
const StaffConsumerModel = require('../models/staffConsumer.model');

const ConsumerCollection = 'consumer';

module.exports.Consumer = class Consumer {
    constructor(
        consumerId,
        consumerName,
        staffId,
        staffName,
        address,
        phoneNumber,
        note,
    ) {
        this.consumerId = consumerId;
        this.consumerName = consumerName;
        this.staffId = staffId;
        this.staffName = staffName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.note = note;
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ConsumerCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getConsumerByStaffId = async (role, staffId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ConsumerCollection);

    let result = [];

    if (role === 'admin') {
        result = await collection.find({}).toArray();
    } else {
        if (staffId != null && staffId != undefined && staffId != '') {
            let temp = await StaffConsumerModel.getListConsumerByStaffId(
                staffId,
            );
            if (temp.length > 0) {
                if (temp[0].consumerId.length > 0) {
                    result = await collection
                        .find({
                            consumerId: { $in: temp[0].consumerId },
                        })
                        .toArray();
                }
            }
        }
    }

    Connect.disconnect();

    return result;
};

module.exports.getConsumerByConsumerId = async (consumerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ConsumerCollection);

    let result = await collection.find({ consumerId: consumerId }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ConsumerCollection);

    let check = await collection
        .find({ consumerId: data.consumerId })
        .toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection
                .find({ consumerId: data.consumerId })
                .toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ConsumerCollection);

    const result = await collection.updateMany(
        { consumerId: data.consumerId },
        {
            $set: {
                consumerName: data.consumerName,
                staffId: data.staffId,
                staffName: data.staffName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                note: data.note,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (consumerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ConsumerCollection);

    let result = await collection.deleteMany({ consumerId: consumerId });

    Connect.disconnect();

    return result.deletedCount;
};
