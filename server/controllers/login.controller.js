const UserModel = require('../models/user.model');
const StaffModel = require('../models/staff.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.Login = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let result = await UserModel.GetUserByUserName(username);

        if (result.length > 0) {
            let dbPassword = result[0].password;
            if (bcrypt.compareSync(password, dbPassword)) {
                let staff = await StaffModel.getStaffByStaffId(
                    result[0].staffId,
                );
                let token;
                if (staff.length > 0) {
                    token = jwt.sign(
                        {
                            username: result[0].username,
                            userid: result[0]._id,
                            role: result[0].role,
                            staffId: result[0].staffId,
                            staffName: result[0].staffName,
                        },
                        process.env.JWT_KEY,
                        //{ expiresIn: "1h" }
                    );
                } else {
                    token = jwt.sign(
                        {
                            username: result[0].username,
                            userid: result[0]._id,
                            role: result[0].role,
                            staffId: result[0].staffId,
                            staffName: '',
                        },
                        process.env.JWT_KEY,
                        //{ expiresIn: "1h" }
                    );
                }

                res.status(200).json({
                    username: result[0].username,
                    role: result[0].role,
                    token: token,
                });
            } else {
                res.status(200).json({
                    error: 'Tài khoảng hoặc mật khẩu sai!!',
                });
            }
        } else {
            res.status(200).json({ error: 'Tài khoảng hoặc mật khẩu sai!!' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};
