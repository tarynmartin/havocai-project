import { makeAutoObservable, observable, action } from "mobx";

export default class Store {
  drawFeatureID = '';
  features = {};

  constructor() {
    makeAutoObservable(this, {
      drawFeatureID: observable,
      features: observable,
      addFeatureID: action,
      setFeatures: action,
      deleteFeatures: action,
    });
  }

  addFeatureID(id) {
    this.drawFeatureID = id;
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