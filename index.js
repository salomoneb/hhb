window.onload = function() {
	// Define global DOM vars
	var householdForm = document.querySelector("form")
	var addButton = document.querySelector(".add")
	var householdContainer = document.querySelector(".builder")
	var householdList = document.querySelector(".household")

	addButton.onclick = addIndividual

	// Button event to add a household member
	function addIndividual(event) {
		event.preventDefault()
		var errors = document.querySelectorAll(".error-message")
		if (errors.length) {
			clearErrors(errors)
		}
		processFormFields()
	}

	// Clears error messaging and styling when a user clicks "add"
	function clearErrors(errors) {
		// TODO: come up with a DRYer way of doing this
		document.querySelector("input").removeAttribute("style")
		document.querySelector("select").removeAttribute("style")

		errors.forEach(function(error, index) {
			var errorMessage = document.querySelector(".error-message")
			errorMessage.parentNode.removeChild(errorMessage)
		})		
	}

	// 
	function processFormFields() {
		var ageField = document.querySelector("input[name='age']")
		var relationshipField = document.querySelector("select[name='rel']")
		var smokerValue = document.querySelector("input[name='smoker']:checked")
		
		var fields = [
			ageField, 
			relationshipField
		] 
		
		fields.forEach(function(field) {
			console.log(field)
			if (!field.value || field.value < 1) {
				errorMessage(field)
			}			
		})
	
		

		// for (var i = 0; i < fields.length; i++) {
		// 	var field = new FormField(fields[i])
		// 	if (!field.value) {
		// 		errorMessage(field.field)
		// 	}
		// }

		
		// if (ageValue && relationshipValue && ageValue > 0) {
		// 	console.log("all set")
		// 	return
		// 	// return callback(ageValue, relationshipValue, smokerValue) 
		// }	
		// if (!ageValue) {
		// 	var age = new inputField(ageField)
		// 	age.handleError()
		// }
		// if (!relationshipValue) {
		// 	errorMessage(relationshipField)
		// }
	}

	function displayMemberDetails(age, relationship, smoker) {
		householdForm.reset()
		var member = {
			"age": age,
			"relationship": relationship, 
			"smoker": smoker
		}
		//FIX
		var memberEntry = document.createElement("li")
		memberEntry.className = "member"
		var memberInfo		
		for (var key in member) {
			memberInfo += document.createTextNode(key + " : " + member[key] + ",")
		}
		memberEntry.appendChild(memberInfo)

		// COME UP WITH FASTER WAY OF APPENDING MEMBER INFO TO LIST

		memberEntry.appendChild(memberDetails)
		householdList.appendChild(memberEntry)
		console.log(member)		
	}

	// Creates an error message and applies error styling
	function errorMessage(field) {
		field.style.outline = "1px solid red"

		var errorElement = document.createElement("p")
		errorElement.className = "error-message"

		var cleanedFieldLabel = field.previousSibling.textContent.toLowerCase().trim()			
		var errorMessage = document.createTextNode("Please enter a valid " + cleanedFieldLabel)

		errorElement.appendChild(errorMessage)
		householdForm.appendChild(errorElement)
	}
}