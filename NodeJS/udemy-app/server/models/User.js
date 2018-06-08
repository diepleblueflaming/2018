"use strict";
/**
 *   Project: JS-MGDB
 *   Created By: Dieple Dev
 *   Initial version created on: 07/06/2018 - 05:52
 */
const jwt = require("jsonwebtoken");
const keyHash = 'jwt-key';
module.exports = {
    UserCollection: function () {
      return process.db.collection('User');
    },
    login: async function (email, password) {
        let user = await this.UserCollection().findOne({email: email});
        if(!user){
            throw new Error({});
        }
        let isVerified = await jwt.verify(password, keyHash);
        if(!isVerified){
            throw new Error();
        }
        return this.updateUserTokens(user);
    },
    getOneByName: function () {

    },
    create: function (user) {
        user.password = jwt.sign(user.password, keyHash);
        return this.UserCollection().insertOne(user);
    },
    updateById: function () {

    },
    updateUserTokens: function (user) {
        let access = new Date().getTime();  // as timestamp
        let token = jwt.sign({_id: user._id}, keyHash);
        user.tokens.push({access, token});
        return this.UserCollection().findOneAndUpdate({
            _id: user._id
        }, {
            $set: {tokens: user.tokens}
        },{
          returnOriginal: false
        }).then(() => {return token});
    },
    deleteById: function () {

    }
};
