function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}


document.getElementById("setSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("setInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "https://rebrickable.com/api/v3/lego/sets/" + value + "-1/?key=33bd889d140f2f237f747055f484e4fd";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
		if(json.detail === "Not found.")
			return;
		
		document.getElementById("setInfo").innerHTML = "<div class='text-section bg-dark text-light'>" +
		  "<h2>Set</h2>" +
		"</div>" +
		"<div class='img-section bg-dark text-light'>" +
		  "<div class='row' id='setResults'>" +
		  "</div>" +
		"</div>" +
		
		"<div class='text-section bg-light text-dark'>" +
		  "<h2>Parts</h2>" +
		"</div>" +
		"<div class='container image-section bg-light text-dark'>" +
		  "<div id='partResults' class='row'>" +
		  "</div>" +
		"</div>";
	  const url2 = "https://rebrickable.com/api/v3/lego/themes/" + json.theme_id + "/?key=33bd889d140f2f237f747055f484e4fd";
	  fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json2) {
		  let results = "";
		  results += "<div class='col-md col-lg'></div><div class='col-md col-lg'>" +
			  "<div class='bg-dark'>" +
				"<img src="+json.set_img_url+" class='img-fluid'>" +
				"<p class='img-text'>" + json.name + " - " + value + "</p>" +
			  "</div>" +
			"</div>" +
			"<div class='col-lg'>";
		  results += "<p>Set " + value + ": " + json.name + "</p>";
		  results += "<p>Number of parts: " + json.num_parts + " </p>";
		  results += "<p>Theme: " + json2.name + " </p>";
		  results += "<p>Link: <a href=" + json.set_url + ">Link</a> </p>";
		  results += "<p>YEAR: " + json.year + " </p>";
		  results += "</div></div><div class='col-md col-lg'></div>";
		  document.getElementById("setResults").innerHTML = results;
		  
		  const url3 = "https://rebrickable.com/api/v3/lego/sets/" + value + "-1/parts/?key=33bd889d140f2f237f747055f484e4fd";
		  fetch(url3)
		  .then(function(response) {
			return response.json();
		  }).then(function(json3) {
			let result2 = "";
			for (let i=0; i < json3.results.length; i++) {
			  result2 += "<div class='col-sm-2'>" +
				"<div class='bg-light text-center'>" + 
				"<img src=" + json3.results[i].part.part_img_url + " class='img-fluid'>" +
				"<p class='img-text'>" + json3.results[i].part.part_num + " x" + json3.results[i].quantity + "</p>" + 
				"</div></div>";
		    }
		  document.getElementById("partResults").innerHTML = result2;
		    		});
		      });
      });
});
