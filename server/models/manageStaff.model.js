const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const ManageStaffCollection = 'manageStaff';

module.exports.ManageStaff = class ManageStaff {
    constructor(staffManagerId, staffId) {
        this.staffManagerId = staffManagerId;
        this.staffId = staffId;
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ManageStaffCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.getListStaffByStaffManagerId = async (staffManagerId) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ManageStaffCollection);

    let result = await collection
        .find({ staffManagerId: staffManagerId })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(ManageStaffCollection);

    await collection.deleteMany({ staffManagerId: data.staffManagerId });

    let temp = [];
    temp.push(data);

    let result = await collection.insertMany(temp);

    Connect.disconnect();

    return result.insertedCount;
};
