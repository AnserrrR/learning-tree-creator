/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/consistent-type-definitions */
// noinspection JSUnusedGlobalSymbols

/**
 * Global environment variables of process.env.*
 */
namespace NodeJS {
  import { NodeEnv } from './config/node-env.enum';

  type ProcessEnv = {
    /**
     * Location of the config file
     */
    CONFIG_PATH?: string;
    /**
     * Current environment
     */
    NODE_ENV: NodeEnv;
  };
}
