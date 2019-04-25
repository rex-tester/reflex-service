import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import CustomTaskListComponent from './CustomTaskListComponent';
import TwilioBServices from "./services/BSideTwilioService";

const PLUGIN_NAME = 'DemoPlugin';

const DoddleComponent = <div>Now I do something just not really...</div>;

export default class DemoPlugin extends FlexPlugin {

  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {

    flex.TeamsView.Content.add(<TwilioBServices
        errorHandler={e => console.log(e)}
        manager={manager}
        userId={'thiswouldbeanidortoken'}
        key="bsidekey"
        render={(data) => <DoddleComponent token={data.token} sync={data.syncClient}/>}
    />);

    flex.AgentDesktopView.Panel1.Content.add(
      <CustomTaskListComponent key="demo-component" />,
      {
        sortOrder: -1,
      }
    );
  }
}
