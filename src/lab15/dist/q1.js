"use strict";
function describePerson(person) {
    const studentStatus = person.isStudent ? "a student" : "not a student";
    return `${person.name} is ${person.age} years old and is ${studentStatus}.`;
}
const description = describePerson({ name: "John", age: 30, isStudent: true });
console.log(description);
