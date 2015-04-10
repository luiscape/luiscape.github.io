// querying bothr reliefweb and hdx
// at the same time
fetchHdxQuery = function(q) {
  // todo: add link to the count result
  rw = 'http://api.rwlabs.org/v1/reports?limit=10&profile=full&query[value]=' + q;

  // HDX
  d3.json(rw, function(error, json) {
    if (error) return ('Error, my friend:' + error);

    // parsing json
    // var results = jsonPath.eval(json, '$.result');
    console.log(json.data);

    // title container
    var titleContainerBegin = '<div class="result-text col-md-10">'
    	titleContainerEnd = '</div>';

   // lights container
    var lightsContainerBegin = '<div class="col-md-4 result-lights"><div class="col-md-4">'
    	lightsContainerEnd = '</div>'
    	orangeCircle = '<div class="result-hdx-circle-orange"></div>'
    	yellowCircle = '<div class="result-hdx-circle-yellow"></div>'
    	blueCircle = '<div class="result-hdx-circle-blue"></div>';


    // figure variables
    var rw_total = json["totalCount"];
    var doc = document.getElementById('result-rw-count');
	doc.innerHTML = rw_total;

    // iterating over the id list and creating
    // a box in the html canvas
    n_results = 7;
    for (i = 0; i < n_results; i++) {
        try {
            // link to report
            var link = 'http://reliefweb.int/node/' + json.data[i].id;

            // report name
            var reportName = json.data[i].fields.title.substring(0,60);
            var reportNameContainer = '<h4>' + '<a href="' + link + '">' + reportName + '</a>' + ' (...)</h4>';

            // dataset source
            var reportSource = json.data[i].fields.source[0].name;
            var reportSourceContainer = '<h5>' + reportSource + '</h5>';

            // report body
            var reportBody = json.data[i].fields.body.toString();
            var reportBodyContainer = '<p>' + reportBody.substring(0,130) + ' (...)</p>';

            // generating the cards
            var doc = document.getElementById('rw-results');
            doc.innerHTML += titleContainerBegin +
                             reportNameContainer +
                             reportSourceContainer +
                             reportBodyContainer +
                             titleContainerEnd;
        }
        catch(err) {
            console.log('error: ' + i);
            i = i + 1;
        }
	  };
      // adding all results link
      var doc = document.getElementById('rw-all-results-link');
      link = 'http://reliefweb.int/search/results?search=' + q;
      doc.innerHTML = '<a type="button" href="' + link + '" class="btn btn-primary">See all results on ReliefWeb</a>';
	});
};