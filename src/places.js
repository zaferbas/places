import algoliasearch from 'algoliasearch';
import autocomplete from 'autocomplete.js';

import createHitFormatter from './createHitFormatter.js';
import formatInputValue from './formatInputValue.js';
import formatAutocompleteSuggestion from './formatAutocompleteSuggestion.js';

const hitFormatter = createHitFormatter({formatAutocompleteSuggestion, formatInputValue});

export default function places({
  countries,
  language = navigator.language,
  container
}) {
  const placesAPIClient = algoliasearch.initPlaces('places', '5c759b588c767287a3dca1e8e18232f8');
  const autocompleteInstance = autocomplete(container, {debug: true, autoselect: true}, {
    source: (query, cb) => placesAPIClient
      .search({query})
      .then(({hits}) => hits.slice(0, 5).map(hitFormatter))
      .then(hits => {console.log(hits); return hits})
      .then(cb)
      .catch(err => console.error(err)),
    templates: {
      suggestion: hit => hit.suggestion
    }
  });
}
