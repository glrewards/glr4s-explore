const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({subject,recipients},content){
        super();
        this.sgApi = sendgrid(keys.sendgridKey);
        this.from_email = new helper.Email('no-reply@glr4schools.co.uk');
        this.subject = subject;
        this.body = new helper.Content('text/html',content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();

    }

    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email);
        });
    }
    addClickTracking(){
        //console.log("in Mailer: ",this.recipients);
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    addRecipients(){
        const personalise = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalise.addTo(recipient);
        });
        this.addPersonalization(personalise);
    }

    async send(){

        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        const response = await this.sgApi.API(request);
        return response;

    }

}

module.exports = Mailer;
