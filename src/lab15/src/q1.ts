function describePerson(person: { name: string; age: number; isStudent: boolean }): string {
  const studentStatus = person.isStudent ? "a student" : "not a student";
  return `${person.name} is ${person.age} years old and is ${studentStatus}.`;
}

const description = describePerson({ name: "John", age: 30, isStudent: true });
console.log(description);
