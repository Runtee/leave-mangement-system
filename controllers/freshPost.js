const path = require('path')
const User = require('../models/user.js')
const Supervisor = require('../models/supervisor')
module.exports = async(req, res) => {
const { option,username, password } = req.body;
if (option=='Staff'){
     User.create({username:username,password:password}, (error, user) => {

        if (error) {
            if (Object.keys(error.errors) == 'username') {
                const validationErrors = 'Username already exists'
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                console.log(error);
                return res.redirect('/new');
            }
            else {
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                return res.redirect('/new');
            }



        }
        else {
            req.session.userId = user._id
            res.redirect('/register');
        }
    }
    )
}
else if (option=='Supervisor'){
    Supervisor.create({username:username,password:password}, (error, user) => {

       if (error) {
           if (Object.keys(error.errors) == 'username') {
               const validationErrors = 'Username already exists'
               req.flash('validationErrors', validationErrors)
               req.flash('data', req.body)
               console.log(error);
               return res.redirect('/new');
           }
           else {
               const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
               req.flash('validationErrors', validationErrors)
               req.flash('data', req.body)
               return res.redirect('/new');
           }



       }
       else {
           req.session.userId = user._id
           res.redirect('/register-supervisor');
       }
   }
   )
}
}



