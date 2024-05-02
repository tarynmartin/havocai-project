import { AvoidZonesStore } from './AvoidZonesStore';
import { GeoFencesStore } from './GeoFencesStore';
import { TerminalAreasStore } from './TerminalAreasStore';

export class RootStore {
  constructor() {
    this.avoidZonesStore = AvoidZonesStore(this);
    this.geoFencesStore = GeoFencesStore(this);
    this.terminalAreasStore = TerminalAreasStore(this);
  }
}