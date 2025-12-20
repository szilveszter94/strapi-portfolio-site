'use strict';

/**
 * theme-palette service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::theme-palette.theme-palette');
