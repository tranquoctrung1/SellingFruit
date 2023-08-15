const ConnectDB = require('../db/connect');
const mongo = require('mongodb');

const RoleCollection = 'role';

module.exports.Role = class Role {
    constructor(role, name) {
        this.role = role;
        this.name = name;
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(RoleCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(RoleCollection);

    let check = await collection.find({ role: data.role }).toArray();

    if (check.length <= 0) {
        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection.find({ role: data.role }).toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(RoleCollection);

    const result = await collection.updateMany(
        { role: data.role },
        {
            $set: {
                name: data.name,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (role) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(RoleCollection);

    let result = await collection.deleteMany({ role: role });

    Connect.disconnect();

    return result.deletedCount;
};
