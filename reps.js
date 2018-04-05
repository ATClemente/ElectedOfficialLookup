

document.getElementById("addressSubmit").addEventListener("click", function(event){
	
	
	var repRequest = new XMLHttpRequest();
	var streetAddress = document.getElementById("street_input").value;
	var city = document.getElementById("city_input").value;
	var state = document.getElementById("state_input").value;
	var zipCode = document.getElementById("zip_input").value;
	
	if(streetAddress == "" || city == "" || state == "" || zipCode == ""){
		alert("Please fill in all the required fields.");
		event.preventDefault();
		return;
	}
	
	var apiKey = "AIzaSyAJ3_AtvW_Q_B6IwbY6jEydRVqvfvuj_60";
	
	repRequest.open("GET", "https://www.googleapis.com/civicinfo/v2/representatives?key=" + apiKey + "&address=" + streetAddress + "%20" + city + "%20" + state + "%20" + zipCode + "&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody");
	repRequest.addEventListener("load", function(){
		if(repRequest.status >= 200 && repRequest.status < 400){
			var response = JSON.parse(repRequest.responseText);
		
			
			document.getElementById("firstSenatorName").textContent = "Senator " + response.officials[0].name;
			document.getElementById("firstSenatorNumber").textContent = response.officials[0].phones[0];
			
			if(response.officials[0].party == "Democratic"){
				document.getElementById("firstSenator").style.border = "3px solid blue";
			}
			else if(response.officials[0].party == "Republican"){
				document.getElementById("firstSenator").style.border = "3px solid red";
			}
			
			document.getElementById("secondSenatorName").textContent = "Senator " + response.officials[1].name;
			document.getElementById("secondSenatorNumber").textContent = response.officials[1].phones[0];
			
			if(response.officials[1].party == "Democratic"){
				document.getElementById("secondSenator").style.border = "3px solid blue";
			}
			else if(response.officials[1].party == "Republican"){
				document.getElementById("secondSenator").style.border = "3px solid red";
			}
			
			document.getElementById("repName").textContent = response.officials[2].name;
			document.getElementById("repNumber").textContent = response.officials[2].phones[0];
			
			if(response.officials[2].party == "Democratic"){
				document.getElementById("rep").style.border = "3px solid blue";
			}
			else if(response.officials[2].party == "Republican"){
				document.getElementById("rep").style.border = "3px solid red";
			}
			
			document.getElementById("repInformationDisplay").style.visibility = "visible";
			
			console.log(response);
		}
		else{
			alert("There was a problem with the information you entered or some other issue occurred! Please try again.");
			console.log("Error in network request: " + repRequest.statusText);
		}
	});
	repRequest.send(null);

	console.log("Sending Request");
	
	event.preventDefault();
});