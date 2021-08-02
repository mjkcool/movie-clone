const admin = require('./hide.json').mongodb_atlas.user_admin
const password = require('./hide.json').mongodb_atlas.user_password
const uri = require('./hide.json').mongodb_atlas.db_uri

module.exports = {
    mongoURI: `mongodb+srv://${admin}:${password}@${uri}/myFirstDatabase?retryWrites=true&w=majority`
}
