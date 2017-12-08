// Define global DOM vars
var householdForm = document.querySelector("form")
var addButton = document.querySelector(".add")
var formFields = document.querySelectorAll("[name]")
addButton.onclick = addIndividual

function HouseHoldMember(age, relationship, smoker) {
	this.age = age
	this.relationship = relationship
	this.smoker = smoker
}

// Button event to add a household member
function addIndividual(event) {
	event.preventDefault()
	
	// Check for existing errors
	var errors = document.querySelectorAll(".error-message")
	if (errors) {
		clearErrors(errors, formFields)
	}
	processFormFields()
}

// Helper function to remove elements from DOM
function removeFromDOM(element) {
	element.remove()
}

// 
function processFormFields() {
	var ageField = document.querySelector("input[name='age']")
	var relationshipField = document.querySelector("select[name='rel']")
	var smokerField = document.querySelector("input[name='smoker']:checked")
	
	smokerValue = !smokerField ? "no" : "yes"

	for (var i = 0; i < formFields.length; i++) {
		console.log(formFields[i])
	}

	// var fields = [ageField, relationshipField]

	// if (ageField.value && ageField.value > 0 && relationshipField.value) {
	// 	var newMember = new HouseHoldMember(ageField.value, relationshipField.value, smokerValue)
	// 	householdForm.reset()
	// 	console.log(newMember)
	// 	return newMember 			
	// }
	// else {
	// 	fields.forEach(function(field) {
	// 		if (!field.value || field.value < 1) {
	// 			createErrorMessage(field)
	// 		}
	// 	})
	// 	return
	// }
}
// Clears error messaging and styling when a user clicks "add"
function clearErrors(errors, formFields) {
	for (var i = 0; i < errors.length; i++) {
		removeFromDOM(errors[i])
		formFields[i].removeAttribute("style")
	}	
}

// Creates an error message and applies error styling
function createErrorMessage(formField) {

	// Create error message element
	var errorElement = document.createElement("p")
	errorElement.className = "error-message"

	// Apply styling
	formField.style.outline = "1px solid red"
	Object.assign(errorElement.style, {color: "red", display: "inline", marginLeft: "5px"})

	// Takes the label name, cleans it, and puts it in the error message text
	var cleanedFieldLabel = formField.previousSibling.textContent.toLowerCase().trim()			
	var errorMessage = document.createTextNode("Please enter a valid " + cleanedFieldLabel)
	errorElement.appendChild(errorMessage)
	formField.parentElement.appendChild(errorElement)
}
