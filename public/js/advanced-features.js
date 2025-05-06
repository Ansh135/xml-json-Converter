// Advanced Features for XML to JSON Converter

// XML Validation
function validateXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const parseError = xmlDoc.querySelector('parsererror');
  if (!parseError) return { valid: true };
  return { valid: false, message: parseError.textContent };
}

// JSON Schema Validation
function validateJSONSchema(json, schema) {
  try {
    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    return validate(json);
  } catch (err) {
    console.error('Schema validation error:', err);
    return false;
  }
}

// XML Formatting
function formatXML(xml) {
  let formatted = '';
  let indent = '';
  const tab = '  ';
  xml.split(/>\s*</).forEach(function(node) {
    if (node.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) {
      indent += tab;
    }
  });
  return formatted.substring(1, formatted.length - 3);
}

// JSON Formatting
function formatJSON(json) {
  return JSON.stringify(json, null, 2);
}

// File Compression
async function compressFile(file) {
  const zip = new JSZip();
  zip.file(file.name, file);
  return await zip.generateAsync({type: "blob"});
}

// Helper: Derive a key from password and salt using PBKDF2
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), {name: 'PBKDF2'}, false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt file with password (any length)
async function encryptFile(file, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    await file.arrayBuffer()
  );
  // Store: [salt (16 bytes)] + [iv (12 bytes)] + [ciphertext]
  const blob = new Blob([salt, iv, new Uint8Array(encrypted)]);
  return blob;
}

// Decrypt file with password
async function decryptFile(encryptedFile, password) {
  try {
    const buffer = await encryptedFile.arrayBuffer();
    const salt = new Uint8Array(buffer.slice(0, 16));
    const iv = new Uint8Array(buffer.slice(16, 28));
    const data = buffer.slice(28);
    const key = await deriveKey(password, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return new Blob([decrypted]);
  } catch (err) {
    // If decryption fails, return a Blob with a default message
    const message = "Wrong password or file is corrupted!";
    return new Blob([message], { type: "text/plain" });
  }
}

// Export functions
window.advancedFeatures = {
  validateXML,
  validateJSONSchema,
  formatXML,
  formatJSON,
  compressFile,
  encryptFile,
  decryptFile
}; // Advanced Features for XML to JSON Converter

// XML Validation
function validateXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  const parseError = xmlDoc.querySelector('parsererror');
  if (!parseError) return { valid: true };
  return { valid: false, message: parseError.textContent };
}

// JSON Schema Validation
function validateJSONSchema(json, schema) {
  try {
    const Ajv = require('ajv');
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    return validate(json);
  } catch (err) {
    console.error('Schema validation error:', err);
    return false;
  }
}

// XML Formatting
function formatXML(xml) {
  let formatted = '';
  let indent = '';
  const tab = '  ';
  xml.split(/>\s*</).forEach(function(node) {
    if (node.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) {
      indent += tab;
    }
  });
  return formatted.substring(1, formatted.length - 3);
}

// JSON Formatting
function formatJSON(json) {
  return JSON.stringify(json, null, 2);
}

// File Compression
async function compressFile(file) {
  const zip = new JSZip();
  zip.file(file.name, file);
  return await zip.generateAsync({type: "blob"});
}

// Helper: Derive a key from password and salt using PBKDF2
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), {name: 'PBKDF2'}, false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt file with password (any length)
async function encryptFile(file, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    await file.arrayBuffer()
  );
  // Store: [salt (16 bytes)] + [iv (12 bytes)] + [ciphertext]
  const blob = new Blob([salt, iv, new Uint8Array(encrypted)]);
  return blob;
}

// Decrypt file with password
async function decryptFile(encryptedFile, password) {
  try {
    const buffer = await encryptedFile.arrayBuffer();
    const salt = new Uint8Array(buffer.slice(0, 16));
    const iv = new Uint8Array(buffer.slice(16, 28));
    const data = buffer.slice(28);
    const key = await deriveKey(password, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return new Blob([decrypted]);
  } catch (err) {
    // If decryption fails, return a Blob with a default message
    const message = "Wrong password or file is corrupted!";
    return new Blob([message], { type: "text/plain" });
  }
}

// Export functions
window.advancedFeatures = {
  validateXML,
  validateJSONSchema,
  formatXML,
  formatJSON,
  compressFile,
  encryptFile,
  decryptFile
}; 