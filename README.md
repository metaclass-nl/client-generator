# API Platform Client Generator

API Platform Client Generator is a generator to scaffold app with Create-Retrieve-Update-Delete features for any API exposing a [Hydra](http://www.hydra-cg.com/spec/latest/core/) or [OpenAPI](https://www.openapis.org/) documentation for:

* Next.js
* Nuxt.js
* Quasar Framework
* React/Redux
* React Native
* TypeScript Interfaces
* Vue.js
* Vuetify.js

Works especially well with APIs built with the [API Platform](https://api-platform.com) framework.

## Adapted version

This branch holds an adapted version of React Generator
based on the [Tutorial chapter 4 react branch](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter4-react).
It scaffolds an Internationalized and Localized application that uses [React Intl](https://formatjs.io/docs/react-intl/)
and shows entity names/labels instead of @ids and a Select widget for for a single reference.
It also generates the necessary common components, utils and message files.

Be aware that the code scaffolded by these templates needs data from
the api to contain label properties to be typed as http://schema.org/name
and labels of referred entities to be included (possible by serialization groups). 
Because the generator only has access to the metadata of the single type for which it is scaffolding,
it assumes all referred types label properties have the same name. If this assumption is wrong
you need to correct the scaffolded code. See 
[the tutorial chapter 4 api branche](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter4-api) 
for an example on how to create the required annotations. 

Finally, if your application needs the user to edit references to multiple
entities, the scaffolded entryfield will only be usable if you show the @ids
of the entities somewhere in the application, for example in the List component.

See the readme of [the tutorial chapter 3 react branche](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter3-react) 
for how to adapt your client/src/index.js 
for React Intl and an example of how to adapt client/src/messages/all.js. 

Usage see the [master branch](https://github.com/metaclass-nl/client-generator)