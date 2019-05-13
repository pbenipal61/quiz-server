const db = require('../../utils/database');

const Language = db.import('./language');
const Match = db.import('./match');
const MatchTypes = db.import('./matchType');
const OriginPlatform = db.import('./originPlatform');
const User = db.import('./user');
const UserType = db.import('./userType');

Language.hasMany(User);
MatchTypes.hasMany(Match);
OriginPlatform.hasMany(User);
Match.belongsTo(User);
User.hasMany(Match);
UserType.hasMany(User);
