export const TerminalAreasStore = (root) => {
  return {
    terminalAreas: [],
    addTerminalArea(terminalArea) {
      this.terminalAreas.push(terminalArea);
    },
    removeTerminalArea(terminalArea) {
      terminalAreas = this.terminalAreas.filter((area) => area !== terminalArea);
    },
  };
}