import MainMap from './components/Map/Map.jsx';
import MenuDrawer from './components/MenuDrawer/MenuDrawer.jsx';

// TODO: prevent duplicate saved zone names w/same area type
const App = () => {
  return (
    <div className='app'>
      <MainMap />
      <MenuDrawer />
    </div>
  );
}

export default App
