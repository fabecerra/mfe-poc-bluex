
import React, { useEffect, useState, FC } from 'react';

import RemoteApp from '../interfaces/remoteApp';

import dynamicApps from './dynamicApps';
import dynamicComponents from './dynamicComponents';

interface Props {
  apps: RemoteApp[],
  components: string[],
}

const AppShell: FC<Props> = ({ apps, components }) => {
  const [app, setApp] = useState<any[]>([]);
  const [component, setComponent] = useState<any[]>([]);

  useEffect(() => {
    dynamicApps(apps).then(setApp);
    dynamicComponents(components).then(setComponent);
  }, [apps, components]);

  return (
    <div style={{ width: '810px' }} className="app">
      <header style={{ border: '1px dashed black', height: '100px', width: '100%', margin: '3px' }} className="app-header">

        <React.Suspense fallback="Loading header...">
          {component.find(c => c.props.name === 'header')}
        </React.Suspense>

      </header>
      <div style={{ display: 'inline-flex' }}>
        <div style={{ border: '1px dashed black', height: '400px', width: '160px', margin: '0 3px 0 3px' }}>

          <React.Suspense fallback="Loading navbar...">
            {component.find(c => c.props.name === 'navbar')}
          </React.Suspense>

        </div>
        <div style={{ border: '1px dashed black', height: '400px', width: '540px' }}>

          <React.Suspense fallback="Loading content...">
            {/* {component.find(c => c.props.name === 'content')} */}
            CONTENT
            {app}
          </React.Suspense>

        </div>
        <div style={{ border: '1px dashed black', height: '400px', width: '100px', margin: '0 3px 0 3px' }}>
          TOOLS
          <React.Suspense fallback="Loading tool...">
            {component.find(c => c.props.name === 'tool')}
          </React.Suspense>

        </div>
      </div>
      <footer style={{ border: '1px dashed black', height: '100px', width: '100%', margin: '3px' }} className="app-footer">
        <React.Suspense fallback="Loading footer...">
          {component.find(c => c.props.name === 'footer')}
        </React.Suspense>
      </footer>
    </div>
  );
}

export default AppShell;
