/* eslint-disable import/no-extraneous-dependencies */
import kebabCase from 'lodash/kebabCase';
import type { VueConstructor } from 'vue';

interface Log {
  //
  /**
   * Calls console.info if log enabled
   *
   * @param {...any} data
   */
  $log(...data: any[]): boolean;
}

interface LogOptions {
  //
  /**
   * Prefix color (css value)
   *
   * @example
   *   'red', '#fff';
   */
  color: string;

  /**
   * Plugin state
   */
  isEnabled: boolean;

  /**
   * Native console method
   */
  method: 'error' | 'info' | 'log' | 'warn';
}

declare module 'vue/types/vue' {
  interface Vue {
    $log: Log['$log'];
  }
}

/**
 * Default config
 */
const defaults: LogOptions = {
  color: '#75c663',
  isEnabled: true,
  method: 'info',
};

/**
 * Create mixin
 *
 * @param config
 */
export function createMixin(config: Partial<LogOptions> = defaults) {
  const mixinConfig = { ...defaults, ...config };

  return {
    methods: {
      $log(...data: any[]): boolean {
        if (mixinConfig.isEnabled) {
          console[mixinConfig.method](
            `%c<${kebabCase((this as Vue).$options.name)}>`,
            `color: ${mixinConfig.color}`,
            ...data,
          );

          return true;
        }

        return false;
      },
    },
  };
}

/**
 * Plugin installation
 *
 * @param vue
 * @param options
 */
function install(vue: VueConstructor, options: Partial<LogOptions> = defaults) {
  const config = { ...defaults, ...options };

  vue.mixin(createMixin(config));
}

export default {
  defaults,
  install,
};
