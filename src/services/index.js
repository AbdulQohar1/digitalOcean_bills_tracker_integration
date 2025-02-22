const digitalOceanService = require('./digitalOceanService');
const telexService  =  require('./telexService');
const logger = require ('../utils/logger');

// main function that runs the bill tracking process
// Fetches data from DigitalOcean, sends update to Telex

async function runBillTracker() {
  try {
    logger.info('Starting DigitalOcean bill tracker job');

    // fetch the billing data from DigitalOcean
    const bill =  await digitalOceanService.getCurrrentBillingCycle();

    // Send the update to Telex
    await telexService.sendBillUpdate(bill);

    logger.info('DigitalOcean bill tracking completed successfully')
  } catch (error) {
    logger.error('Bill tracking failed', { 
      error: error.message,
      stack: error.stack
    });
  }
}

module.exports = {
  runBillTracker
}