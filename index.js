// Define global DOM vars
var householdForm = document.querySelector("form")
var addButton = document.querySelector(".add")

function HouseholdMember(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
}

addButton.onclick = createMember

function createMember(event) {
	event.preventDefault()
	var fields = document.querySelectorAll("[name]")
	var fieldValues = [] || fieldValues

	if (testFields(fields, fieldValues)) {
		var member = new HouseholdMember(fieldValues) 
		console.log(member)		
	}
}

function testFields(fields, valueArray) {
	var bool = true

	for (i = 0; i < fields.length; i++) {
		var value = fields[i].value
		var name = fields[i].getAttribute("name") 

		switch(name) {			
			case "age": 
				var value = Number(value)
				if (!value || isNaN(value) === true || value < 1) { 
					console.log(name, "failure")	
					bool = false				
				} else {
					valueArray.push(value)
				}
				break;
			case "rel":
				if (!value) { 					
					console.log(name, "failure")
					bool = false					
				}	else {
					valueArray.push(value)
				}	
				break;
			case "smoker":
				fields[i].checked ? value = "yes" : value = "no"
				console.log(fields[i].checked)
				valueArray.push(value)
				console.log(name, "success")
				break;
		}
	}
	return bool
}

// Get values of each field

// Validate fields
	// Age is required and must be greater than zero
	// Relationship is required
		// If invalid, the UI should  

// Add a person
	// Clicking "add" adds the person to a list with a remove button
	// Clicking "add" also adds them to an array to be submitted. 

// Remove a person 
	// Clicking the remove button removes them from the list

// On submission
	// Display the list as JSON in the code element

// After submitting, should be able to add to/resubmit the original household





// Clicking on the remove button deletes them 

/*

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

function removeHouseholdMember(obj) {
	console.log(members)
	members.push(obj)
	var removeButton = document.createElement("button")
	removeButton.className = "remove"
	var removeButtonLabel = document.createTextNode("Remove")
	removeButton.appendChild(removeButtonLabel)

	householdForm.append(removeButton)

	removeButton.onclick = function(event) {
		event.preventDefault()
		console.log(members.find(obj))
	}
	// console.log(obj)
	console.log(members)


} 

function processFormFields(formFields) {
	if(testFormFieldErrors(formFields)) {
		// Convert form field nodelist to array so we can use array methods
		var formFieldArray = Array.prototype.slice.call(formFields)
		var formFieldValues = formFieldArray.map(function(field) {
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
		var householdMember = new (Function.prototype.bind.apply(HouseholdMember, formFieldValues))
		return removeHouseholdMember(householdMember)
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
*/