const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

class TelexService {
  constructor() {
    this.client = axios.create({
      baseURL: config.telex.apiBaseUrl,
      headers: {
        'Authorization': `Bearer ${config.telex.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
  }

  async pushBillingData(billingData) {
    try {
      logger.info('Pushing billing data to Telex');

      const payload = {
        integration_id: config.telex.integrationId,
        data: billingData
      };

      const  response = await this.client.post('integrations/push' , payload);
      logger.info('Successfully pushed data to Telex', { 
        status: response.status, 
        requestId: response.headers['x-request-id'] || 'unknown'
      });

      return response.data;
    } catch (error) {
      logger.error('Error pushing data to Telex', { error: error.message });
      throw new Error(`Failed to push data to Telex: ${error.message}`);
    }
  }
} 

module.exports = new TelexService();