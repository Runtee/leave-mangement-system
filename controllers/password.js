const bcrypt = require('bcrypt')
const User = require('../models/user')
module.exports = async (req, res) => {
    const { password, newPassword, Confirmpassword } = req.body;
    var id = req.session.userId
    const newhash = await bcrypt.hash(newPassword, 10) 
    User.findById(id, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    if (newPassword === Confirmpassword) {
                        // var usr = bcrypt.hash(newPassword, 10)
                        User.findByIdAndUpdate(id, {'password':newhash}, (err, upd) => { 
                            if(upd){
                                req.flash('success','Password successfuly changed')
                                res.redirect('/dashboard/change-password')
                            }
                        });

                    }
                    else {
                        const validationErrors = ['confirm password is not the same with new password']
                        req.flash('validationErrors', validationErrors)
                        req.flash('data', req.body)
                        res.redirect('/dashboard/change-password')

                    }
                }
                else{
                    const validationErrors = ['password is not correct']
                        req.flash('validationErrors', validationErrors)
                        req.flash('data', req.body)
                        res.redirect('/dashboard/change-password')

                }
            })
        }
    })
}

