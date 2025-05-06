const xml2js = require('xml2js');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const parser = new xml2js.Parser({
  explicitArray: false,
  mergeAttrs: true,
  ignoreAttrs: false
});

exports.convertXmlToJson = async (filePath) => {
  try {
    const xmlData = await readFile(filePath, 'utf-8');
    const result = await parser.parseStringPromise(xmlData);
    return result;
  } catch (err) {
    throw new Error(`XML parsing failed: ${err.message}`);
  }
};