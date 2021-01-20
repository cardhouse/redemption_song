import { ReactComponent } from '*.svg';
import React from 'react';
import { ApiClient } from 'twitch';
import { StaticAuthProvider } from 'twitch-auth';
import { PubSubClient, PubSubRedemptionMessage } from 'twitch-pubsub-client';

class PubSub extends React.Component {

    getApiClient() {
        const authProvider = new StaticAuthProvider(
            'nk2nuromxkt284cxb3jxa7hz0b7ahe',
            'h98k2qhidw9fylqhmyr5ocsn048q6o',
            [
                'channel:manage:redemptions',
                'channel:read:redemptions'
            ]
        );
        return new ApiClient({ authProvider });
    }
}

export default PubSub;