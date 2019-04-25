import * as React from 'react';


export class WorkboxService extends React.Component {
    state = {
        idbSWStoreName: 'SWStore'
    };

    swJS = () => console.log('Hello from service-worker.js');

    async serviceWorker(options) {
        const iDBName = this.state.idbSWStoreName;
        const iDBStoreReq = indexedDB.open(iDBName, options.version | 0).onupgradeneeded = iDBStoreReq;

        const ele = document.createElement('script');

        ele.innerText = `
            if('serviceWorker' in navigator) {
                // Use the window load event to keep the page load performant

                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('${this.swJS()}');
                })
             }
          }`;
        ele.async;
        ele.onload = function(e) {
            console.log('SW loaded');
        };
        window.document.body
    }
}