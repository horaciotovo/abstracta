import dotenv from 'dotenv';
import path from 'path';

/**
 * Load environment configuration based on NODE_ENV or ENVIRONMENT variable.
 * Supports .env.qa, .env.stg, and .env files.
 */
function loadEnvironmentConfig(): void {
  const environment = process.env.ENVIRONMENT || process.env.NODE_ENV || 'qa';
  const envFile = path.resolve(__dirname, `../../.env.${environment}`);

  // Load environment-specific file (.env.qa, .env.stg, etc.)
  dotenv.config({ path: envFile });

  // Load .env.local if it exists (for local overrides)
  dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
}

/**
 * Environment configuration interface
 */
export interface EnvironmentConfig {
  environment: string;
  baseUrl: string;
  testUsername: string;
  testPassword: string;
  testProductName: string;
  headless: boolean;
}

/**
 * Get the current environment configuration.
 * @returns Environment configuration object
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  loadEnvironmentConfig();

  const config: EnvironmentConfig = {
    environment: process.env.ENVIRONMENT || 'qa',
    baseUrl: process.env.BASE_URL || 'https://www.demoblaze.com/',
    testUsername: process.env.TEST_USERNAME || '',
    testPassword: process.env.TEST_PASSWORD || '',
    testProductName: process.env.TEST_PRODUCT_NAME || '',
    headless: process.env.HEADLESS === 'true' || false,
  };

  // Validate required configuration
  if (!config.testUsername || !config.testPassword || !config.testProductName) {
    throw new Error(
      'TEST_USERNAME, TEST_PASSWORD, and TEST_PRODUCT_NAME must be set in .env files'
    );
  }

  return config;
}

/**
 * Get the base URL for the current environment.
 * @returns Base URL string
 */
export function getBaseUrl(): string {
  loadEnvironmentConfig();
  return process.env.BASE_URL || 'https://www.demoblaze.com/';
}

/**
 * Get test credentials for the current environment.
 * @returns Object with username and password
 */
export function getTestCredentials(): { username: string; password: string } {
  loadEnvironmentConfig();

  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error(
      'TEST_USERNAME and TEST_PASSWORD must be set in .env files'
    );
  }

  return { username, password };
}

/**
 * Get the current environment name.
 * @returns Environment name (qa, stg, etc.)
 */
export function getEnvironment(): string {
  loadEnvironmentConfig();
  return process.env.ENVIRONMENT || 'qa';
}
