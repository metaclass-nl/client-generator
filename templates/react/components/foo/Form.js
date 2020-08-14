import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import * as inputLoc from '../../utils/inputLocalization';
import {FormattedMessage} from 'react-intl';
import ReduxFormRow from '../common/ReduxFormRow.js';
import getIntl from "../../utils/intlProvider";
{{#if hasRef1Field}}
import SelectEntity from '../common/SelectEntity.js';
{{/if}}

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

    renderField = data => {
      return <ReduxFormRow {...data} apiError={this.props.error}/>;
    }

  render() {
    const intl = getIntl();
    return (
      <form onSubmit={this.props.handleSubmit}>
{{#each formFields}}
        <Field
          component={this.renderField}
          name="{{{name}}}"{{#unless maxCardinality}}
          type="{{#compare type "==" "dateTime" }}datetime-local{{else}}{{{type}}}{{/compare}}"{{/unless}}
          label=<FormattedMessage id="{{{../lc}}}.{{{name}}}" defaultMessage="{{{name}}}" />{{#if step}}
          step="{{{step}}}"{{/if}}
          placeholder={{#if description}}{intl.formatMessage({id:"{{{../lc}}}.{{{name}}}.placeholder", defaultMessage:"{{{description}}}"}) }{{else}}""{{/if}}{{#if required}}
          required={true}{{/if}}{{#if reference}}{{#unless maxCardinality}}
          normalize={v => (v === '' ? [] : v.split(','))}{{else}}
          widget={SelectEntity}
          labelProp="{{{../labelField}}}"
          fetchUrl="{{{reference.name}}}?pagination=false"{{/unless}}
          {{/if}}{{#if number}}
          format={inputLoc.formatNumber}
          normalize={inputLoc.normalizeNumber}
          {{/if}}{{#compare type "==" "date" }}
          format={inputLoc.formatDate}
          normalize={inputLoc.normalizeDate}
          {{/compare}}{{#compare type "==" "time" }}
          format={inputLoc.formatTime}
          normalize={inputLoc.normalizeTime}
          {{/compare}}{{#compare type "==" "dateTime" }}
          format={inputLoc.formatDateTime}
          normalize={inputLoc.normalizeDateTime}
          {{/compare}}/>
{{/each}}

        <button type="submit" className="btn btn-success">
          <FormattedMessage id="submit" defaultMessage="Submit"/>
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: '{{{lc}}}',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
