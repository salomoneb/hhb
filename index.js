var householdForm = document.querySelector("form")
var addButton = document.querySelector(".add")
var submitButton = document.querySelector("button[type='submit']")
var memberList = document.querySelector(".household")

// Where we'll store our household members
var householdMembers = [] || householdMembers

// When we click the "add" button
addButton.onclick = createMember

// When we click the "submit" button
submitButton.addEventListener("click", function(event) {
	event.preventDefault()
	if (householdMembers.length) {
		var jsonText = document.querySelector(".json")
		if (jsonText !== null) {
			jsonText.remove()
		}

		var debugElement = document.querySelector(".debug")
		debugElement.style.display = "block"
		var jsonMembers = JSON.stringify({householdMembers}, null, 2)
		jsonMembers = document.createTextNode(jsonMembers)

		var codeElement = document.createElement("code")
		codeElement.className = "json"
		codeElement.appendChild(jsonMembers)
		debugElement.appendChild(codeElement)		
	}
})

// Create our household member
function HouseholdMember(values) {
	this.age = values[0]
	this.relationship = values[1]
	this.smoker = values[2]
}

// Method to set a unique member ID
HouseholdMember.prototype.setID = function(members) {
	members.length ? this.id = getLargestId() : this.id = 1
	function getLargestId() {
		var highestCurrentId = members.reduce(function(acc, curr) {
			return Math.max(acc, curr.id)
		}, 0)
		return highestCurrentId + 1
	}
} 

// Initializes member and adds to submission list
function createMember(event) {
	event.preventDefault()
	var errors = document.querySelectorAll(".error")
	clearErrors(errors)

	var fields = document.querySelectorAll("[name]")
	var fieldValues = [] || fieldValues

	// If form values pass our tests
	if (testFields(fields, fieldValues)) {		
		var member = new HouseholdMember(fieldValues)
		initializeMember(member)
	}
}

// Sets member ID, adds to array for submission, and inserts into DOM
function initializeMember(member) {
	member.setID(householdMembers)
	householdMembers.push(member)
	addMemberToList(member)
}

// Adds member to the DOM list
function addMemberToList(member) {
	var memberEntry = document.createElement("li")
	memberEntry.className = "household-member"
	memberEntry.setAttribute("data-value", member.id)
	var memberText = document.createTextNode(createMemberListEntry(member))

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

// Create error message
function createErrorMessage(formField) {
	var errorElement = document.createElement("p")
	errorElement.className = "error"
	formField.style.outline = "1px solid red"
	formField.className = "error"
	Object.assign(errorElement.style, {color: "red", display: "inline", marginLeft: "5px"})

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
function createMemberListEntry(member) {
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