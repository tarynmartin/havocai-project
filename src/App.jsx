import React, { useState} from 'react';
import MainMap from './components/Map/Map.jsx';
import MenuDrawer from './components/MenuDrawer/MenuDrawer.jsx';
import SaveZoneModal from './components/SaveZoneModal/SaveZoneModal.jsx';

const App = () => {
  const [isSaveZoneModalOpen, setIsSaveZoneModalOpen] = useState(false);

  const toggleSaveZoneModal = () => {
    console.log('check app', isSaveZoneModalOpen)
    setIsSaveZoneModalOpen(!isSaveZoneModalOpen);
  }

  return (
    <div className='app'>
      {/* does this need to be an overlay? */}
      <MainMap />
      <MenuDrawer
        setSaveZoneModal={toggleSaveZoneModal}
      />
      {isSaveZoneModalOpen && 
        <SaveZoneModal open={isSaveZoneModalOpen} handleClose={toggleSaveZoneModal} />
      }
    </div>
  );
}

export default App
