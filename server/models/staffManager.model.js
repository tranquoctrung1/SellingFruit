const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const StaffManagerCollection = 'staffManager';

module.exports.StaffManager = class StaffManager {
    constructor(staffManagerId, fullname, address, phone) {
        this.staffManagerId = staffManagerId;
        this.fullname = fullname;
        this.address = address;
        this.phone = phone;
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffManagerCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getStaffManagerByStaffManagerId = async (staffManagerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffManagerCollection);

    let result = await collection
        .find({ staffManagerId: staffManagerId })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffManagerCollection);

    let check = await collection
        .find({ staffManagerId: data.staffManagerId })
        .toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection
                .find({ staffManagerId: data.staffManagerId })
                .toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffManagerCollection);

    const result = await collection.updateMany(
        { staffManagerId: data.staffManagerId },
        {
            $set: {
                fullname: data.fullname,
                address: data.address,
                phone: data.phone,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (staffManagerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffManagerCollection);

    let result = await collection.deleteMany({
        staffManagerId: staffManagerId,
    });

    Connect.disconnect();

    return result.deletedCount;
};
