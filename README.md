# Vue Console Log

Plugin and mixin that adds a `$log` method for logging to the console

## Connection

```ts
import Vue from 'vue';

import VueConsoleLogPlugin, {
  vueConsoleLogMixin,
} from '@alexlit/vue-console-log';

export { vueConsoleLogMixin };

Vue.use(VueConsoleLogPlugin, {
  isEnabled: process.env.NODE_ENV === 'development', // optional
  color: '#000', // optional
});
```

## Usage

```ts
MyComponent.$log('hello'); // <my-component> hello
```
