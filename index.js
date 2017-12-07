// Define global DOM vars
var householdForm = document.querySelector("form")
var formFields = document.querySelectorAll("[name]")
var addButton = document.querySelector(".add")
var householdContainer = document.querySelector(".builder")
var householdList = document.querySelector(".household")

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
	processFormFields(formFields)
}

// Helper function to remove elements from DOM
function removeFromDOM(element) {
	element.remove()
}

// Clears error messaging and styling when a user clicks "add"
function clearErrors(errors, formFields) {
	for (var i = 0; i < errors.length; i++) {
		removeFromDOM(errors[i])
		formFields[i].removeAttribute("style")
	}	
}

function processFormFields(formFields) {
	// var ageField = document.querySelector("input[name='age']")
	// var relationshipField = document.querySelector("select[name='rel']")
	// var smokerField = document.querySelector("input[name='smoker']:checked")
	
	// smokerValue = !smokerField ? "no" : "yes"
	var formFieldArray = Array.prototype.slice.call(formFields)

	var values = formFieldArray.map(function(field) {
		if (!field.value || field.value < 1) {
			createErrorMessage(field)		
		}
		else {
			return field.value
		}
	})
	var test = new (Function.prototype.bind.apply(HouseHoldMember, values))

	householdForm.reset()
	console.log(test)
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
