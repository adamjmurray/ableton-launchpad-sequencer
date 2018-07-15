import { PATTR } from '../config';

// The interface to the pattr persistence system in Max.
export default class StorageController {

  constructor(sequencer, sequencerController) {
    this.sequencer = sequencer;
    this.sequencerController = sequencerController;
  }

  import(filepath) {
    const file = new File(filepath, 'read');
    const jsonString = file.readstring(10240); // 2048 * 5 is the max we can store in pattr objects in Max 5
    this.sequencer.fromJSON(JSON.parse(jsonString));
    this.sequencerController.redraw();
  }

  export(filepath) {
    const file = new File(filepath, 'write');
    file.writestring(JSON.stringify(this.sequencer));
    file.close();
  }

  load(path, jsonString) {
    if (!jsonString) return;

    if (path === 'dump') { // we're done
      this.sequencerController.redraw();
      return;
    }

    if (path === 'global') {
      this.sequencer.fromJSON(JSON.parse(jsonString));
      return;
    }

    // other paths look like:
    // track[#{index}]
    const matches = /^track\[(\d+)\]$/.exec(path);
    if (matches == null) {
      // for debugging, but note on loadbang pattrstorage sends a weird message like: u594004503.json,0
      // error("launchpad sequencer can't load #{path} #{values}\n")
      return;
    }

    const trackIndex = parseInt(matches[1]);
    const track = this.sequencer.tracks[trackIndex];
    if (track != null) {
      track.fromJSON(JSON.parse(jsonString));
    }
  }

  save() {
    // TODO: see if it's still needed to separate these out (this was to workaround an old Max limitation)
    const sequencerJSON = JSON.stringify(this.sequencer);
    const tracksJSON = json.tracks;
    delete sequencerJSON.tracks;
    outlet(PATTR, 'global', sequencerJSON);
    tracksJSON.forEach((trackJSON, index) =>
      outlet(PATTR, `track[${index}]`, trackJSON));
  }
}
