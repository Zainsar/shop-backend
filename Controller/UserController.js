const user = require('../model/User')

const update = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString()
    }
    try {
        const updateduser = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }
        )
        res.status(200).json(updateduser)
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const deletes = async (req, res) => {
    try {
        await user.findByIdAndDelete(req.params.id,)
        res.status(200).json({
            message: 'User Has been Deleted....'
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getuser = async (req, res) => {
    try {
        const getuser = await user.findById(req.params.id)
        const { password, ...others } = getuser._doc;
        res.status(200).json({
            message: { others }
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getalluser = async (req, res) => {
    const query = req.query.new
    try {
        const getusers = query ? await user.find().sort({ _id: -1 }).limit(5) : await user.find()
        res.status(200).json({
            message: { getusers }
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

const getuserstats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await user.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


module.exports = {
    update,
    deletes,
    getuser,
    getalluser,
    getuserstats
}