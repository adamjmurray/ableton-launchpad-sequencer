// Interprets user input from the Launchpad, track MIDI input, and GUI
export default class MidiController {

  constructor(sequencer) {
    this.sequencer = sequencer;
    this.gui = sequencer.gui;
    this.scale = sequencer.scale;
    this._globalTransposes = [];
    this._pitchOverrides = [];
    this._velocityOverrides = [];
  }

  // Track MIDI input
  note(pitch, velocity) {
    const enabled = velocity > 0;
    if (pitch < 32) {
      // TODO? optionally support a toggle mode, instead of only muting while note is held
      this.sequencer.mutePattern(Math.floor(pitch / 8), pitch % 8, enabled);
    } else if (pitch < 36) {
      // TODO? optionally support a toggle mode, instead of only muting while note is held
      this.sequencer.muteTrack(pitch - 32, enabled);
    } else if (pitch < 84) {
      this.trackPitchOverride(pitch, velocity);
    } else if (pitch < 96) {
      this.scale.overrideStep(pitch - 84, enabled);
      this.gui.scale(this.scale);
    } else if (pitch < 128) {
      this.globalTranspose(pitch - 108, enabled);
    }
  }

  trackPitchOverride(pitch, velocity) {
    let index, track, trackIdx;
    const pitchOverrides = this._pitchOverrides;
    const velocityOverrides = this._velocityOverrides;

    if (velocity > 0) {
      index = pitchOverrides.indexOf(null);
      if (index < 0) {
        index = pitchOverrides.length;
      }
      pitchOverrides[index] = pitch;
      velocityOverrides[index] = velocity;

      trackIdx = index % 4;
      track = this.sequencer.tracks[trackIdx];
      if (track != null) {
        track.pitchOverride = pitch;
        track.velocityOverride = velocity;
      }
    } else {
      index = pitchOverrides.indexOf(pitch);
      if (index >= 0) {
        pitchOverrides[index] = null;
        velocityOverrides[index] = null;
        while (pitchOverrides[pitchOverrides.length - 1] === null) {
          pitchOverrides.pop();
          velocityOverrides.pop();
        }
      }

      trackIdx = index % 4;
      let newPitchOverride = null;
      let newVelocityOverride = null;
      // the newPitchOverride becomes the last non-null override for the track
      for (let i = trackIdx, end = pitchOverrides.length; i < end; i += 4) {
        if (pitchOverrides[i] != null) {
          newPitchOverride = pitchOverrides[i];
          newVelocityOverride = velocityOverrides[i];
        }
      }

      track = this.sequencer.tracks[trackIdx];
      if (track != null) {
        track.pitchOverride = newPitchOverride;
        track.velocityOverride = newVelocityOverride;
      }
    }
  }

  globalTranspose(amount, enabled) {
    // TODO: add a global transpose control to the GUI?
    const transposes = this._globalTransposes;

    if (enabled) {
      transposes.push(amount);
      this.sequencer.globalTranspose = amount;
    } else {
      const index = transposes.indexOf(amount);
      if (index < 0) { return; }
      if (index === (transposes.length - 1)) {
        // the most-recently-pressed key was lifted, so we need to change transposition
        if (index > 0) {
          // use the previously pressed key
          this.sequencer.globalTranspose = transposes[index - 1];
        } else {
          // no more keys held, revert to 0
          this.sequencer.globalTranspose = 0;
        }
      }
      // else the latest pressed key is still held, and nothing changes

      transposes.splice(index, 1); // remove the element
    }
  }
}