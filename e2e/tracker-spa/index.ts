'use strict';

import { lightpanda } from '@lightpanda/browser';

import { chromium  } from 'playwright-core'

const proc = await lightpanda.serve({
  host: 'localhost',
  port: 9922
})

const browser = await chromium.connectOverCDP({
  wsEndpoint: `ws://localhost:9922`
})

const context = await browser.newContext({});

const page = await context.newPage();

page

proc.stdout.destroy();
proc.stderr.destroy();
proc.kill();