const Sequelize = require('sequelize');  //ea7f431b
const sequelize = new Sequelize('ibmx_b408cc958e7e253', 'b9ca23b657906d', '', {
    host: 'us-cdbr-sl-dfw-01.cleardb.net',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialect: 'mysql'
});

// Authentication
sequelize.authenticate()
    .then(function () {
        console.log('CONNECTED')
    })
    .catch(function (err) {
        console.log('CONNECTION PROBLEM')
    })
    .done();

/***** Crisis *****/

const Crisis = sequelize.define('crisis', {
    CrisisID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: Sequelize.STRING,
    Type: Sequelize.STRING,
    Level: Sequelize.STRING,
    Description: Sequelize.STRING,
    Status: Sequelize.STRING,
    Mode: Sequelize.STRING
});

const Crisis_cell = sequelize.define('crisis-cell', {
    CrisisCellID : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Title: Sequelize.STRING
});

const Press_release = sequelize.define('press-release', {
   PR_ID: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   Title: Sequelize.STRING,
   Content: Sequelize.TEXT,
   Date: Sequelize.DATE
});

const Newsfeed = sequelize.define('newsfeed', {
   NewsFeedID: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   Title: Sequelize.STRING,
   Type: Sequelize.STRING,
   Description: Sequelize.STRING,
   Date: Sequelize.DATE
});

/***** Members *****/

const Member = sequelize.define('member', {
    MemberID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    FirstName: Sequelize.STRING,
    LastName: Sequelize.STRING,
    Availibity: Sequelize.STRING,
    TelNum: Sequelize.STRING,
    TimeZone: Sequelize.STRING,
    Location: Sequelize.STRING,
    isExpert: Sequelize.BOOLEAN,
    Expertise: Sequelize.STRING,
    Function: Sequelize.STRING
});

const Role = sequelize.define('role', {
    RoleID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    RoleName: Sequelize.STRING
});

/***** Meeting *****/

const Meeting = sequelize.define('meeting', {
    MeetingID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    StartDate: Sequelize.DATE,
    EndDate: Sequelize.DATE,
    CallID: Sequelize.INTEGER,
    Topic: Sequelize.STRING,
    Description: Sequelize.STRING
});

/***** Entités ******/

const Maison = sequelize.define('maison', {
   MaisonID: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   Title: Sequelize.STRING
});

const Brand = sequelize.define('brand', {
   BrandID: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   Title: Sequelize.STRING
});

const Region = sequelize.define('region', {
   RegionID: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   Title: Sequelize.STRING
});

Crisis.belongsTo(Crisis_cell);
Meeting.belongsTo(Crisis);

Crisis.belongsToMany(Member, {through: 'crisis-to-experts'});
Member.belongsToMany(Crisis, {through: 'crisis-to-experts'});

Crisis.belongsToMany(Member, {through: 'crisis-to-PTI'});
Member.belongsToMany(Crisis, {through: 'crisis-to-PTI'});

Crisis.belongsToMany(Member, {through: 'crisis-to-partner'});
Member.belongsToMany(Crisis, {through: 'crisis-to-partner'});

Crisis_cell.belongsToMany(Member, {through: 'crisis-cell-to-members'});
Member.belongsToMany(Crisis_cell, {through: 'crisis-cell-to-members'});

Member.belongsToMany(Meeting, {through: 'meeting-to-member'});
Meeting.belongsToMany(Member, {through: 'meeting-to-member'});

Member.belongsToMany(Meeting, {through: 'meeting-to-partner'});
Meeting.belongsToMany(Member, {through: 'meeting-to-partner'});

Member.belongsToMany(Meeting, {through: 'meeting-to-expert'});
Meeting.belongsToMany(Member, {through: 'meeting-to-expert'});

Member.belongsToMany(Newsfeed, {through: 'newsfeed-to-member'});
Newsfeed.belongsToMany(Member, {through: 'newsfeed-to-member'});

Member.belongsToMany(Press_release, {through: 'PR-to-member'});
Press_release.belongsToMany(Member, {through: 'PR-to-member'});







module.exports = {
    sequelize,
    Crisis,
    Crisis_cell,
    Press_release,
    Newsfeed,
    Member,
    Role,
    Meeting,
    Maison,
    Region,
    Brand
};