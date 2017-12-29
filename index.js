window.onload = initializePage
var members = [] || members
var pageStyles = {}

/*------ MEMBER OBJECT ------*/

function Member(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
	members.push(this)
}
Member.prototype.setId = function() {
	this.id = createId()
	function createId() {
		var uniqueId = Math.floor((Math.random() * 9000) + 1000)
		members.forEach(function(member) {
			if (member.id === uniqueId) { 
				createId() 
			}
		})
		return uniqueId
	}
}

/*------ MAIN EVENTS ------*/

function validateMember() {
	clearFieldErrors()
	var fieldValues = [] || fieldValues
	if (validateFields(fieldValues)) { 
		createMember(fieldValues, displayMember) 
	}
}
function submitMembers() {
	clearFieldErrors()
	members.length ? jsonifyMembers(members) : createSubmissionError()
}

/*------ CREATION AND SUBMISSION ------*/

// JSONify member list and add to DOM
function jsonifyMembers(members) {
	var debugElement = document.querySelector(".debug")
	debugElement.innerHTML = ""			
	debugElement.style.cssText = pageStyles.debugElement
	var jsonMembers = JSON.stringify({members}, null, 2)
	jsonMembers = document.createTextNode(jsonMembers)
	debugElement.appendChild(jsonMembers)
}
// When a member is created - instantiate, set unique ID, add to DOM
function createMember(fieldValues, displayMember) {
	var member = new Member(fieldValues)
	member.setId()	
	document.querySelector("form").reset()
	displayMember(member)
}
// How the new member and remove button are displayed
function displayMember(member) {	
	var memberItem = createElement("li", createMemberString(member), "household-member", pageStyles.memberItem)
	var removeButton = createElement("button", "Remove", "remove-button", pageStyles.removeButton)
	memberItem.setAttribute("data-value", member.id)
	memberItem.appendChild(removeButton)
	var memberList = document.querySelector(".household")
	memberList.appendChild(memberItem)
	removeButton.addEventListener("click", function() {
		removeMember(member)
	})
}
// Remove the member from DOM and our submission list
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

/*------ VALIDATION ------*/

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
/*------ ERRORS ------*/

function createFormError(formField) {
	// Takes the field label name, cleans it, and puts it in the error message text
	var cleanedFieldLabel = formField.previousSibling.textContent.toLowerCase().trim()
	var formError = createElement("p", "Please enter a valid " + cleanedFieldLabel, "error", pageStyles.formError)
	// Red outline around form field input
	formField.style.cssText = pageStyles.formFieldError
	formField.className = "error"
	formField.parentElement.appendChild(formError)
}
function createSubmissionError() {
	var builderElement = document.querySelector(".builder")
	var submissionError = createElement("p", "Please add at least one household member.", "error", pageStyles.submissionError)
	builderElement.appendChild(submissionError)
}	

/*------ HELPERS ------*/

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
function clearFieldErrors() {
	var errors = document.querySelectorAll(".error")
	for (var i = 0; i < errors.length; i++) {
		errors[i].tagName === "P" ? errors[i].remove() : errors[i].removeAttribute("style")
	}
}
// Create the text for each member in the DOM
function createMemberString(member) {
	var string = ""
	for (prop in member) {
		if (member.hasOwnProperty(prop) && prop !== "id" && prop !== "smoker") {
			string += capitalizeFirstLetter(prop) + ": " + capitalizeFirstLetter(member[prop]) + "  |  "
		} else if (prop === "smoker") {
			string += capitalizeFirstLetter(prop) + ": " + capitalizeFirstLetter(member[prop]) + " "
		}
	}
	return string
}
// Capitalize the first letter of strings 
function capitalizeFirstLetter(string) {
	return typeof string === "string" ? string.charAt(0).toUpperCase() + string.slice(1) : string
}

/*------ PAGE STARTUP ------*/

function initializePage() {
	var addButton = document.querySelector(".add")
	var submitButton = document.querySelector("button[type='submit']")
	
	// The code below isn't part of the requirements, but I added it to make the page look better
	pageStyles = {
		addButton: "background-color: #6495ed; border: 1px solid #1f66e5; border-radius: 5px; box-shadow: 3px 3px 10px #eee; color: #fff; cursor: pointer; display: inline-block; padding: 0.5em 2em; text-transform: uppercase;", 
		addParent: "display: inline-block; margin: 1em 0.5em 0 0;", 
		body: "margin: 2em 4em; font-family: Arial, Helvetica, sans-serif;",
		debugElement: "background: #f5f5f5; color: #333; display:block;",
		formError: "color:red; display:inline; margin-left:5px",
		formFields: "margin-top: 0.5em;",
		formFieldError: "outline: 1px solid #ff0000;",
		memberItem: "padding: 5px 0;", 
		ol: "list-style: inside; list-style-type: decimal; margin-bottom: 1.5em; padding-left: 0;", 
		removeButton: "background: #ff0000; border-radius: 5px; border: 1px solid #b30000; color: #fff; cursor: pointer; margin-left: 1em; padding: 0.2em 1em;",
		submissionError: "color:#ff0000;", 
		submitButton: "background-color: #54c65d; border: 1px solid #339a3b; border-radius: 5px; box-shadow: 3px 3px 10px #eee; color: #fff; cursor: pointer; display: inline-block; padding: 0.5em 2em; text-transform: uppercase;",
		submitParent: "display: inline-block; margin-top: 1em;"
	}
	document.querySelector("body").style.cssText = pageStyles.body
	document.querySelector("ol").style.cssText = pageStyles.ol
	var formFields = document.querySelectorAll("form > div")
	for (i = 0; i < formFields.length; i++) {
		formFields[i].style.cssText = pageStyles.formFields
	}
	var buttons = document.querySelectorAll("button")
	for (i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute("type", "button")
	}
	addButton.parentElement.style.cssText = pageStyles.addParent
	submitButton.parentElement.style.cssText = pageStyles.submitParent
	addButton.setAttribute("style", pageStyles.addButton)
	submitButton.setAttribute("style", pageStyles.submitButton)

	// Kick things off
	addButton.onclick = validateMember
	submitButton.onclick = submitMembers		
}