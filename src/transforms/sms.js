import * as React from 'react';

const API_ENDPOINTS = (options) => {
    const ep = {
        accounts: `https://api.twilio.com/2010-04-01/Accounts/${options.accountSid}/Tokens.json`
    }
};

export default class SmsService extends React.Component {
    state = {
        token: void 0,
        error: void 0,
        result: void 0
    };

    async getToken() {
        // call accounts.twilio.com/token

        const bs64Cred = btoa("API_SECRET:API_KEY");

        const result = await fetch(API_ENDPOINTS(this.props.manager.configuration.sso.accountSid), {
            method: "POST",
            body: JSON.stringify({
                authorization: b64Cred
            })
        });

        const token = (await result.json()).token;
        if (!token) {
            this.setState({error: 'failed to fetch token'});
        }
        this.setState({token: token});
    }

    sendSms(to, from = this.props.defaultNumber) {

    }

    render() {
        if (this.state.error) {
            this.props.errorHandler(this.state.error); // show alert
            return this.props.render() //empty render dismounts component
        }
        return   this.state.result
            ? this.props.render(this.state.data)
            : (
                <div>
                    Sending SMS . . . .
                </div>
            );
    }
}