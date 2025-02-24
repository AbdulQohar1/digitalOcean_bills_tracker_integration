// main app entry point
const cron = require('node-cron');
const config = require('./config');
const logger = require('./utils/logger');
const { runBillTracker} = require('./services/index');

// validate required configuration before process startup
try {
  config.validateConfig();
} catch (error) {
  logger.error('Configuration validation failed: ', {error: error.message});
  process.exit(1);
}

// initialize the application 
// sets up cron and tracker scheduler 
function initialize() {
  logger.info('Initializing DigitalOcean Bill Tracker');

  //schedule the bill tracker job using the configured cron schedule
  cron.schedule(
    config.scheduler.cronSchedule, 
    runBillTracker,
  {timezone: config.scheduler.timezone}
  );
  
  logger.info(`Bill tracking scheduled: ${config.scheduler.cronSchedule} (${config.scheduler.timezone})`);

  // run bill tracking immediately after startup
  runBillTracker().catch(error => {
    logger.error('Initial job run failed', { error: error.message });
  });
}

initialize();