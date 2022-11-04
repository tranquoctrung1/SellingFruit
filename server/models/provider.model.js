const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const ProviderCollection = 'provider';

module.exports.Provider = class Provider {
    constructor(providerId, providerName, address, staffId, phoneNumber, note) {
        (this.providerId = providerId),
            (this.providerName = providerName),
            (this.address = address),
            (this.staffId = staffId),
            (this.phoneNumber = phoneNumber),
            (this.note = note);
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProviderCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getProviderByProviderId = async (providerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProviderCollection);

    let result = await collection.find({ providerId: providerId }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProviderCollection);

    let check = await collection
        .find({ providerId: data.providerId })
        .toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection
                .find({ providerId: data.providerId })
                .toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProviderCollection);

    const result = await collection.updateMany(
        { providerId: data.providerId },
        {
            $set: {
                providerName: data.providerNames,
                address: data.address,
                staffId: data.staffId,
                phoneNumber: data.phoneNumber,
                note: data.note,
            },
        },
    );

    Connect.disconnect();

    return result;
};

module.exports.Delete = async (providerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ProviderCollection);

    let result = await collection.deleteMany({ providerId: providerId });

    Connect.disconnect();

    return result;
};
