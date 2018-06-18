const promisify = require('./promisify');
const fs = require('fs');
const mkdirp = require('mkdirp');
const {Store} = require('node-shared-buffer');

const readFile = promisify(fs.readFile);

exports.readFile = async (file, encoding) => {
  // Get the file from the virtual store
  let buffer = await Store.getOrSet(
    file,
    // fallback to filesystem if needed
    name => readFile(name)
  );

  if (typeof encoding === 'string') {
    return buffer.toString(encoding);
  } else if (!encoding) {
    return buffer;
  } else {
    throw new Error('nope');
  }
};

exports.writeFile = promisify(fs.writeFile);
exports.stat = promisify(fs.stat);
exports.readdir = promisify(fs.readdir);
exports.unlink = promisify(fs.unlink);
exports.realpath = promisify(fs.realpath);

exports.exists = function(filename) {
  return new Promise(resolve => {
    fs.exists(filename, resolve);
  });
};

exports.mkdirp = promisify(mkdirp);
