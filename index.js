var addButton = document.querySelector(".add")
var submitButton = document.querySelector("button[type='submit']")
var householdMembers = [] || householdMembers

// Default button behavior
var buttons = document.querySelectorAll("button")
buttons.forEach(function(button) {
	button.setAttribute("type", "button")
	button.addEventListener("click", function() {
		clearErrors()
	})
})

// Button events
addButton.onclick = createHouseholdMember
submitButton.onclick = submitHouseholdList

/********** MEMBER OBJECT *********/

// Function representing a household member
function HouseholdMember(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
}

// Method to set a pseudo-unique four digit household member ID  
HouseholdMember.prototype.setId = function() {
	this.id = (function() {
		var uniqueId = Math.floor((Math.random() * 9000) + 1000)
		householdMembers.forEach(function(member) {
			if (member.id === uniqueId) {
				createId()
			} 
		})
		return uniqueId	
	})()
}

/********** CREATION AND SUBMISSION *********/

function createHouseholdMember() {
	var fieldValues = [] || fieldValues

	// If form values pass our tests
	if (validateFields(fieldValues)) {		
		initializeMember(fieldValues)
		document.querySelector("form").reset()
	}
}

function submitHouseholdList() {
	householdMembers.length ? jsonifyMembers(householdMembers) : createSubmissionError()

	function jsonifyMembers(householdMembers) {
		var debugElement = document.querySelector(".debug")
		debugElement.innerHTML = ""	
		debugElement.style.cssText = "display:block;"

		var jsonMembers = JSON.stringify({householdMembers}, null, 2)
		jsonMembers = document.createTextNode(jsonMembers)
		debugElement.appendChild(jsonMembers)
	}

	function createSubmissionError() {
		var builderElement = document.querySelector(".builder")
		var submissionError = createElement("p", "Please add at least one household member.", "error")
		builderElement.appendChild(submissionError)
	}	
}

function initializeMember(fieldValues) {
	var member = new HouseholdMember(fieldValues)
	member.setId()
	householdMembers.push(member)
	addMemberToList(member)
}

function addMemberToList(member) {
	var memberList = document.querySelector(".household")
	var memberEntry = createElement("li", createHouseholdMemberListEntry(member), "household-member")
	var removeButton = createElement("button", "Remove", "remove")

	memberEntry.setAttribute("data-value", member.id)
	memberEntry.appendChild(removeButton)
	memberList.appendChild(memberEntry)

	removeButton.addEventListener("click", function() {
		removeMember(member)
	})
}

// Removes the member from the DOM list and the submission array
function removeMember(member) {
	var domListEntry = document.querySelectorAll(".household-member")

	for (var i = 0; i < householdMembers.length && i < domListEntry.length; i++) {		
		var listId = domListEntry[i].getAttribute("data-value")
		var arrayId = householdMembers[i].id

		if (listId == member.id && arrayId === member.id) {
			domListEntry[i].remove()
			householdMembers.splice([i], 1)
		}

	}
}

/********** VALIDATION *********/

function validateFields(valuesArray) {
	var fields = document.querySelectorAll("[name]")
	var bool = true
	for (i = 0; i < fields.length; i++) {
		var field = fields[i]
		var value = field.value
		var name = field.getAttribute("name") 
		switch(name) {			
			case "age": 
				var value = Number(value)
				if (!value || isNaN(value) === true || value < 1) { 
					createFormError(field)
					bool = false				
				} else {
					valuesArray.push(value)
				}
				break;
			case "rel":
				if (!value) { 					
					createFormError(field)
					bool = false					
				}	else {
					valuesArray.push(value)
				}	
				break;
			case "smoker":
				fields[i].checked ? value = "yes" : value = "no"
				valuesArray.push(value)
				break;
		}
	}
	return bool
}

function createFormError(formField) {
	var formErrorStyles = "color:red; display:inline; margin-left:5px"

	// Takes the field label name, cleans it, and puts it in the error message text
	var cleanedFieldLabel = formField.previousSibling.textContent.toLowerCase().trim()
	var formError = createElement("p", "Please enter a valid " + cleanedFieldLabel, "error", formErrorStyles)

	formField.style.outline = "1px solid red"
	formField.className = "error"
	formField.parentElement.appendChild(formError)
}

/********** HELPERS *********/

// Create an element, style it, and assign a class
function createElement(tag, text, className, styles) {
	var element = document.createElement(tag)
	if (className) {
		element.className = className		
	}
	if (styles) {
		element.style.cssText = styles
	}
	var elementText = document.createTextNode(text)
	element.appendChild(elementText)
	return element
}
// Clear error messages
function clearErrors() {
	var errors = document.querySelectorAll(".error")
	for (var i = 0; i < errors.length; i++) {
		errors[i].tagName === "P" ? errors[i].remove() : errors[i].removeAttribute("style")
	}
}
// Generate a text string based on each member's data
function createHouseholdMemberListEntry(member) {
	var string = ""
	for (prop in member) {
		if (member.hasOwnProperty(prop) && prop !== "id") {
			string += capitalizeFirstLetter(prop) + ": " + capitalizeFirstLetter(member[prop]) + " "
		}
	}
	return string
}
// Capitalize the first letter of strings 
function capitalizeFirstLetter(string) {
	return typeof string === "string" ? string.charAt(0).toUpperCase() + string.slice(1) : string
}