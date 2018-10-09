import { DEFAULT, OUTLET } from '../config';

// Maybe this could all go into View and Controller can call the store*() methods directly
export default class StorageView {

  storeDuration(duration) {
    outlet(OUTLET.STORAGE, 'duration', duration);
  }

  storeScale(scale) {
    outlet(OUTLET.STORAGE, 'scale', scale);
  }

  storeTrackPitch(trackIndex, pitch) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::pitch`,
      pitch);
  }

  storeTrackVelocity(trackIndex, velocity) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::velocity`,
      velocity);
  }

  storeTrackGate(trackIndex, gate) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::gate`,
      gate);
  }

  storeTrackMultiplier(trackIndex, velocity) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::velocity`,
      velocity);
  }

  storeTrackMute(trackIndex, mute) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::mute`,
      mute);
  }

  storePatternSteps(trackIndex, patternIndex, steps) {
    if (this._saveAfterDelay) {
      this._saveAfterDelay.cancel();
      this._saveAfterDelay = null;
    }
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::patterns[${patternIndex}]::steps`,
      steps);
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
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::patterns[${patternIndex}]::start`,
      start);
  }

  storePatternEnd(trackIndex, patternIndex, end) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::patterns[${patternIndex}]::end`,
      end);
  }

  storePatternMute(trackIndex, patternIndex, mute) {
    outlet(OUTLET.STORAGE,
      `tracks[${trackIndex}]::patterns[${patternIndex}]::mute`,
      mute);
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
