const User = require('../models/users');

const getUsersWithRegistrationStatus = async (req, res) => {
  try {
    const usersWithStatus = await User.aggregate([
      {
        $lookup: {
          from: "registrations",
          localField: "_id",
          foreignField: "userId",
          as: "registrations"
        }
      },
      {
        $project: {
          name: { $concat: ["$firstName", " ", "$lastName"] },
          email: 1,
          rollNumber: 1,
          registrationInfo: {
            $cond: {
              if: { $gt: [{ $size: "$registrations" }, 0] },
              then: {
                id: { $arrayElemAt: ["$registrations._id", 0] },
                status: { $arrayElemAt: ["$registrations.registrationStatus", 0] },
                paymentStatus: { $arrayElemAt: ["$registrations.paymentStatus", 0] },
                qrCode: { $arrayElemAt: ["$registrations.qrCode", 0] },
                registeredAt: { $arrayElemAt: ["$registrations.registeredAt", 0] }
              },
              else: "Not Registered"
            }
          }
        }
      }
    ]);

    res.status(200).json({ users: usersWithStatus });
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUsersWithRegistrationStatus };
