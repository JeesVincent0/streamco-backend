export const ROUTES = {
  // FOR ADMIN
  ADMIN: {
    ROOT: 'admin',
    CHANNELS: 'channels',
  },

  // FOR ADVERTISER
  ADVERTISER: {
    ROOT: 'advertiser',
    SCHEDULED_LIVE: 'scheduled-live',
  },

  // FOR CHANNEL
  CHANNEL: {
    ROOT: 'channel',
    CHANNELS: 'channels',
    BASE: 'base',
  },

  // FOR LIVE
  LIVE: {
    ROOT: 'live',
    SCHEDULE: 'schedule',
    SCHEDULED: 'scheduled',
  },

  // AUCTION
  AUCTION: {
    ROOT: 'auction',
    ANALYTICS: 'auction-analytics',
  },

  LIVES: {
    ROOT: `lives`,
  },

  // COMMIN ROUTES
  COMMON: {
    ID: ':id',
    ID2: ':id2',
    STATUS: 'status',
    CREATE: 'create',
    MONTH: `month`,
    DAY: `day`,
  },
};
