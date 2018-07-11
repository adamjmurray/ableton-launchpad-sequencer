const quote = (value) => {
  return `"${value.replace('"', '\\"')}"`;
}

const _s = (key, holder, options) => {
  var key;
  let value = holder[key];

  if (value == null) {
    return 'null';
  }
  if (typeof value.toJSON === 'function') {
    value = value.toJSON(options);
  }

  switch (typeof value) {
    case 'object': // Object or Array
      if (value instanceof Array) {
        const result = [];
        for (let i = 0, end = value.length; i < end; i++) {
          result.push(_s(i, value, options));
        }
        return `[${result.join(',')}]`;

      } else { // Object
        const result = [];
        for (key of Object.keys(value || {})) {
          result.push(`${quote(key)}: ${_s(key, value, options)}`);
        }
        return `{${result.join(',')}}`;
      }
    case 'string':
      return quote(value);
    default:
      return value.toString();
  }
}

const _eval = eval; // https://github.com/rollup/rollup/wiki/Troubleshooting#avoiding-eval

// The interface to the pattr persistence system in Max.
export default class StorageController {

  constructor(sequencer, sequencerController) {
    this.sequencer = sequencer;
    this.sequencerController = sequencerController;
  }

  import(filepath) {
    const file = new File(filepath, 'read');
    const jsonString = file.readstring(10240); // 2048 * 5 is the max we can store in pattr objects in Max 5
    this.sequencer.fromJSON(this.parse(jsonString));
    this.sequencerController.redraw();
  }

  export(filepath) {
    const file = new File(filepath, 'write');
    file.writestring(this.stringify(this.sequencer));
    file.close();
  }

  load(path, jsonString) {
    if (path === 'dump') { // we're done
      this.sequencerController.redraw();
      return;
    }

    if (path === 'global') {
      this.sequencer.fromJSON(this.parse(jsonString));
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
      track.fromJSON(this.parse(jsonString));
    }
  }

  save() {
    outlet(PATTR, 'global', this.stringify(this.sequencer, { omitTracks: true }));
    for (const track of tracks) {
      outlet(PATTR, `track[${index}]`, this.stringify(track));
    }
  }


  //#######################################################################################
  // JSON methods (implementation inspired by https://github.com/douglascrockford/JSON-js)

  // Generate a JSON string for a given object.
  // If the object implements toJSON() the return value of that method will be used to construct the JSON string.
  // If any options are passed in, they will be passed to any toJSON calls.
  stringify(json, options) {
    return _s('', { '': json }, options);
  }

  // Parse the given JSON string into a generic JavaScript object
  parse(jsonString) {
    // Check that the String looks safe to eval. No "new", function call parentheses "()", or "="
    if (jsonString.match(/new|\(|\)|=/)) {
      throw `cannot parse unsafe-looking JSON: ${jsonString}`;
    }
    return _eval(`(${jsonString})`);
  }
}
