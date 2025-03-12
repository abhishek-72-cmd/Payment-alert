

const mongoose = require ('mongoose')

const NotificaationSchema = new mongoose.Schema ({

    userId:{
  type:mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User'
    },


    message:{
  type :String,
  required: true
    },

    date:{
      type: Date,
       default: Date.now
   
    },

    status:{
 type: String,
 enum: ['unread', 'read'], default: 'unread'
    }

})


module.exports =mongoose.model('Notifications', NotificaationSchema)