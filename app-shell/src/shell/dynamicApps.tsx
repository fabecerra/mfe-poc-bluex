import React, { lazy } from 'react';
import shortid from 'shortid';
import RemoteApp from '../interfaces/remoteApp';

// @ts-ignore
const loadComponent = (scope, module) => {
  return async () => {
    // @ts-ignore
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else
    // @ts-ignore
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[scope].get(module);

    return factory();
  };
}

// @ts-ignore
const useDynamicScript = async (args) => {

  if (!args.url) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const element = document.createElement('script') || '';

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      // @ts-ignore
      element.parentElement.removeChild(element);
      resolve();
    };

    element.onerror = (err) => {
      // @ts-ignore
      element.parentElement.removeChild(element);
      reject(err);
    };

    document.head.appendChild(element);
  });

};

const dynamicApps = (apps: RemoteApp[]) => {
  const promises = apps.map(async (app: RemoteApp) => {
    await useDynamicScript({ url: app.url });

    const Content = lazy(loadComponent(app.scope, app.module));

    return <Content key={shortid.generate()} name={app.scope} />;
  });

  return Promise.all(promises);
}

export default dynamicApps;
