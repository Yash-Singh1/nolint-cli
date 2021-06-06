const { exec } = require('child_process');

test('not existing file fails', (done) => {
  function callback(error, stdout, stderr) {
    try {
      expect(error.code).toBe(1);
      expect(stderr).toBe('');
      expect(stdout).toBe("✘ notthere.no doesn't exist\n");
      done();
    } catch (e) {
      done(e);
    }
  }

  exec('./cli.js notthere.no', callback);
});

test('bad filename fails', (done) => {
  function callback(error, stdout, stderr) {
    try {
      expect(error.code).toBe(1);
      expect(stderr).toBe('');
      expect(stdout).toBe('✘ nocode files must have the .no file extension\n');
      done();
    } catch (e) {
      done(e);
    }
  }

  exec('./cli.js test/files/test', callback);
});

test('bad filename and not existing fails', (done) => {
  function callback(error, stdout, stderr) {
    try {
      expect(error.code).toBe(1);
      expect(stderr).toBe('');
      expect(stdout).toBe(
        "✘ nocode files must have the .no file extension\n✘ notthere doesn't exist\n"
      );
      done();
    } catch (e) {
      done(e);
    }
  }

  exec('./cli.js notthere', callback);
});

test('empty and existing file succeeds', (done) => {
  function callback(error, stdout, stderr) {
    try {
      expect(error).toBe(null);
      expect(stderr).toBe('');
      expect(stdout).toBe('');
      done();
    } catch (e) {
      done(e);
    }
  }

  exec('./cli.js test/files/index.no', callback);
});

test('non-empty file fails', (done) => {
  function callback(error, stdout, stderr) {
    try {
      expect(error.code).toBe(1);
      expect(stderr).toBe('');
      expect(stdout).toBe("✘ test/files/fails.no isn't empty\n");
      done();
    } catch (e) {
      done(e);
    }
  }

  exec('./cli.js test/files/fails.no', callback);
});

test('non-empty and wrong extension fails', (done) => {
  function callback(error, stdout, stderr) {
    try {
      expect(error.code).toBe(1);
      expect(stderr).toBe('');
      expect(stdout).toBe(
        "✘ nocode files must have the .no file extension\n✘ test/files/fails isn't empty\n"
      );
      done();
    } catch (e) {
      done(e);
    }
  }

  exec('./cli.js test/files/fails', callback);
});
