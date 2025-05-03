//Object Literal

let student = {
    firstName: '',
    lastName: '',
    grades: [],

    inputNewGrade: function(newGrade){
        this.grades.push(newGrade);
    },

    computeAverageGrade: function(){
        if (this.grades.length === 0) return 0;
        let sum = this.grades.reduce((a,b) => a + b, 0);
        return sum / this.grades.length;
    },
};

let student1 = Object.create(student);
student1.firstName = 'John';
student1.lastName = 'Doe';
student1.grades = [90, 80, 85];

let student2 = Object.create(student);
student2.firstName = 'Jane';
student2.lastName = 'Smith';
student2.grades = [88, 92, 85];

let student3 = Object.create(student);
student3.firstName = 'Alice';
student3.lastName = 'Johnson';
student3.grades = [95, 100, 98];

let students = [student1, student2, student3];

let totalSum = 0;
let totalCount = 0;

students.forEach(s => {
    let avg = s.computeAverageGrade();
    totalSum += avg;
    totalCount ++;
    console.log(`${s.firstName} ${s.lastName} - Average: ${avg.toFixed(2)}`);
});

let overallAverage = totalSum / totalCount;
console.log(`Overall Average Grade: ${overallAverage}`);