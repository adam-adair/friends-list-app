const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/friends', {
    logging: false
})

const Friend = db.define("friend", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: STRING,
    score: INTEGER
});

const syncAndSeed = async () => {
    try{
        await db.sync({force:true});
        console.log('It synced!')
        const friends = [{
            name: 'Ross',
            score: 10,
            },{
            name: 'Monica',
            score: 9,
            }]
        await Promise.all(friends.map(friend => Friend.create(friend)));
        console.log('It seeded!')
    } catch(er) {
      console.log(er)
    }
  }

module.exports = { db, Friend, syncAndSeed }
