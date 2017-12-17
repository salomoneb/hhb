window.onload = setStyles

var addButton = document.querySelector(".add")
var submitButton = document.querySelector("button[type='submit']")
var members = [] || members

// Default button behavior
var buttons = document.querySelectorAll("button")
buttons.forEach(function(button) {
	button.setAttribute("type", "button")
	// button.style.cssText = "border-radius: 5px; color: #fff; cursor: pointer;	 display: inline-block; padding: 0.5em 2em; text-transform: uppercase;"
	button.addEventListener("click", function() {
		clearErrors()
	})
})

addButton.onclick = validateMember
submitButton.onclick = submitMembers

/********** MEMBER OBJECT *********/

// Function representing a household member
function Member(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
	members.push(this)
}

// Method to set a pseudo-unique four digit household member ID  
Member.prototype.setId = function() {
	this.id = (function() {
		var uniqueId = Math.floor((Math.random() * 9000) + 1000)
		members.forEach(function(member) {
			if (member.id === uniqueId) {
				createId()
			} 
		})
		return uniqueId	
	})()
}

/********** CREATION AND SUBMISSION *********/

function validateMember() {
	var fieldValues = [] || fieldValues
	if (validateFields(fieldValues)) { createMember(fieldValues, displayMember) }
}

function submitMembers() {
	members.length ? jsonifyMembers(members) : createSubmissionError()

	function jsonifyMembers(members) {
		var debugElement = document.querySelector(".debug")
		debugElement.innerHTML = ""			
		debugElement.style.cssText = "display:block;"
		var jsonMembers = JSON.stringify({members}, null, 2)
		jsonMembers = document.createTextNode(jsonMembers)
		debugElement.appendChild(jsonMembers)
	}

	function createSubmissionError() {
		var builderElement = document.querySelector(".builder")
		var submissionError = createElement("p", "Please add at least one household member.", "error")
		builderElement.appendChild(submissionError)
	}	
}

function createMember(fieldValues, displayMember) {
	var member = new Member(fieldValues)
	member.setId()	
	document.querySelector("form").reset()
	displayMember(member)
	console.log(members)
}

function displayMember(member) {	
	var memberItem = createElement("li", createMemberItem(member), "household-member", "margin: 0.5em 0;")
	var removeButton = createElement("button", "Remove", "remove-button")

	memberItem.setAttribute("data-value", member.id)
	memberItem.appendChild(removeButton)

	var memberList = document.querySelector(".household")
	memberList.appendChild(memberItem)

	removeButton.addEventListener("click", function() {
		removeMember(member)
	})
}

function removeMember(member) {
	var displayedMembers = document.querySelectorAll(".household-member")

	for (var i = 0; i < members.length && i < displayedMembers.length; i++) {		
		var displayId = displayedMembers[i].getAttribute("data-value")
		var arrayId = members[i].id

		if (displayId == member.id && arrayId === member.id) {
			displayedMembers[i].remove()
			members.splice([i], 1)
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
function createMemberItem(member) {
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

/********** STYLING *********/

function setStyles() {
	document.querySelector("body").style.cssText = "margin: 2em 4em; font-family: Arial, Helvetica, sans-serif;"
	document.querySelector("ol").style.cssText = "list-style: inside; list-style-type: decimal; margin-bottom: 2em; padding-left: 0;"
}