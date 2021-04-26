const client = algoliasearch('ZHA7CLQVCE', '93f9aaa454d7c27d300086d081d7d69d');
const docs = client.initIndex('space-docs');

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
      source: autocomplete.sources.hits(docs, {hitsPerPage: 5, highlightPreTag: "<b>", highlightPostTag: "</b>"}),
      displayKey: 'title',
      title: 'title',
      templates: {
        suggestion({_highlightResult, permalink}) {
          return `<a class="search-link" href="${permalink}"> <span class="search-section">${_highlightResult.section.value}</span> > <span class="search-title">${_highlightResult.title.value}</span><br> 
          <span class="search-desc">${_highlightResult.description.value}</span>
          <span class="search-summary">${_highlightResult.summary.value}</span></a>`;
        },
        empty: '<div class="aa-empty">No matching content</div>',
      },
    },
  ]
);
