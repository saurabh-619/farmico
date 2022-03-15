const path = require("path");

module.exports = {
  async up(db, client) {
    await db.collection("users").updateMany(
      {},
      {
        $set: {
          profilePhoto: "src/images/avatar.jpg",
        },
      }
    );
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    await db.collection("users").updateMany(
      {},
      {
        $unset: { profilePhoto: null },
      }
    );
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
