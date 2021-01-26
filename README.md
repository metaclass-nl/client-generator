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
based on the [Tutorial chapter 6 react branch](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter6-react).
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

Sorting by single direct properties requires the Entity class to contain the following annotation:
```php comment
 * @ApiFilter(OrderFilter::class)
```
ThSort property isDefault should be set to true manually on the column whose orderBy is the default sort order 
For sorting by multiple properties per column and properties on related entities see the tutorial.

Search requires the specification of more Filters depending on the types of the properties to search by: 
- BooleanFilter for booleans
- DateFilter for Date, Time and DateTime
- RangeFilter for floats etc
- SearchFilter for other types
For examples see the readme of [the tutorial chapter 5 api branche](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter5-api)

Data about the filters offered by the api is currently not included in the JSON-LD documentation
generated by api platform that is used by the client generator. Therefore the generator scaffolds sort headers for all columns. 
The application developer is expected to correct this manually.

For the same reason the client generator does only scaffold a search tool for all
immediate properties. Because read-only properties are often not persistent, the writable properties are used.
These are the same properties that are used to generate the Form component.

Because of this the application developer probably needs to adapt the search tool and
form to make it work properly. Therefore the search tool is not used by default 
in the scaffolded List components. 

See the readme of [the tutorial chapter 3 react branche](https://github.com/metaclass-nl/tutorial-api-platform/tree/chapter3-react) for how to adapt your client/src/index.js 
for React Intl and an example of how to adapt client/src/messages/all.js. 

Usage see the [master branch](https://github.com/metaclass-nl/client-generator)