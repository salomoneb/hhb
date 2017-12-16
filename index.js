var addButton = document.querySelector(".add")
var submitButton = document.querySelector("button[type='submit']")
var memberList = document.querySelector(".household")
var householdMembers = [] || householdMembers

// Sets button type so all buttons don't reset or submit form
var buttons = document.querySelectorAll("button")
buttons.forEach(function(button) {
	button.setAttribute("type", "button")
})
// Function to create a household member
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

// When we submit our JSON household list
function submitHouseholdList() {
	clearErrors()
	householdMembers.length ? jsonifyList(householdMembers) : createSubmissionError()

	function jsonifyList(memberList) {
		var debugElement = document.querySelector(".debug")
		debugElement.innerHTML = ""	
		debugElement.style.cssText = "display:block;"
		var jsonMembers = JSON.stringify({memberList}, null, 2)
		jsonMembers = document.createTextNode(jsonMembers)
		debugElement.appendChild(jsonMembers)
	}

	function createSubmissionError() {
		var builderElement = document.querySelector(".builder")
		var submissionError = createElement("p", "Please add at least one household member.", "error")
		builderElement.appendChild(submissionError)
	}	
}

function createHouseholdMember() {
	clearErrors()
	var fieldValues = [] || fieldValues
	// If form values pass our tests
	if (testFields(fieldValues)) {		
		initializeMember(fieldValues)
		document.querySelector("form").reset()
	}
}

// When the member is created
function initializeMember(fieldValues) {
	var member = new HouseholdMember(fieldValues)
	member.setId()
	householdMembers.push(member)
	addMemberToList(member)
}

// Adds member to the DOM
function addMemberToList(member) {
	var memberEntry = createElement("li", createHouseholdMemberListEntry(member), "household-member")
	memberEntry.setAttribute("data-value", member.id)
	var removeButton = createElement("button", "Remove", "remove")
	memberEntry.appendChild(removeButton)
	memberList.appendChild(memberEntry)

	removeButton.addEventListener("click", function() {
		removeMember(member)
		console.log(householdMembers)
	})
}

function createElement(tag, text, className) {
	var element = document.createElement(tag)
	if (className) {
		element.className = className		
	}
	var elementText = document.createTextNode(text)
	element.appendChild(elementText)
	return element
}

// Removes a member from the DOM and the submission list
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

// Validate form entries
function testFields(valuesArray) {
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
					formErrorMessage(field)
					bool = false				
				} else {
					valuesArray.push(value)
				}
				break;
			case "rel":
				if (!value) { 					
					formErrorMessage(field)
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

// Create error message
function formErrorMessage(formField) {
	var errorElement = document.createElement("p")
	errorElement.className = "error"
	formField.style.outline = "1px solid red"
	formField.className = "error"
	errorElement.style.cssText = "color:red; display:inline; margin-left:5px"

	// Takes the label name, cleans it, and puts it in the error message text
	var cleanedFieldLabel = formField.previousSibling.textContent.toLowerCase().trim()			
	var errorMessage = document.createTextNode("Please enter a valid " + cleanedFieldLabel)
	errorElement.appendChild(errorMessage)
	formField.parentElement.appendChild(errorElement)
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

// Button events
addButton.onclick = createHouseholdMember
submitButton.onclick = submitHouseholdList