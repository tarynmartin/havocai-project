import { makeAutoObservable, observable, action } from "mobx";

export default class Store {
  drawFeatureID = '';
  features = {};
  action = ''
  savedZones = [];
  displaySavedZones = false;

  constructor() {
    makeAutoObservable(this, {
      drawFeatureID: observable,
      features: observable,
      action: observable,
      savedZones: observable,
      displaySavedZones: observable,
      setAction: action,
      addFeatureID: action,
      setFeatures: action,
      deleteFeatures: action,
      addSavedZone: action,
    });
  }

  setAction(type) {
    this.action = type;
  }

  addFeatureID(id) {
    this.drawFeatureID = id;
  }

  getFeature(id) {
    return this.features[id];
  }

  setFeatures(e) {
    const newFeatures = {...this.features};
    for (const f of e.features) {
      newFeatures[f.id] = f;
    }

    this.addFeatureID(e.features[0].id);
    this.features = newFeatures;
  }

  deleteFeatures(e) {
    const newFeatures = {...this.features};
    
    for (const f of e.features) {
      delete newFeatures[f.id];
    }

    this.features = newFeatures;
  }

  addSavedZone(zone) {
    if (!this.savedZones.find((savedZone) => savedZone.id === zone.id)) {
      this.savedZones.push(zone);
    }
  }

  getSavedZone(id) {
    return this.savedZones.find((zone) => zone.id === id);
  }

  setDisplaySavedZones(state) {
    this.displaySavedZones = state;
  }
}