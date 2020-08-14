# API Platform Client Generator

[![Build Status](https://travis-ci.org/api-platform/client-generator.svg?branch=master)](https://travis-ci.org/api-platform/client-generator)
[![npm version](https://badge.fury.io/js/%40api-platform%2Fclient-generator.svg)](https://badge.fury.io/js/%40api-platform%2Fclient-generator)

API Platform Client Generator is a generator to scaffold app with Create-Retrieve-Update-Delete features for any API exposing a [Hydra](http://www.hydra-cg.com/spec/latest/core/) or [OpenAPI](https://www.openapis.org/) documentation for:
 * React/Redux
 * React Native
 * Vue.js

Works especially well with APIs built with the [API Platform](https://api-platform.com) framework.

## Adapted version

This fork includes branches with adapted versions of React Generator
based on the [Api Platform Tutorial](https://github.com/metaclass-nl/api-platform-tutorial).
that can be used to scaffold more user friendly Internationalized and Localized React applications.
The following branches are available:
- [tutorial-chapter3](https://github.com/metaclass-nl/client-generator/tree/tutorial-chapter3) 
  with Internationalization and Localization (uses React Intl)
- [tutorial-chapter4](https://github.com/metaclass-nl/client-generator/tree/tutorial-chapter4) 
  with the above and showing entity labels/names instead of @ids (requires corresponding serialization group annotations on the api)
- [tutorial-chapter6](https://github.com/metaclass-nl/client-generator/tree/tutorial-chapter6) 
  with the above and Searching and Sorting (requires manual adaptation, the above and corresponding filter annotations on the api)

There is no branche for chapter 7 (Authorization, JWT) because it only requires 2 components
and no scaffolding, you can follow the instructions of the 
[chapter7-react branch](https://github.com/metaclass-nl/api-platform-tutorial/tree/chapter8-react) of the tutorial. 

To use one of them first read the instructions in the readme of 
the branch (follow its link to github). Then follow the instructions on installing an 
[api platform distribution](https://api-platform.com/docs/distribution/#installing-the-framework) or 
[react client](https://api-platform.com/docs/client-generator/react/#install) 
and find the client src folder.

Then clone the repository somewhere where you can run npm or yarn:
```shell
git clone https://github.com/metaclass-nl/client-generator.git
```
Check out the branch (replace with the branch of your choice):
```shell 
git checkout tutorial-chapter6
```
With npm you can and build it like:
```shell 
npm run build
```
With npm you can run the actual scaffolding with:
```shell
./lib/index.js https://localhost:8443 <path to client src folder> 
```
You may have to make lib/index.js executable in the file system.
With yarn you need somewhat different commands.

Before you can run the scaffolded code you still need to 
Register the reducers and the routes in the client/src/index.js,
see [Generating](https://api-platform.com/docs/client-generator/react/#generating-a-progressive-web-app).

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
