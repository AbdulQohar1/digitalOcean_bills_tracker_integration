// Configuration module for the DigitalOcean Bill Tracker
//  Centralizes all configuration values and environment variables

require('dotenv').config();

const config =  {
  // digitalOcaean API configuration
  digitalOcean: {
    apiKey: process.env.DO_API_TOKEN,
    apiBaseUrl: 'https://api.digitalocean.com/v2',
    billEndpoint: '/customers/my/billing_history', 
  },

  // telex api configuration
  telex: {
    apiKey: process.env.TELEX_API_KEY,
    apiBaseUrl: 'https://api.telex.im',
    integrationId: process.env.TELEX_INTEGRATION_ID,
  },

  // Job scheduling configuration
  scheduler: {
    // Default to running daily at 9am
    cronSchedule: process.env.CRON_SCHEDULE || '0 9 * * *',
    timezone: process.env.TIMEZONE || 'UTC',
  },
  
  // Storage configuration
  storage: {
    filePath: process.env.STORAGE_FILE_PATH || './data/billing-history.json',
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  }
};

// Validate critical configuration
const validateConfig = () => {
  const requiredVars = [
    { key: 'digitalOcean.apiToken', value: config.digitalOcean.apiToken },
    { key: 'telex.apiKey', value: config.telex.apiKey },
    { key: 'telex.integrationId', value: config.telex.integrationId }
  ];
  
  const missingVars = requiredVars
    .filter(item => !item.value)
    .map(item => item.key);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required configuration: ${missingVars.join(', ')}`);
  }
};

module.exports = {
  ...config,
  validateConfig
};

