import * as React from 'react';

export const API_ENDPOINTS = (options) => {
    const cdns = {
        chat: `<script src="https://media.twiliocdn.com/sdk/js/chat/v3.2/twilio-chat.min.js"></script>`,
        taskrouter: `<script />`
    };

    const ep = {
        tokens: `https://api.twilio.com/2010-04-01/Accounts/${options.accountSid}/Tokens.json`,
        application: `https://api.twilio.com/2010-04-01/Accounts/${options.accountSid}/Applications.json`,
        accounts: `https://api.twilio.com/2010-04-01/Accounts.json`,
        sms: `https://api.twilio.com/2010-04-01/Accounts/${options.accountSid}/Messages.json`,
        apiKey: `https://api.twilio.com/2010-04-01/Accounts/${options.accountSid}/Keys.json`,
    };

    return {ep, cdns};
};

/**
 * A Twilio Backend Service HOC
 */
export default class TwilioBServices extends React.Component {

    state = {
        apiKey: void 0,
        apiSecret: void 0,
        token: void 0,
        error: void 0,
        result: void 0
    };


    async Tokens(options) {

        // call accounts.twilio.com/token

        const bs64Cred = btoa(this.state.apiKey + ":" + this.state.apiSecret);
        const url = API_ENDPOINTS(this.props.manager.configuration.sso.accountSid);

        const result = await fetch( url, {
            method: "POST",
            headers: [
                "Authorization: " + bs64Cred
            ],
            body: JSON.stringify({
                test: 'Variable'
            })
        });

        const token = (await result.json()).token;

        if (!token) {
            this.setState({error: 'failed to fetch token'});
            return

        }

        this.setState({token: token});
    }

    async grant() {
        // todo
    }

    async identity() {

        // new

        // fetch

        // update
    }

    sendSms(to, from = this.props.defaultNumber) {
        // todo
    }


    render() {
        if (this.state.error) {
            this.props.errorHandler(this.state.error); // show alert
            return this.props.render() //empty render dismounts component
        }
        return   this.state.result
            ? this.props.render()
            : (
                <div>
                    Sending SMS . . . .
                </div>
            );
    }
}
