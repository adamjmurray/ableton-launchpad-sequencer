const logToMaxConsoleWith = log => (...values) => {
  values.forEach(message => {
    if (message && message.toString) {
      var s = message.toString();
      if (s.indexOf("[object ") >= 0) {
        s = JSON.stringify(message);
      }
      log(s);
    }
    else if (message === null) {
      log("<null>");
    }
    else {
      log(message);
    }
  });
  log("\n");
}

export default class MaxConsole {
  constructor() {
    this.log = logToMaxConsoleWith((string) => post(string));
    this.error = logToMaxConsoleWith((string) => error(string));
  }
};
