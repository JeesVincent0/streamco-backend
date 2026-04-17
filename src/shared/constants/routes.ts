export const ROUTES = {
  // FOR ADMIN
  ADMIN: {
    ROOT: 'admin',
    CHANNELS: 'channels',
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
