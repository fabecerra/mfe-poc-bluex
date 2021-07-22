import React, { lazy } from 'react';
import shortid from 'shortid';

const dynamicComponents = async (components: string[]) => {
  const promises = components.map(async (name: string) => {
    const Component = lazy(() => import(`../components/${name}`).catch(() => import(`../components/not-found`)));

    return <Component key={shortid.generate()} name={name} />;
  });

  return Promise.all(promises);
}

export default dynamicComponents;
