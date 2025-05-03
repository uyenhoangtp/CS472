// Constructor function for Student
function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = [];
  }
  
  // Add method to prototype to save memory
  Student.prototype.inputNewGrade = function(newGrade) {
    this.grades.push(newGrade);
  };
  
  Student.prototype.computeAverageGrade = function() {
    if (this.grades.length === 0) return 0;
    const sum = this.grades.reduce((a, b) => a + b, 0);
    return sum / this.grades.length;
  };
  
  // Create an array of student instances
  const students = [
    new Student("John", "Doe"),
    new Student("Jane", "Smith"),
    new Student("Alice", "Johnson")
  ];

  // Add grades to each student
  students[0].inputNewGrade(90);
  students[0].inputNewGrade(80);
  students[0].inputNewGrade(85);
  
  students[1].inputNewGrade(88);
  students[1].inputNewGrade(92);
  students[1].inputNewGrade(85);
  
  students[2].inputNewGrade(95);
  students[2].inputNewGrade(100);
  students[2].inputNewGrade(98);
  
  // Print average for each student
  let totalSum = 0;
  
  students.forEach(s => {
    const avg = s.computeAverageGrade();
    totalSum += avg;
    console.log(`${s.firstName} ${s.lastName} - Average: ${avg.toFixed(2)}`);
  });
  
  const overallAverage = totalSum / students.length;
  console.log(`Overall average grade of all students: ${overallAverage.toFixed(2)}`);
  