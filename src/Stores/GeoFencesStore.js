import { makeObservable, observable, action } from "mobx";

export default class GeoFencesStore {
  geoFences = []

  constructor(root) {
    makeObservable(this,
      {
        geoFences: observable,
        addGeoFence: action,
        removeGeoFence: action,
      });
  }

  addGeoFence(geoFence) {
    if (!this.geoFences.find((fence) => fence.id === geoFence.id)) {
      this.geoFences.push(geoFence);
    }
  }

  removeGeoFence(geoFence) {
    geoFences = this.geoFences.filter((fence) => fence !== geoFence);
  }
}