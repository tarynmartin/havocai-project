import { makeAutoObservable, observable, action } from "mobx";

export default class Store {
  drawFeatureID = '';
  features = {};
  action = ''

  constructor() {
    makeAutoObservable(this, {
      drawFeatureID: observable,
      features: observable,
      action: observable,
      setAction: action,
      addFeatureID: action,
      setFeatures: action,
      deleteFeatures: action,
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
}