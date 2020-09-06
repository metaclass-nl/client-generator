import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/{{{lc}}}/create';
import {FormattedMessage} from "react-intl";
// import {parseQuery} from "../../utils/dataAccess";

class Create extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if (this.props.created)
      return (
        <Redirect
          to={`edit/${encodeURIComponent(this.props.created['@id'])}`}
        />
      );

    const initialValues = {};
    // const listValues = parseQuery(this.props.listQuery);
    // eventually add  initialValues from listValues

    return (
      <div>
        <h1><FormattedMessage id="{{{lc}}}.new" defaultMessage="New {{{title}}}"/></h1>

        {this.props.loading && (
          <div className="alert alert-info" role="status">
            <FormattedMessage id="loading" defaultMessage="Loading..."/>
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </div>
        )}

        <Form onSubmit={this.props.create} initialValues={initialValues} />
        <Link to={"./" + (this.props.listQuery ? this.props.listQuery : "")} className="btn btn-primary">
        <FormattedMessage id="backToList" defaultMessage="Back to list"/>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.{{{lc}}}.create;
  const listQuery = state.{{{lc}}}.list.query;
  return { created, error, loading, listQuery };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
