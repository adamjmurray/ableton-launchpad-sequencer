import { DEFAULT, OUTLET, STORAGE } from '../config';

const {
  DURATION,
  SCALE,
  TRACKS,
  PITCH,
  VELOCITY,
  GATE,
  MULTIPLIER,
  MUTE,
  PATTERNS,
  STEPS,
  START,
  END,
} = STORAGE;

// Maybe this could all go into View and Controller can call the store*() methods directly
export default class StorageView {

  storeDuration(duration) {
    outlet(OUTLET.STORAGE, DURATION, duration);
  }

  storeScale(scale) {
    outlet(OUTLET.STORAGE, SCALE, scale);
  }

  storeTrackPitch(trackIndex, pitch) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PITCH, pitch);
  }

  storeTrackVelocity(trackIndex, velocity) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, VELOCITY, velocity);
  }

  storeTrackGate(trackIndex, gate) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, GATE, gate);
  }

  storeTrackMultiplier(trackIndex, multiplier) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, MULTIPLIER, multiplier);
  }

  storeTrackMute(trackIndex, mute) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, MUTE, mute);
  }

  storePatternSteps(trackIndex, patternIndex, steps) {
    if (this._saveAfterDelay) {
      this._saveAfterDelay.cancel();
      this._saveAfterDelay = null;
    }
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, STEPS, steps);
  }

  storePatternStepsAfterDelay(trackIndex, patternIndex, steps) {
    // use a delay to avoid creating undo state on every interaction
    if (this._saveAfterDelay) {
      this._saveAfterDelay.cancel();
    }
    this._saveAfterDelay = new Task(() => this.storePatternSteps(trackIndex, patternIndex, steps));
    this._saveAfterDelay.schedule(DEFAULT.SAVE_DELAY);
  }

  storePatternStart(trackIndex, patternIndex, start) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, START, start);
  }

  storePatternEnd(trackIndex, patternIndex, end) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, END, end);
  }

  storePatternMute(trackIndex, patternIndex, mute) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, MUTE, mute);
  }

  storeAll(model) {
    this.storeDuration(model.globalStepDuration);
    this.storeScale(model.scale.pitchClasses);
    model.tracks.forEach((track, trackIndex) => {
      this.storeTrackPitch(trackIndex, track.pitch);
      this.storeTrackVelocity(trackIndex, track.velocity);
      this.storeTrackGate(trackIndex, track.gate);
      this.storeTrackMultiplier(trackIndex, track.durationMultiplier);
      this.storeTrackMute(trackIndex, track.mute);
      track.patterns.forEach((pattern, patternIndex) => {
        this.storePatternSteps(trackIndex, patternIndex, pattern.steps);
        this.storePatternStart(trackIndex, patternIndex, pattern.startStepIndex);
        this.storePatternEnd(trackIndex, patternIndex, pattern.endStepIndex);
        this.storePatternMute(trackIndex, patternIndex, pattern.mute);
      });
    });
  }
}
