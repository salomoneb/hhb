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
	var errors = document.querySelectorAll(".error")
	if (errors) {
		clearErrors(errors)
	}
	processFormFields(formFields)
}

function testFormFieldErrors(formFields) {
	var bool = true
	for (var i = 0; i < formFields.length; i++) { 
		// Switch statement allows us to be more specific about conditions and ignore smoker field
		switch(formFields[i].getAttribute("name")) {
			case "age": 
				if (!Number(formFields[i].value) || Number(formFields[i].value) < 1) {					
					createErrorMessage(formFields[i])
					bool = false
				}				
				break;
			case "rel": 
				if (!formFields[i].value) {
					createErrorMessage(formFields[i])
					bool = false
				}
				break;
		}	
	}
	return bool
}

function processFormFields(formFields) {
	if(testFormFieldErrors(formFields)) {
		// Convert form field nodelist to array so we can use array methods
		var formFieldArray = Array.prototype.slice.call(formFields)
		var formFieldValues = formFieldArray.map(function(field) {
			console.log(field)
			if (field.getAttribute("name") === "smoker") {
				if (field.checked) {
					return "yes"
				} else {
					return "no"
				}
			} else {
				return field.value
			}
		})
		formFieldValues.unshift(null)
		var householdMember = new (Function.prototype.bind.apply(HouseHoldMember, formFieldValues))
		console.log(householdMember)
		return householdMember
	} else {
		console.log("Something went wrong")
		return
	}
}
// Clears error messaging and styling when a user clicks "add"
function clearErrors(errors) {
	for (var i = 0; i < errors.length; i++) {
		errors[i].tagName === "P" ? errors[i].remove() : errors[i].removeAttribute("style")
	}
}

function createErrorMessage(formField) {

	// Create error message element
	var errorElement = document.createElement("p")
	errorElement.className = "error"

	// Apply styling
	formField.style.outline = "1px solid red"
	formField.className = "error"
	Object.assign(errorElement.style, {color: "red", display: "inline", marginLeft: "5px"})

	// Takes the label name, cleans it, and puts it in the error message text
	var cleanedFieldLabel = formField.previousSibling.textContent.toLowerCase().trim()			
	var errorMessage = document.createTextNode("Please enter a valid " + cleanedFieldLabel)
	errorElement.appendChild(errorMessage)
	formField.parentElement.appendChild(errorElement)
}