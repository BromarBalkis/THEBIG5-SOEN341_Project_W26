
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { fullName, username, dietaryPreferences, allergies } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        username,
      },
    });

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        dietPreferences: dietaryPreferences || [],
        allergies: allergies || [],
      },
      create: {
        userId,
        dietPreferences: dietaryPreferences || [],
        allergies: allergies || [],
      },
    });
  
    res.json({
      ...updatedUser,
      dietaryPreferences: updatedProfile.dietPreferences || [],
      allergies: updatedProfile.allergies || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      ...user,
      dietaryPreferences: user.profile?.dietPreferences || [],
      allergies: user.profile?.allergies || [],
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

