# API Platform Client Generator

API Platform Client Generator is a generator to scaffold app with Create-Retrieve-Update-Delete features for any API exposing a [Hydra](http://www.hydra-cg.com/spec/latest/core/) or [OpenAPI](https://www.openapis.org/) documentation for:
 * React/Redux
 * React Native
 * Vue.js

Works especially well with APIs built with the [API Platform](https://api-platform.com) framework.

## Adapted version

This branch holds an adapted version of React Generator
based on the [Tutorial chapter 3 react branch](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter3-react).
It scaffolds an Internationalized and Localized application that uses [React Intl](https://formatjs.io/docs/react-intl/).
In addition to the templates from the tutorial this generator also generates the 
necessary common components, utils and message files.

See the readme of [the tutorial chapter 3 react branche](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter3-react) 
for how to adapt your client/src/index.js 
for React Intl and an example of how to adapt client/src/messages/all.js. 

Usage see the [master branch](https://github.com/metaclass-nl/client-generator)