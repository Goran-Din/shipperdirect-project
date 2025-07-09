const { onUserCreate } = require("firebase-functions/v2/auth");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onNewUserCreate = onUserCreate(async (event) => {
  const user = event.data;
  const uid = user.uid;

  console.log(`v2: Creating organization profile for new user: ${uid}`);

  const organizationProfile = {
    ownerId: uid,
    organizationName: "New Organization",
    powerUnits: 0,
    equipmentTypes: [],
    baseLocation: "",
    preferredLanes: [],
    preferredCommodities: [],
    subscriptionTier: "Simple User",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await admin.firestore().collection("organizations").doc(uid).set(organizationProfile);
    console.log(`Successfully created organization profile for user: ${uid}`);
  } catch (error) {
    console.error(`Error creating organization profile for user: ${uid}`, error);
  }
});
