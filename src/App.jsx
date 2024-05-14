import React, { useState, useCallback, useEffect, useMemo } from 'react';
import SpeedDial from './components/SpeedDial/SpeedDial.jsx';
import MainMap from './components/Map/Map.jsx';

const App = () => {
  const [action, setAction] = useState(null);

  const switchTypeOfZone = (type) => {
    if (type !== action) {
      // setFeatures({});
      setAction(type);
    }
  }

  return (
    <div className='app'>
      <MainMap action={action} />
      <SpeedDial setChoice={switchTypeOfZone} />
    </div>
  );
}

export default App
