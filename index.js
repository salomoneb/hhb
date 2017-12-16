var addButton = document.querySelector(".add")
var submitButton = document.querySelector("button[type='submit']")
var memberList = document.querySelector(".household")

// Sets button type so all buttons don't reset or submit form
var buttons = document.querySelectorAll("button")
buttons.forEach(function(button) {
	button.setAttribute("type", "button")
})

// Where we'll store our household members
var householdMembers = [] || householdMembers

// Function to create a household member
function HouseholdMember(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
}

// Method to set a pseudo-unique four digit household member ID  
HouseholdMember.prototype.setId = function() {
	this.id = createId()

	function createId() {
		var uniqueId = Math.floor((Math.random() * 9000) + 1000)
		householdMembers.forEach(function(member) {
			if (member.id === uniqueId) {
				createId()
			} 
		})
		return uniqueId
	}
} 

// Form button events
addButton.addEventListener("click", createHouseholdMember) 
submitButton.addEventListener("click", submitHouseholdList) 

// When we submit our JSON household list
function submitHouseholdList() {
	var debugElement = document.querySelector(".debug")
	debugElement.innerHTML = ""
	debugElement.style.cssText = "color:red; display:block;"
	var submissionErrorText = document.createTextNode("Please add at least one household member.")
	householdMembers.length ? jsonifyHouseholdMembers(householdMembers, debugElement) : debugElement.appendChild(submissionErrorText)
}

function jsonifyHouseholdMembers(memberList, debugElement) {
	var jsonMembers = JSON.stringify({memberList}, null, 2)
	jsonMembers = document.createTextNode(jsonMembers)
	debugElement.appendChild(jsonMembers)
}

// Initializes member and adds to submission list
function createHouseholdMember() {
	var errors = document.querySelectorAll(".error")
	clearErrors(errors)
	var fields = document.querySelectorAll("[name]")
	var fieldValues = [] || fieldValues
	// If form values pass our tests
	if (testFields(fields, fieldValues)) {		
		var member = new HouseholdMember(fieldValues)
		initializeMember(member)
		document.querySelector("form").reset()
	}
}

// Sets member ID, adds to array for submission, and inserts into DOM
function initializeMember(member) {
	member.setId()
	householdMembers.push(member)
	addMemberToList(member)
}

// Adds member to the DOM list
function addMemberToList(member) {
	var memberEntry = document.createElement("li")
	memberEntry.className = "household-member"
	memberEntry.setAttribute("data-value", member.id)
	var memberText = document.createTextNode(createHouseholdMemberListEntry(member))

	// Remove button
	var removeButton = document.createElement("button")
	removeButton.className = "remove"
	var removeButtonLabel = document.createTextNode("Remove")
	removeButton.appendChild(removeButtonLabel)	

	memberEntry.appendChild(memberText)
	memberEntry.appendChild(removeButton)
	memberList.appendChild(memberEntry)

	removeButton.addEventListener("click", function() {
		removeMember(member)
	})
}

// Removes a member from the DOM and the submission list
function removeMember(member) {
	var memberListEntries = document.querySelectorAll(".household-member")
	for (var i = 0; i < householdMembers.length && i < memberListEntries.length; i++) {
		var listId = memberListEntries[i].getAttribute("data-value")
		var arrayId = householdMembers[i].id
		if (listId == member.id && arrayId === member.id) {
			memberListEntries[i].remove()
			householdMembers.splice([i], 1)
		}
	}
}

// Validate form entries
function testFields(fields, valuesArray) {
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
					valuesArray.push(value)
				}
				break;
			case "rel":
				if (!value) { 					
					createErrorMessage(field)
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
function createErrorMessage(formField) {
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
function clearErrors(errors) {
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