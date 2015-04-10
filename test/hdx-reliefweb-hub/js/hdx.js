// querying bothr reliefweb and hdx
// at the same time
fetchRwQuery = function(q) {
  hdx = 'https://data.hdx.rwlabs.org/api/action/package_search?q=' + q;

  // HDX
  d3.json(hdx, function(error, json) {
    if (error) return ('Error, my friend:' + error);

    // parsing json
    var results = jsonPath.eval(json, '$.result');
    // console.log(results[0].results[0]);

    // title container
    var titleContainerBegin = '<div class="result-text col-md-10">'
    	titleContainerEnd = '</div>';

   // lights container
    var lightsContainerBegin = '<div class="col-md-4 result-lights">'
    	lightsContainerEnd = '</div>'
    	orangeCircle = '<div class="result-hdx-circle-orange"></div>'
    	yellowCircle = '<div class="result-hdx-circle-yellow"></div>'
    	blueCircle = '<div class="result-hdx-circle-blue"></div>';


    // figure variables
    var hdx_total = results[0].count;
    var doc = document.getElementById('result-hdx-count');
	doc.innerHTML = hdx_total;

    // iterating over the id list and creating
    // a box in the html canvas
    n_results = 4;
    for (i = 0; i < n_results; i++) {

    	// dataset link
    	var link = 'https://data.hdx.rwlabs.org/dataset/' + results[0].results[i].id;

	    // dataset title
	    var datasetTitle = results[0].results[i].title.substring(0,60);
	    var datasetTitleContainer = '<h4>' + '<a href="' + link + '">' + datasetTitle + '</a>' + ' (...)</h4>';

	    // dataset source
	    var datasetSource = results[0].results[i].dataset_source;
	    var datasetSourceContainer = '<h5>' + datasetSource + '</h5>';

	    // dataset description
	    var datasetDescription = results[0].results[i].notes.substring(0,130);
	    var datasetDescriptionContainer = '<p>' + datasetDescription + ' (...)</p>';

	    // n resources
	    var nResources = results[0].results[i].num_resources;
	    var nResourcesContainer = '<span>' + nResources + '</span>';

	    // tracking summary
	    var recent = results[0].results[i].tracking_summary.recent;
	    var total = results[0].results[i].tracking_summary.total;
	    var recentContainer = '<span>' + recent + '</span>';
	    var totalContainer = '<span>' + total + '</span>';


		// generating the cards
	    var doc = document.getElementById('hdx-results');
	    doc.innerHTML += titleContainerBegin +
	    				 datasetTitleContainer +
	    				 datasetSourceContainer +
	    				 datasetDescriptionContainer +
	    				 titleContainerEnd;
	  };

	  // adding all results link
	  var doc = document.getElementById('hdx-all-results-link');
	  link = 'https://data.hdx.rwlabs.org/dataset?q=' + q;
	  doc.innerHTML = '<a type="button" href="' + link + '" class="btn btn-primary">See all results on HDX</a>';
	});
};