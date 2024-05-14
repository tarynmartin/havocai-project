import { makeObservable, observable, action, computed } from "mobx";

export default class AvoidZonesStore {
  avoidZones = [];

  constructor(root) {
    makeObservable(this,
      {
        avoidZones: observable,
        addAvoidZone: action,
        removeAvoidZone: action,
      });
  }

  addAvoidZone(avoidZone) {
    if (!this.avoidZones.find((zone) => zone.id === avoidZone.id)) {
      this.avoidZones.push(avoidZone);
    }
  }

  removeAvoidZone(avoidZone) {
    this.avoidZones = this.avoidZones.filter((zone) => zone.id !== avoidZone.id);
  }
}