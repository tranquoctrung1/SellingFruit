const ConnectDB = require('../db/connect');
const mongo = require('mongodb');
const bcrypt = require('bcryptjs');

const UserCollection = 'user';

module.exports.User = class User {
    constructor(username, password, staffId, role) {
        (this.username = username),
            (this.password = password),
            (this.staffId = staffId),
            (this.role = role);
    }
};

module.exports.getAll = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.find({}).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetUserByUserName = async (username) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.find({ username: username }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let check = await collection.find({ username: data.username }).toArray();

    if (check.length <= 0) {
        let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT || 10));
        let password = bcrypt.hashSync(data.password, salt);

        data.password = password;

        let temp = [];
        temp.push(data);

        let result = await collection.insertMany(temp);

        if (result.insertedCount >= 1) {
            return await collection.find({ username: data.username }).toArray();
        }

        Connect.disconnect();

        return result;
    }

    return 0;
};

module.exports.Update = async (data) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let salt = bcrypt.genSaltSync(parseInt(process.env.GEN_SALT || 10));
    let password = bcrypt.hashSync(data.password, salt);

    data.password = password;

    const result = await collection.updateMany(
        { username: data.username },
        {
            $set: {
                password: data.password,
                staffId: data.staffId,
                role: data.role,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (username) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(UserCollection);

    let result = await collection.deleteMany({ username: username });

    Connect.disconnect();

    return result.deletedCount;
};
