const Verify = require("./models/Verify");
const {
  sendVerificationEmail
} = require("./varificationEmail");

const generateVerificationCode =  (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Generate verification code and store it with timestamp
const generateVerificationCodeAndSave = async (email) => {
  const verificationCode = generateVerificationCode(6);
    sendVerificationEmail(email, verificationCode);
  const timestamp = Date.now(); // Current timestamp
  // Save the verification code and timestamp to the database
  await saveVerificationCodeToDatabase(email, verificationCode, timestamp);
};

// Verify user's provided code and check if it has expired
const verifyUser = async (email, providedCode) => {
  cleanupExpiredVerificationCodes();
  const storedCodeAndTimestamp = await getStoredCodeAndTimestamp(email);
  if (!storedCodeAndTimestamp) {
    // No verification code found for the user
    return false;
  }

  const { verificationCode, timestamp } = storedCodeAndTimestamp;
  if (verificationCode !== providedCode) {
    // Provided code does not match the stored code
    return false;
  }

  const currentTimestamp = Date.now();
  const codeExpirationTime = timestamp + 2 * 60 * 1000; // 2 minutes in milliseconds
  if (currentTimestamp > codeExpirationTime) {
    // Verification code has expired
    return false;
  }

  // Verification successful
  return true;
};

// Periodically clean up expired verification codes
const cleanupExpiredVerificationCodes = async () => {
  const expiredCodes = await findExpiredVerificationCodes();
  await deleteExpiredVerificationCodes(expiredCodes);
};

// Set up a timer or cron job to call cleanupExpiredVerificationCodes periodically
setInterval(cleanupExpiredVerificationCodes, 10000); // Run every minute

// Helper functions for database operations
const saveVerificationCodeToDatabase = async (
  email,
  verificationCode,
  timestamp
) => {
  // Save the verification code and timestamp to the database for the specified user
  const newVerification = new Verify({
    email: email,
    verificationCode: verificationCode,
    timestamp: timestamp,
  });

  // Save the new verification to the database
  newVerification
    .save()
    .then((savedVerification) => {
      console.log("Verification saved successfully:");
    })
    .catch((error) => {
      console.error("Error saving verification:", error);
    });
};

const getStoredCodeAndTimestamp = async (email) => {
  // Retrieve the stored verification code and timestamp from the database for the specified user
    const storedVerification = await Verify.findOne({ email: email });
    if (storedVerification) {
      return {
        verificationCode: storedVerification.verificationCode,
        timestamp: storedVerification.timestamp,
      };
    } else {
        return null;
    }
};

const findExpiredVerificationCodes = async () => {
  // Find all verification codes in the database that have expired
    const currentTimestamp = Date.now();
    const expiredCodes = await Verify.find({
      timestamp: { $lt: currentTimestamp - 2 * 60 * 1000 },
    });
    // console.log("Expired verification codes:", currentTimestamp);

    return expiredCodes;
};

const deleteExpiredVerificationCodes = async (expiredCodes) => {
  // Delete the expired verification codes from the database
    await Verify.deleteMany({ _id: { $in: expiredCodes.map((code) => code._id) } });
};


module.exports = { generateVerificationCodeAndSave, verifyUser };
