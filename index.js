var householdForm = document.querySelector("form")
var addButton = document.querySelector(".add")
var memberList = document.querySelector(".household")
var members = [] || members

function HouseholdMember(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
}
HouseholdMember.prototype.setID = function(members) {
	members.length ? this.id = getLargestId() : this.id = 1
	function getLargestId() {
		var highestCurrentId = members.map(function(member) {
	    return member.id
  	})	
  	.reduce(function(acc, curr) {
			return Math.max(acc, curr)
		})
		return highestCurrentId + 1
	}
} 

addButton.onclick = createMember

function createMember(event) {
	event.preventDefault()
	var errors = document.querySelectorAll(".error")
	clearErrors(errors)

	var fields = document.querySelectorAll("[name]")
	var fieldValues = [] || fieldValues

	if (testFields(fields, fieldValues)) {		
		var member = new HouseholdMember(fieldValues) 
		member.setID(members)
		members.push(member)
		console.log(members)

		addMemberToList(member)
	}
}

function addMemberToList(member) {
	var memberEntry = document.createElement("li")
	memberEntry.className = "household-member"
	memberEntry.setAttribute("data-value", member.id)
	console.log(createMemberListEntry(member))
	var memberText = document.createTextNode(createMemberListEntry(member))

	memberEntry.appendChild(memberText)
	memberList.appendChild(memberEntry)
}

function testFields(fields, valueArray) {
	var bool = true
	for (i = 0; i < fields.length; i++) {
		var field = fields[i]
		var value = field.value
		var name = field.getAttribute("name") 
		switch(name) {			
			case "age": 
				var value = Number(value)
				if (!value || isNaN(value) === true || value < 1) { 
					createErrorMessage(field)
					bool = false				
				} else {
					valueArray.push(value)
				}
				break;
			case "rel":
				if (!value) { 					
					createErrorMessage(field)
					bool = false					
				}	else {
					valueArray.push(value)
				}	
				break;
			case "smoker":
				fields[i].checked ? value = "yes" : value = "no"
				valueArray.push(value)
				break;
		}
	}
	return bool
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

function clearErrors(errors) {
	for (var i = 0; i < errors.length; i++) {
		errors[i].tagName === "P" ? errors[i].remove() : errors[i].removeAttribute("style")
	}
}

function createMemberListEntry(member) {
	var string = ""
	for (prop in member) {
		if (member.hasOwnProperty(prop)) {
			string += capitalizeFirstLetter(prop) + ": " + member[prop] + " "			
		}
	}
	return string
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
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
*/

// Clears error messaging and styling when a user clicks "add"



