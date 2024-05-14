import AvoidZonesStore from './AvoidZonesStore';
import GeoFencesStore from './GeoFencesStore';
import TerminalAreasStore from './TerminalAreasStore';
import Store from './Store';

export class RootStore {
  constructor() {
    this.avoidZonesStore = new AvoidZonesStore(this);
    this.geoFencesStore = new GeoFencesStore(this);
    this.terminalAreasStore = new TerminalAreasStore(this);
    this.store = new Store(this);
  }
}