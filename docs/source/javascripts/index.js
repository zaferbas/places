/* eslint no-console: 0 */
/* global places */

import responsiveNavigation from './responsiveNavigation.js';

responsiveNavigation();

const placesAutocomplete = places({
  container: document.querySelector('#landing-demo')
});

if (process.env.NODE_ENV === 'development') {
  const events = ['change', 'suggestions', 'cursorchanged'];
  events.forEach(eventName =>
    placesAutocomplete.on(eventName, eventData => {
      if (!Array.isArray(eventData)) {
        eventData = [eventData];
      }

      console.log(`Algolia Places: received event **${eventName}**`);
      if (typeof console.table === 'function') {
        console.table(eventData);
      } else {
        console.log('event data:', eventData);
      }
    })
  );
}
