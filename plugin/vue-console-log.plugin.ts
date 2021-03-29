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
   * ```ts
   *  'red', '#fff'
   * ```
   */
  color: string;

  /**
   * Plugin state
   */
  isEnabled: boolean;
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
};

/**
 * Create mixin
 *
 * @param config
 */
function createMixin(config: LogOptions = defaults) {
  return {
    methods: {
      $log(...data: any[]): boolean {
        if (config.isEnabled) {
          console.info(
            `%c<${kebabCase((this as Vue).$options.name)}>`,
            `color: ${config.color}`,
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
function install(vue: VueConstructor, options: LogOptions) {
  const config = { ...defaults, ...options };

  vue.mixin(createMixin(config));
}

export const vueConsoleLogMixin = createMixin();

export default {
  defaults,
  install,
};
