import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset, query } from '../../actions/{{{lc}}}/list';
import {FormattedMessage} from "react-intl";
import * as defined from '../common/intlDefined';
import EntityLinks from '../common/EntityLinks';
import Pagination from "../common/Pagination";
import {buildQuery} from "../../utils/dataAccess";
import ListTool from "../common/ListTool";
import ThSort from "../common/ThSort";


class List extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  values = {};

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  /**
   * Call Back for ListTool or SearchTool
   * @param {} values
   * @param string apiQuery
   */
  list(values, apiQuery) {
    this.values = values;
    this.props.query(this.props.location.search);
    this.props.list("/{{{name}}}?" + apiQuery);
  }

  /**
   * Call back for pagination buttons
   * @param string page (numeric)
   */
  page(page) {
    this.values.page = page;
    this.props.history.push("?" + buildQuery(this.values));
  }

  /**
   * Call back for sort headers
   * @param {} order
   */
  order(order) {
    this.values.order = order;
    this.props.history.push("?" + buildQuery(this.values));
  }

  render() {
    return (
      <div>
        <h1><FormattedMessage id="{{{lc}}}.list" defaultMessage="{{{title}}} List"/></h1>

        {this.props.loading && (
          <div className="alert alert-info"><FormattedMessage id="loading" defaultMessage="Loading..."/></div>
        )}
        {this.props.deletedItem && (
          <div className="alert alert-success">
            <FormattedMessage id="{{{lc}}}.deleted" defaultMessage="{label} deleted" values={ {label: this.props.deletedItem['@id']} }/>
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
        )}

        <div className="toolbar">
          <ListTool
            query={this.props.location.search}
            list={this.list.bind(this)}
            history={this.props.history}
          />
          <div className="toolbar-buttons form-group">
            <Link to="create" className="btn btn-primary">
              <FormattedMessage id="{{{lc}}}.create" defaultMessage="Create"/>
            </Link>
          </div>
        </div>


        <table className="table table-responsive table-striped table-hover">
          <thead>
            <tr>
              <th><FormattedMessage id="{{{lc}}}.item" default="{{{title}}}"/></th>
{{#each fields}}
              {{#if reference}}<th>{{else}}<ThSort orderBy={ {"{{{name}}}": "asc"} } order={this.values.order} onClick={order=>this.order(order)}>{{/if}}
                <FormattedMessage id="{{{../lc}}}.{{{name}}}" defaultMessage="{{{name}}}"/>
            {{#if reference}}</th>{{else}}</ThSort>{{/if}}
{{/each}}
              <th colSpan={2} />
            </tr>
          </thead>
          <tbody>
            {this.props.retrieved &&
              this.props.retrieved['hydra:member'].map(item => (
                <tr key={item['@id']}>
                  <th scope="row">
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      {item['{{{labelField}}}']}
                    </Link>
                  </th>
{{#each fields}}
                  <td>{{#if reference}}<EntityLinks type="{{{reference.name}}}" items={item['{{{name}}}']} labelProp="{{{../labelField}}}" />{{else}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#date" }}
                  <defined.FormattedDate value={item['{{{name}}}']} />
                  {{/compare}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#time" }}
                  <defined.FormattedTime value={item['{{{name}}}']} />
                  {{/compare}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#dateTime" }}
                  <defined.FormattedDateTime value={item['{{{name}}}']} />
                  {{/compare}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#boolean" }}
                  <defined.LocalizedBool value={item['{{{name}}}']} />
                  {{/compare}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#integer" }}
                  <defined.FormattedNumber value={item['{{{name}}}']}/>
                  {{/compare}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#decimal" }}
                  <defined.FormattedNumber value={item['{{{name}}}']}/>
                  {{/compare}}
                  {{#compare range "==" "http://www.w3.org/2001/XMLSchema#string" }}
                  {item['{{{name}}}']}
                  {{/compare}}
                  {{#compare range "==" "http://schema.org/name" }}
                  {item['{{{name}}}']}
                  {{/compare}}
                  {{/if}}</td>
{{/each}}
                  <td>
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-search" aria-hidden="true" />
                      <span className="sr-only"><FormattedMessage id="show" defaultMessage="Show"/></span>
                    </Link>
                  </td>
                  <td>
                    <Link to={`edit/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-pencil fa-pencil-alt" aria-hidden="true" />
                      <span className="sr-only"><FormattedMessage id="edit" defaultMessage="Edit"/></span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination retrieved={this.props.retrieved} onClick={page=>this.page(page)} />
      </div>
    );
  }

}

const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.{{{lc}}}.list;
  return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource)),
  query: queryString => dispatch(query(queryString))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
