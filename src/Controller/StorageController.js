import { DEFAULT, OUTLET, STORAGE } from '../config';

const {
  DURATION,
  SCALE_OFFSETS,
  SCALE_ROOT,
  MODULATION_SUMMING_MODE,
  MODULATION_SLEW,
  TRACKS,
  PITCH,
  VELOCITY,
  GATE,
  GATE_MODE,
  GATE_SUMMING_MODE,
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

  storeScaleOffsets(offsets) {
    outlet(OUTLET.STORAGE, SCALE_OFFSETS, offsets);
  }

  storeScaleRoot(root) {
    outlet(OUTLET.STORAGE, SCALE_ROOT, root);
  }

  storeModulationSummingMode(mode) {
    outlet(OUTLET.STORAGE, MODULATION_SUMMING_MODE, mode);
  }

  storeModulationSlew(slew) {
    outlet(OUTLET.STORAGE, MODULATION_SLEW, slew);
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

  storeTrackGateMode(trackIndex, mode) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, GATE_MODE, mode);
  }

  storeTrackGateSummingMode(trackIndex, mode) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, GATE_SUMMING_MODE, mode);
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

  storePatternStart(trackIndex, patternIndex, startIndex) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, START, startIndex);
  }

  storePatternEnd(trackIndex, patternIndex, endIndex) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, END, endIndex);
  }

  storePatternMute(trackIndex, patternIndex, mute) {
    outlet(OUTLET.STORAGE, TRACKS, trackIndex, PATTERNS, patternIndex, MUTE, mute);
  }

  storeAll(model) {
    this.storeDuration(model.globalStepDuration);
    this.storeScaleOffsets(model.scale.offsets);
    this.storeScaleRoot(model.scale.root);
    this.storeModulationSummingMode(model.modulationSummingMode);
    this.storeModulationSlew(model.modulationSlew);
    model.tracks.forEach((track, trackIndex) => {
      this.storeTrackPitch(trackIndex, track.pitch);
      this.storeTrackVelocity(trackIndex, track.velocity);
      this.storeTrackGate(trackIndex, track.gate);
      this.storeTrackGateMode(trackIndex, track.gateMode);
      this.storeTrackGateSummingMode(trackIndex, track.gateSummingMode);
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
