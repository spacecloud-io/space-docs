const client = algoliasearch('C0YVLCLXSA', '026df67e9b3f3ce90a7f8d1c62d818a9');
const docs = client.initIndex('docs_search');

autocomplete(
  '#aa-search-input',
  {
    debug: true,
    templates: {
      dropdownMenu:
        '<div class="aa-dataset-1"></div>'
    },
  },
  [
    {
      source: autocomplete.sources.hits(docs, {hitsPerPage: 5}),
      displayKey: 'title',
      title: 'title',
      templates: {
        suggestion({_highlightResult, permalink}) {
          return `<a class="search-link" href="${permalink}"> <span class="search-section">${_highlightResult.section.value} | ${_highlightResult.title.value} | ${_highlightResult.description.value}</span>
          <span class="search-summary">${_highlightResult.summary.value}</span></a>`;
        },
        empty: '<div class="aa-empty">No matching </div>',
      },
    },
  ]
);
