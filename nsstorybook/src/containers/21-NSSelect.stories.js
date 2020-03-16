import React from 'react'
import NSSelect from '../components/NSSelect/index'
import { IntlProvider } from 'react-intl';
import { DEFAULT_LOCALE } from '../i18n';

export default {
  title: 'New Story Select',
  component: NSSelect
}

export function NSSelectContainer() {

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'sp', name: 'Spanish', nativeName: 'Espanol' },
    { code: 'fr', name: 'French', nativeName: 'Francais' },
  ];

  return (
    <div>
      <h3>NS Select</h3>
        <p>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <NSSelect
              values={{ item: 'us_en' }}
              items={languages}
              update={() => {}}
              label="Message"
              code="name"
              value="nativeName"
            />
          </IntlProvider>
      </p>
      <p>
        <NSSelect 
          values={{ item: 'us_en' }}
          items={languages}
          update={() => {}}
          label="languages"
          code="name"
          value="nativeName"
        />
      </p>
      
    </div>
  )
}