import { defineConfig, devices } from '@playwright/test';
import os from 'os';
import { Constants } from './utilities/constants';


export default defineConfig({
    globalSetup: require.resolve('./config/global.setup.ts'),
    globalTeardown: require.resolve('./config/global.teardown.ts'),
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? Constants.MAX_RETRY_ATTEMPTS : 1,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? Constants.CI_WORKERS : Constants.LOCAL_WORKERS,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['line'],
        // ['@estruyf/github-actions-reporter', 
        //     { title: 'Automation Tech99 Project', 
        //         useDetails: true, 
        //         showError: true,          
        //         showTags: true ,        
        //     }],
        [
            'allure-playwright',
            {
                name: "My Test Report",
                detail: true,
                suiteTitle: true,
                environmentInfo: {
                    os_platform: os.platform(),
                    os_release: os.release(),
                    os_version: os.version(),
                    node_version: process.version
                }
            },
        ],
        [
            'monocart-reporter',
            {
                name: 'Monocart Playwright Report',
                outputFile: 'monocart-report/index.html',
                coverage: false,
                trend: true,
                attachments: true,
            }
        ]

    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'retain-on-failure',
        viewport: process.env.CI ? { width: 1920, height: 1080 } : { width: 1920, height: 1080 },
        actionTimeout: 30 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: 'on'
    },
    expect: {
        timeout: 30 * 1000,
        toHaveScreenshot: {
            maxDiffPixels: 10
        },
        toMatchSnapshot: {
            maxDiffPixelRatio: 0.1,
        }
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Chrome',
            use: {
                ...devices['Chrome'],
                baseURL: process.env.BASE_URL ?? Constants.BASE_URL,
                viewport: { width: 1920, height: 1080 },
                ignoreHTTPSErrors: true,
                browserName: 'chromium',
                channel: 'chrome'
            },
        },
        {
            name: 'Firefox',
            use: {
                ...devices['Firefox'],
                baseURL: process.env.BASE_URL ?? Constants.BASE_URL,
                viewport: { width: 1920, height: 1080 },
                ignoreHTTPSErrors: true,
                browserName: 'firefox',
                channel: 'firefox'
            },
        },
        {
            name: 'Edge',
            use: {
                ...devices['Edge'],
                baseURL: process.env.BASE_URL ?? Constants.BASE_URL,
                viewport: { width: 1920, height: 1080 },
                ignoreHTTPSErrors: true,
                browserName: 'chromium',
                channel: 'msedge'
            },
        }

    ],
});
