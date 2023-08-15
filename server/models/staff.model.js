const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const StaffCollection = 'staff';

module.exports.Staff = class Staff {
    constructor(staffId, fullname, address, phone) {
        this.staffId = staffId;
        this.fullname = fullname;
        this.address = address;
        this.phone = phone;
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getStaffByStaffId = async (staffId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffCollection);

    let result = await collection.find({ staffId: staffId }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffCollection);

    let check = await collection.find({ staffId: data.staffId }).toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection.find({ staffId: data.staffId }).toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffCollection);

    const result = await collection.updateMany(
        { staffId: data.staffId },
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

module.exports.Delete = async (staffId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(StaffCollection);

    let result = await collection.deleteMany({ staffId: staffId });

    Connect.disconnect();

    return result.deletedCount;
};
