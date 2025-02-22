// handles all interactions with the digitalOceean API
const axios =  require('axios');
const config = require('../config');
const logger = require('../utils/logger');

class DigitalOceanService {
  constructor() {
    this.client = axios.create({
      baseURL: config.digitalOcean.apiBaseUrl,
      headers: {
        'Authorization': `Bearer ${config.digitalOcean.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // fetching the current billing data from DigitalOcean
  // @returns  {Promise<Object>}  //the billing data response
  async getBillingHistory() {
    try {
      logger.info('Fetching DigitalOcean billing data');

      const response = await this.client.get('/customers/my/billing_history');

      return response.data.billing_history;
    } catch (error) {
      logger.error('Error fetching DigitalOcean billing history', { error: error.message });
      throw new Error(`Failed to fetch DigitalOcean billing: ${error.message}`);
    }
  }

  async getCurrrentBillingCycle() {
    try {
      logger.info('Fetching DigitalOcean current billing data');
      const date = new Date();
      const response = await this.client.get('/customers/my/balance');

      return {
        total_bill_this_cycle: response.data.month_to_date_balance, 
        current_usage_cost: response.data.month_to_date_usage, 
        remaining_balance: response.data.account_balance, 
        generated_at: date.toISOString(),
        billing_cycle: `${date.getFullYear()}-${date.getMonth() + 1}`
  }
    } catch (error) {
      logger.error('Error fetching DigitalOcean current billing', { error: error.message });
      throw new Error(`Failed to fetch DigitalOcean current billing: ${error.message}`);
    }
  }
}

module.exports = new DigitalOceanService();



/*
 async getBillingHistory() {
    try {
      logger.info('Fetching DigitalOcean billing history');
      const response = await this.client.get('/customers/my/billing_history');
      return response.data.billing_history;
    } catch (error) {
      logger.error('Error fetching DigitalOcean billing history', { error: error.message });
      throw new Error(`Failed to fetch DigitalOcean billing: ${error.message}`);
    }
  }

  async getCurrentBillingCycle() {
    try {
      logger.info('Fetching DigitalOcean current billing data');
      const date = new Date();
      const response = await this.client.get('/customers/my/balance');
      
      return {
        month_to_date_balance: response.data.month_to_date_balance,
        account_balance: response.data.account_balance,
        month_to_date_usage: response.data.month_to_date_usage,
        generated_at: date.toISOString(),
        current_period: `${date.getFullYear()}-${date.getMonth() + 1}`
      };
    } catch (error) {
      logger.error('Error fetching DigitalOcean current billing', { error: error.message });
      throw new Error(`Failed to fetch DigitalOcean current billing: ${error.message}`);
    }
  }
}
*/

