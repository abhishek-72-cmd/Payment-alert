
const cron = require ('node-cron');
const PaymentAlert  = require ('../models/PaymentAlertSchema')
const userNotification = require ('../models/userNotifications');
const User = require ('../models/userModel')
const nodemailer = require ('nodemailer');


const transporter = nodemailer.createTransport({
service: 'Gmail',
auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
})


const sendEmailReminder = async (email, message)=>{
    const mailoption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Upcoming Payment Reminder',
        text: message
    }
await transporter.sendMail(mailoption);

}

const generatePaymentNotifications  = async()=>{
const now  = new Date();
const thresholdDate =  new Date();
thresholdDate.setDate(now.getDate() + 3); // 3 days before due date  

const alert = await PaymentAlert.find ({
    duedate:{ $lte: thresholdDate, $gte: now}
}).populate('userId', 'email name');


for (const alert of alerts) {
    const daysLeft = Math.ceil((alert.dueDate - now) / (1000 * 60 * 60 * 24));
    const message = `Hi ${alert.userId.name}, your payment "${alert.paymentName}" of ₹${alert.paymentAmount} is due in ${daysLeft} day(s).`;


// save notification
    await Notification.create({
        userId: alert.userId._id,
        message,
    });


      // Send email reminder
      await sendEmailReminder(alert.userId.email, message);

}
}


const startCronJob = ()=>{
    cron.schedule('0 0 * * *', async () => {
        console.log('Running payment due notification job...');
        await generatePaymentNotifications();
    });
}



module.exports = { startCronJob };