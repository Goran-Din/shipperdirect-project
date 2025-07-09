const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onNewUserCreate = functions.auth.user().onCreate((user) => {
  console.log(`v1: Creating organization profile for user: ${user.uid}`);
  const organizationProfile = {
    ownerId: user.uid,
    organizationName: "New Organization",
    powerUnits: 0,
    equipmentTypes: [],
    baseLocation: "",
    preferredLanes: [],
    preferredCommodities: [],
    subscriptionTier: "Simple User",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  return admin.firestore().collection("organizations").doc(user.uid).set(organizationProfile);
});
