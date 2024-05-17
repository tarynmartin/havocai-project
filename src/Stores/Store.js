import { makeAutoObservable, observable, action } from "mobx";

export default class Store {
  drawFeatureID = '';
  features = {};
  action = ''
  savedZones = {};
  displaySavedZones = false;
  selectedSavedZone = null;

  constructor() {
    makeAutoObservable(this, {
      drawFeatureID: observable,
      features: observable,
      action: observable,
      savedZones: observable,
      displaySavedZones: observable,
      selectedSavedZone: observable,
      setAction: action,
      addFeatureID: action,
      getFeature: action,
      setFeatures: action,
      deleteFeatures: action,
      addSavedZone: action,
      removeSavedZone: action,
      setSelectedSavedZone: action,
      findSavedZone: action
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
    const newZone = {...this.savedZones};

    if (!this.savedZones[zone.id]) {
      newZone[zone.id] = {[zone.properties.name]: zone};
    } else {
      newZone[zone.id] = {...newZone[zone.id], [zone.properties.name]: zone};
    }

    this.selectedSavedZone = zone;
    this.savedZones = newZone;
  }
  
  removeSavedZone(id, name) {
    delete this.savedZones[id][name];
    this.displaySavedZones = false;
    this.drawFeatureID = null;
  }

  setSelectedSavedZone(zone) {
    this.selectedSavedZone = zone;
    this.drawFeatureID = zone.id;
    this.displaySavedZones = true;
  }

  findSavedZone(id, name) {
    return this.savedZones[id][name];
  }
}