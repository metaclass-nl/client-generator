import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";
import handlebars from "handlebars";
import hbh_comparison from "handlebars-helpers/lib/comparison";
import hbh_string from "handlebars-helpers/lib/string";

export default class extends BaseGenerator {
  constructor(params) {
    super(params);

    this.registerTemplates("react-common/", [
      // actions
      "actions/foo/create.js",
      "actions/foo/delete.js",
      "actions/foo/list.js",
      "actions/foo/update.js",
      "actions/foo/show.js",

      // utils
      "utils/dataAccess.js",

      // reducers
      "reducers/foo/create.js",
      "reducers/foo/delete.js",
      "reducers/foo/index.js",
      "reducers/foo/list.js",
      "reducers/foo/update.js",
      "reducers/foo/show.js",
    ]);

    this.registerTemplates(`react/`, [
      // common components
      "components/common/EntityLinks.js",
      "components/common/intlDefined.js",
      "components/common/Pagination.js",
      "components/common/ReduxFormRow.js",
      "components/common/SelectEntity.js",
      "components/common/ListTool.js",
      "components/common/ThSort.js",
      "components/common/SelectThreeState.js",

      // components
      "components/foo/Create.js",
      "components/foo/Form.js",
      "components/foo/index.js",
      "components/foo/List.js",
      "components/foo/Update.js",
      "components/foo/Show.js",
      "components/foo/SearchTool.js",
      "components/foo/SearchForm.js",

      // routes
      "routes/foo.js",

      //utils
      "utils/inputLocalization.js",
      "utils/intlProvider.js",

      // messages
      "messages/foo-en.js",
      "messages/common-en.js",
      "messages/all.js",

      // other
      "main.css",
    ]);

    handlebars.registerHelper("compare", hbh_comparison.compare);
    handlebars.registerHelper("capitalize", hbh_string.capitalize);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();

    console.log(
      'Code for the "%s" resource type has been generated!',
      resource.title
    );
    console.log(
      "Paste the following definitions in your application configuration (`client/src/index.js` by default):"
    );
    console.log(
      chalk.green(`
// import reducers
import ${titleLc} from './reducers/${titleLc}/';

//import routes
import ${titleLc}Routes from './routes/${titleLc}';

// Add the reducer
combineReducers({ ${titleLc},/* ... */ }),

// Add routes to <Switch>
{ ${titleLc}Routes }
`)
    );

    console.log("and paste the following in your application messages import (`client/src/messages/all.js`");
    console.log(
      chalk.green(`
      import ${titleLc}_en from './${titleLc}-en';

      // Add messages to all
      en: {...common_en, ...${titleLc}_en, /* ... */ },
`)
    );
  }

  generate(api, resource, dir) {
    const lc = resource.title.toLowerCase();
    const titleUcFirst =
      resource.title.charAt(0).toUpperCase() + resource.title.slice(1);
    let labelField = "@id";
    let hasRef1Field = false;
    let hasBoolField = false;
    for (let i = 0; i < resource.readableFields.length; i++) {
      let field = resource.readableFields[i];
      if (field.id === "http://schema.org/name") {
        labelField = field.name;
      }
      if (field.reference && field.maxCardinality === 1) {
        hasRef1Field = true;
      }
      if (field.range === "http://www.w3.org/2001/XMLSchema#boolean") {
        hasBoolField = true;
      }
    }

    const context = {
      title: resource.title,
      name: resource.name,
      lc,
      uc: resource.title.toUpperCase(),
      fields: resource.readableFields,
      formFields: this.buildFields(resource.writableFields),
      hydraPrefix: this.hydraPrefix,
      titleUcFirst,
      labelField,
      hasRef1Field,
      hasBoolField,
    };

    // Create directories
    // These directories may already exist
    [
      `${dir}/utils`,
      `${dir}/config`,
      `${dir}/routes`,
      `${dir}/components/common`,
      `${dir}/messages`
    ].forEach((dir) =>
      this.createDir(dir, false)
    );

    [
      `${dir}/actions/${lc}`,
      `${dir}/components/${lc}`,
      `${dir}/reducers/${lc}`,
    ].forEach((dir) => this.createDir(dir));

    [
      // actions
      "actions/%s/create.js",
      "actions/%s/delete.js",
      "actions/%s/list.js",
      "actions/%s/update.js",
      "actions/%s/show.js",

      // components
      "components/%s/Create.js",
      "components/%s/Form.js",
      "components/%s/index.js",
      "components/%s/List.js",
      "components/%s/Update.js",
      "components/%s/Show.js",
      "components/%s/SearchTool.js",
      "components/%s/SearchForm.js",

      // reducers
      "reducers/%s/create.js",
      "reducers/%s/delete.js",
      "reducers/%s/index.js",
      "reducers/%s/list.js",
      "reducers/%s/update.js",
      "reducers/%s/show.js",

      // routes
      "routes/%s.js",

      // messages
      "messages/%s-en.js"
    ].forEach((pattern) =>
      this.createFileFromPattern(pattern, dir, lc, context)
    );

    // utils
    this.createFile(
      "utils/dataAccess.js",
      `${dir}/utils/dataAccess.js`,
      context,
      false
    );
    this.createFile(
      "utils/inputLocalization.js",
      `${dir}/utils/inputLocalization.js`,
      context,
      false
    );
    this.createFile(
      "utils/intlProvider.js",
      `${dir}/utils/intlProvider.js`,
      context,
      false
    );

    // common components
    this.createFile(
      "components/common/EntityLinks.js",
      `${dir}/components/common/EntityLinks.js`,
      context,
      false
    );
    this.createFile(
      "components/common/intlDefined.js",
      `${dir}/components/common/intlDefined.js`,
      context,
      false
    );
    this.createFile(
      "components/common/Pagination.js",
      `${dir}/components/common/Pagination.js`,
      context,
      false
    );
    this.createFile(
      "components/common/ReduxFormRow.js",
      `${dir}/components/common/ReduxFormRow.js`,
      context,
      false
    );
    this.createFile(
      "components/common/SelectEntity.js",
      `${dir}/components/common/SelectEntity.js`,
      context,
      false
    );
    this.createFile(
      "components/common/ListTool.js",
      `${dir}/components/common/ListTool.js`,
      context,
      false
    );
    this.createFile(
      "components/common/ThSort.js",
      `${dir}/components/common/ThSort.js`,
      context,
      false
    );
    this.createFile(
      "components/common/SelectThreeState.js",
      `${dir}/components/common/SelectThreeState.js`,
      context,
      false
    );

    // common messages
    this.createFile(
      "messages/common-en.js",
      `${dir}/messages/common-en.js`,
      context,
      false
    );
    this.createFile(
      "messages/all.js",
      `${dir}/messages/all.js`,
      context,
      false
    );

    // other
    this.createFile(
      "main.css",
      `${dir}/main.css`,
      context,
      false
    );

    this.createEntrypoint(api.entrypoint, `${dir}/config/entrypoint.js`);
  }
}
