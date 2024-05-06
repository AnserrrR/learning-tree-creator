import fs from 'fs';
import path from 'path';
import * as process from 'process';
import type { ReadonlyDeep } from 'type-fest';
import { Injectable, Logger } from '@nestjs/common';
import { set, values } from 'lodash';
import { joi } from '../common/constants/joi-configured';
import { NodeEnv } from './node-env.enum';

/**
 * Interface for typing the application startup configuration.
 * Provides connection data to various services.
 */
export interface IJsonConfig {
  /**
   * App environment mode enum.
   */
  nodeEnv: NodeEnv;
  /**
   * Application host.
   */
  host: string;
  /**
   * Application port.
   */
  port: number;
}

/**
 * Service that receives startup configuration of the whole application
 */
@Injectable()
export class ConfigService {
  private readonly validatedConfig: IJsonConfig;

  public readonly isMode: ReadonlyDeep<Record<NodeEnv, boolean>> = values(NodeEnv)
    .reduce<any>((acc, key) => set(acc, key, key === process.env.NODE_ENV), {});

  private logger = new Logger(ConfigService.name);

  /**
   * Config Constructor: tries to read env.CONFIG_PATH or 'config.${NODE_ENV}.json'.
   * Performs initialization for use of the getConfig() method.
   */
  constructor() {
    this.validateEnvironment();

    const configPathDefault = `config.${process.env.NODE_ENV}.json`;
    const configPath = path.resolve(process.env.CONFIG_PATH || configPathDefault);
    let fileText: string;
    let deserializedConfig: unknown;

    try {
      fileText = fs.readFileSync(configPath).toString();
    } catch (e) {
      this.throwConfigLoadingError(
        process.env.CONFIG_PATH
          ? `file "${configPath}" not exist`
          : `please create a "${configPathDefault}" or provide a "CONFIG_PATH" env variable`,
      );
    }

    try {
      deserializedConfig = JSON.parse(fileText);
    } catch (e) {
      this.throwConfigLoadingError(`failed to parse file ${configPath} as JSON`);
    }

    this.logger.log(`Configuration loaded from ${configPath}`);
    this.validatedConfig = this.validateConfig(deserializedConfig);
  }

  /**
   * Method for getting the loaded application configuration
   */
  public get config(): ReadonlyDeep<IJsonConfig> {
    return this.validatedConfig;
  }

  /**
   * Template Method for throwing an error of loading the application configuration
   */
  private throwConfigLoadingError(errorMessage: string): never {
    throw new Error(`Failed to load configuration: ${errorMessage}`);
  }

  /**
   * Method for validation of environment variables.
   */
  private validateEnvironment() {
    const { error } = this.environmentSchema.validate(process.env);
    if (error) {
      throw new Error(`Environment validation error: ${error.message})`);
    }
  }

  /**
   * Method for validation of loaded config.
   * Must be called after validating environment variables.
   */
  private validateConfig(config: unknown): IJsonConfig {
    const { error, value } = this.configSchema.validate(config);
    if (error) {
      throw new Error(`Config validation error: ${error.message})`);
    }
    return value;
  }

  /**
   * Joi schema for environment validation
   */
  private readonly environmentSchema = joi.object<NodeJS.ProcessEnv>({
    CONFIG_PATH: joi.string().optional(),
    NODE_ENV: joi.string().valid(...values(NodeEnv)).required(),
  }).required();

  /**
   * Joi schema for config validation
   */
  private readonly configSchema = joi.object<IJsonConfig>({
    nodeEnv: joi.string().forbidden().default(process.env.NODE_ENV),
    host: joi.string().hostname().required(),
    port: joi.number().port().required(),
  }).rename('permissionPort', 'port');
}
