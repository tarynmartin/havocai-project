import React, { useState} from 'react';
import SpeedDial from './components/SpeedDial/SpeedDial.jsx';
import MainMap from './components/Map/Map.jsx';

const App = () => {
  const [action, setAction] = useState('');

  return (
    <div className='app'>
      <MainMap action={action} />
      <SpeedDial onClick={setAction} />
    </div>
  );
}

export default App
