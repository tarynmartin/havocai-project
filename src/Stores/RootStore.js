import AvoidZonesStore from './AvoidZonesStore';
import GeoFencesStore from './GeoFencesStore';
import TerminalAreasStore from './TerminalAreasStore';

export class RootStore {
  constructor() {
    this.avoidZonesStore = new AvoidZonesStore(this);
    this.geoFencesStore = new GeoFencesStore(this);
    this.terminalAreasStore = new TerminalAreasStore(this);
  }
}