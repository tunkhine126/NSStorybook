import React from 'react';
import TextLink from '../components/TextLink/index'
import globalMessages from '../messages';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from '../i18n';


export default {
  title: 'Text Link',
  component: TextLink
}

export function TextLinkContainer(message) {

  return (
    <div>
      <h3>Text link example</h3>
      <p>
        <TextLink content="Example 1"/>
      </p>
      <p>
        <TextLink content="Example 2"/>
      </p>
      {/* <IntlProvider locale={DEFAULT_LOCALE}>
        <TextLink className="linkbtn" content={<FormattedMessage {...globalMessages[message]} />}/>
      </IntlProvider> */}
    </div>
  )
}