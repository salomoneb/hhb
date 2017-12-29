window.onload = setInitialStyles

var addButton = document.querySelector(".add")
var submitButton = document.querySelector("button[type='submit']")
var members = [] || members

addButton.onclick = validateMember
submitButton.onclick = submitMembers

/*------ MEMBER OBJECT ------*/
function Member(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]

	members.push(this)
}
// Method to set a pseudo-unique four digit household member ID  
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

/*------ CREATION AND SUBMISSION ------*/
// Main validation happens here, member created if true
function validateMember() {
	clearFieldErrors()
	var fieldValues = [] || fieldValues
	if (validateFields(fieldValues)) { 
		createMember(fieldValues, displayMember) 
	}
}
// When members submitted - JSONify members or throw error
function submitMembers() {
	clearFieldErrors()
	members.length ? jsonifyMembers(members) : createSubmissionError()

	function jsonifyMembers(members) {
		var debugElement = document.querySelector(".debug")
		debugElement.innerHTML = ""			
		debugElement.style.cssText = "background: #f5f5f5; color: #333; display:block;"

		var jsonMembers = JSON.stringify({members}, null, 2)
		jsonMembers = document.createTextNode(jsonMembers)
		debugElement.appendChild(jsonMembers)
	}

	function createSubmissionError() {
		var builderElement = document.querySelector(".builder")
		var submissionError = createElement("p", "Please add at least one household member.", "error", "color:#ff0000;")
		builderElement.appendChild(submissionError)
	}	
}
// When members created - instantiate, set unique ID, add to DOM
function createMember(fieldValues, displayMember) {
	var member = new Member(fieldValues)
	member.setId()	
	document.querySelector("form").reset()
	displayMember(member)
}
// How added member appears in DOM 
function displayMember(member) {	
	var memberItem = createElement("li", createMemberString(member), "household-member", "padding: 5px 0;")
	var removeButtonStyles = "background: #ff0000; border-radius: 5px; border: 1px solid #b30000; color: #fff; cursor: pointer; margin-left: 1em; padding: 0.2em 1em;"
	var removeButton = createElement("button", "Remove", "remove-button", removeButtonStyles)

	memberItem.setAttribute("data-value", member.id)
	memberItem.appendChild(removeButton)

	var memberList = document.querySelector(".household")
	memberList.appendChild(memberItem)

	removeButton.addEventListener("click", function() {
		removeMember(member)
	})
}
// Removes the member from DOM and our submission list
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
// Main validation function
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
// Error function thrown if form field is invalid 
function createFormError(formField) {
	var formErrorStyles = "color:red; display:inline; margin-left:5px"
	// Takes the field label name, cleans it, and puts it in the error message text
	var cleanedFieldLabel = formField.previousSibling.textContent.toLowerCase().trim()
	var formError = createElement("p", "Please enter a valid " + cleanedFieldLabel, "error", formErrorStyles)

	formField.style.cssText = "outline: 1px solid #ff0000;"
	formField.className = "error"
	formField.parentElement.appendChild(formError)
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
// Generate a text string based on each member's data
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

/*------ BASE STYLING ------*/
// Not in the requirements, but I added this to make the form look better
function setInitialStyles() {
	document.querySelector("body").style.cssText = "margin: 2em 4em; font-family: Arial, Helvetica, sans-serif;"
	document.querySelector("ol").style.cssText = "list-style: inside; list-style-type: decimal; margin-bottom: 1.5em; padding-left: 0;"
	var formFields = document.querySelectorAll("form > div")
	for (i = 0; i < formFields.length; i++) {
		formFields[i].style.cssText = "margin-top: 0.5em;"
	}
	var buttons = document.querySelectorAll("button")
	for (i = 0; i < buttons.length; i++) {
		buttons[i].setAttribute("type", "button")
	}
	addButton.parentElement.style.cssText = "display: inline-block; margin: 1em 0.5em 0 0;"
	submitButton.parentElement.style.cssText = "display: inline-block; margin-top: 1em;"
	addButton.setAttribute("style", "background-color: #6495ed; border: 1px solid #1f66e5; border-radius: 5px; box-shadow: 3px 3px 10px #eee; color: #fff; cursor: pointer; display: inline-block; padding: 0.5em 2em; text-transform: uppercase;")
	submitButton.style.cssText = "background-color: #54c65d; border: 1px solid #339a3b; border-radius: 5px; box-shadow: 3px 3px 10px #eee; color: #fff; cursor: pointer; display: inline-block; padding: 0.5em 2em; text-transform: uppercase;"	
}