# API Platform Client Generator

[![Build Status](https://travis-ci.org/api-platform/client-generator.svg?branch=master)](https://travis-ci.org/api-platform/client-generator)
[![npm version](https://badge.fury.io/js/%40api-platform%2Fclient-generator.svg)](https://badge.fury.io/js/%40api-platform%2Fclient-generator)

API Platform Client Generator is a generator to scaffold app with Create-Retrieve-Update-Delete features for any API exposing a [Hydra](http://www.hydra-cg.com/spec/latest/core/) or [OpenAPI](https://www.openapis.org/) documentation for:
 * React/Redux
 * React Native
 * Vue.js

Works especially well with APIs built with the [API Platform](https://api-platform.com) framework.

## Adapted version

This branch holds an adapted version of React Generator
based on the [Api Platform Tutorial chapter 3 react branch](https://github.com/metaclass-nl/api-platform-tutorial/tree/chapter3-react).
It scaffolds an Internationalized and Localized application that uses [React Intl](https://formatjs.io/docs/react-intl/).
In addition to the templates from the tutorial this generator also generates the 
necessary common components, utils and message files.

See the readme of [the tutorial chapter 3 react branche](https://github.com/metaclass-nl/api-platform-tutorial/tree/chapter3-react) 
for how to adapt your client/src/index.js 
for React Intl and an example of how to adapt client/src/messages/all.js. 

## Documentation

The documentation of API Platform's Client Generator can be browsed [on the official website](https://api-platform.com/docs/client-generator).

## Usage

**Hydra**
```sh
npx @api-platform/client-generator https://demo.api-platform.com/ output/ --resource Book
```

**OpenAPI v2 (formerly known as Swagger)** (experimental)
```sh
npx @api-platform/client-generator https://demo.api-platform.com/docs.json output/ --resource Book --format swagger
```

or

```sh
npx @api-platform/client-generator https://demo.api-platform.com/docs.json output/ --resource Book --format openapi2
```

**OpenAPI v3** (experimental)
```sh
npx @api-platform/client-generator https://demo.api-platform.com/docs.json?spec_version=3 output/ --resource Book --format openapi3
```

## Features

* Generate high-quality ES6 components and files built with [React](https://facebook.github.io/react/), [Redux](http://redux.js.org), [React Router](https://reacttraining.com/react-router/) and [Redux Form](http://redux-form.com/) including:
  * A list view
  * A creation form
  * An editing form
  * A deletion button
* Use the Hydra or Swagger API documentation to generate the code
* Generate the suitable HTML5 input type (`number`, `date`...) according to the type of the API property
* Display of the server-side validation errors under the related input (if using API Platform Core)
* Client-side validation (`required` attributes)
* The generated HTML is compatible with [Bootstrap](https://getbootstrap.com/) and includes mandatory classes
* The generated HTML code is accessible to people with disabilities ([ARIA](https://www.w3.org/WAI/intro/aria) support)
* The Redux and the React Router configuration is also generated

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Sponsored by [Les-Tilleuls.coop](https://les-tilleuls.coop).
Commercial support available upon request.
