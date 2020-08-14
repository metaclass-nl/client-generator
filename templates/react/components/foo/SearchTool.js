import React from "react";
import ListTool from "../common/ListTool";
import PropTypes from "prop-types";
import { buildQuery } from "../../utils/dataAccess";
import SearchForm from "./SearchForm";
import isEqual from "lodash/isEqual";
{{#if hasRef1Field}}
import get from "lodash/get";
{{/if}}

const pageParameterName = "page";
const orderParameterName = "order";

class SearchTool extends ListTool {
  static propTypes = {
    query: PropTypes.string,
    list: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  /**
   * Please correct this method manually depending on the
   * actual fields of the SearchForm
   */
  apiRequest() {
    const { page, order } = this.values;
    const req = {};
    req[pageParameterName] = page;
    req[orderParameterName] = order;
{{#each formFields}}{{#compare type "==" "number" }}{{#if step}}
    if (this.values.{{{name}}}) {
      req.{{{name}}} = { gte: this.values.{{{name}}} - 0.05, lt: this.values.{{{name}}} + 0.05 };
    }{{else}}
    req.{{{name}}} = this.values.{{{name}}};{{/if}}{{/compare}}{{#compare type "==" "date" }}
    if (this.values.{{{name}}}) {
      req.{{{name}}} = { after: this.values.{{{name}}}, before: this.values.{{{name}}} };
    }{{/compare}}{{#compare type "==" "time" }}
    if (this.values.{{{name}}}) {
      req.{{{name}}} = { after: this.values.{{{name}}}, before: this.values.{{{name}}} };
    }{{/compare}}{{#compare type "==" "dateTime" }}
    if (this.values.{{{name}}}) {
      req.{{{name}}} = { after: this.values.{{{name}}}, before: this.values.{{{name}}} };
    }{{/compare}}{{#compare type "==" "text" }}{{#if maxCardinality}}
    if (get(this.values, "{{{name}}}.id")) {
      // need to strip /{{{name}}}/
      req.{{{name}}} = this.values.{{{name}}}.id.substring("{{{name}}}".length + 3);
    }{{else}}{{#unless reference}}
    req.{{{name}}} = this.values.{{{name}}};{{/unless}}{{/if}}{{/compare}}{{#compare type "==" "email" }}
    req.{{{name}}} = this.values.{{{name}}};{{/compare}}{{#compare type "==" "url" }}
    req.{{{name}}} = this.values.{{{name}}};{{/compare}}{{#compare type "==" "checkbox" }}
    req.{{{name}}} = this.values.{{{name}}};{{/compare}}{{/each}}
    return req;
  }

  /**
   * Please correct this method manually depending on the
   * actual fields of the SearchForm
   */
  shouldProcessChange(values, oldValues) {
{{#each formFields}}{{#if maxCardinality}}
    if (get(values, "{{{name}}}.id") !== get(oldValues, "{{{name}}}.id")) return true;
    {{/if}}{{#compare type "==" "date" }}
    if (values.{{{name}}} !== oldValues.{{{name}}}
      && (!values.{{{name}}} || values.{{{name}}}.substring(0, 4) >= "1000")
    ) return true;{{/compare}}{{#compare type "==" "dateTime" }}
    if (values.{{{name}}} !== oldValues.{{{name}}}
      && (!values.{{{name}}} || values.{{{name}}}.substring(0, 4) >= "1000")
    ) return true;{{/compare}}{{#compare type "==" "time" }}
    if (values.{{{name}}} !== oldValues.{{{name}}}) return true;{{/compare}}{{#compare type "==" "checkbox" }}
    if (values.{{{name}}} !== oldValues.{{{name}}}) return true;{{/compare}}{{/each}}
    return false;
  }

  /**
   * Please correct this method manually depending on the
   * actual fields of the SearchForm
   */
  valuesFromQuery() {
    super.valuesFromQuery();
{{#each formFields}}
    {{#if number}}
    if (this.values.{{{name}}}) {
      this.values.{{{name}}} = parseFloat(this.values.{{{name}}});
    }
    {{/if}}
{{/each}}
  }

  /**
   * Event handler for changes in the search form.
   * Reset page.
   * Only process changes from fields that do not react to Enter key.
   * @param {} values
   */
  formChange(values) {
    if (this.shouldProcessChange(values, this.values)) {
      values.page = undefined;
      this.props.history.push("?" + buildQuery(values));
    }
  }

  /**
   * Event handler for submission of the search form.
   * If values have changed, reset page and push query to history.
   * @param {} values
   */
  formSubmit(values) {
    if (isEqual(values, this.values)) return;

    values.page = undefined;
    this.props.history.push("?" + buildQuery(values));
  }

  render() {
    return (
      <SearchForm
        onSubmit={values => this.formSubmit(values)}
        onChange={values => this.formChange(values)}
        initialValues={this.values}
        className="search"
      />
    );
  }
}

export default SearchTool;
