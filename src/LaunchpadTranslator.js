export default class LaunchpadTranslator {

  static noteToEvent(pitch, velocity) {
    const x = pitch % 16;
    const y = Math.floor(pitch / 16);
    if (x > 7) {
      return {
        type: velocity > 0 ? 'press' : 'release',
        section: 'right', y,
      };
    } else {
      return {
        type: velocity > 0 ? 'press' : 'release',
        section: 'grid', x, y,
      };
    }
  }

  static ccToEvent(cc, value) {
    const x = cc - 104;
    return {
      type: value > 0 ? 'press' : 'release',
      section: 'top', x,
    }
  }
}