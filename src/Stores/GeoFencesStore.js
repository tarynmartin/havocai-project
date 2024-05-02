export const GeoFencesStore = (root) => {
  return {
    geoFences: [],
    addGeoFence(geoFence) {
      this.geoFences.push(geoFence);
    },
    removeGeoFence(geoFence) {
      geoFences = this.geoFences.filter((fence) => fence !== geoFence);
    },
  };
}