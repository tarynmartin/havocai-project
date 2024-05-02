export const AvoidZonesStore = (root) => {
  return {
    avoidZones: [],
    addAvoidZone(avoidZone) {
      this.avoidZones.push(avoidZone);
    },
    removeAvoidZone(avoidZone) {
      avoidZones = this.avoidZones.filter((zone) => zone !== avoidZone);
    },
  };
}