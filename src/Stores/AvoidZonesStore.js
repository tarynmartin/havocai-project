import { makeObservable, observable, action } from "mobx";

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
    this.avoidZones.push(avoidZone);
  }

  removeAvoidZone(avoidZone) {
    this.avoidZones = this.avoidZones.filter((zone) => zone !== avoidZone);
  }
}