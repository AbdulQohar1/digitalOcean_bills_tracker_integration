// Provides simple & persistence file for billing data

const fs = require('fs').promises;
const path = require('path');
const config = require('../config');
const logger =  require('./logger');

class StorageService {
  constructor() {
    this.filePath =  config.storage.filePath;
    this.ensureDirectoryExists();
  }
}