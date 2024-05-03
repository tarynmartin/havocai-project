import { makeObservable, observable, action } from "mobx";

export default class TerminalAreasStore {
    terminalAreas = []

    constructor(root) {
      makeObservable(this,
        {
          terminalAreas: observable,
          addTerminalArea: action,
          removeTerminalArea: action,
        });
    }
    
    addTerminalArea(terminalArea) {
      this.terminalAreas.push(terminalArea);
    }

    removeTerminalArea(terminalArea) {
      terminalAreas = this.terminalAreas.filter((area) => area !== terminalArea);
    }
}