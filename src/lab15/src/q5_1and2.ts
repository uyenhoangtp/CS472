class Question {
    qid: number;
    answer: string;
  
    constructor(qid: number, answer: string) {
      this.qid = qid;
      this.answer = answer;
    }
  
    checkAnswer(answer: string): boolean {
      return this.answer === answer;
    }
  }
  
  class Student {
    studentId: number;
    answers: Question[];
  
    constructor(studentId: number) {
      this.studentId = studentId;
      this.answers = [];
    }
  
    addAnswer(question: Question): void {
      this.answers.push(question);
    }
  }
  
  class Quiz {
    questions: Map<number, string>;
    students: Student[];
  
    constructor(questions: Question[], students: Student[]) {
      this.questions = new Map();
      questions.forEach(q => {
        this.questions.set(q.qid, q.answer);
      });
      this.students = students;
    }
  
    scoreStudentBySid(sid: number): number {
      const student = this.students.find(s => s.studentId === sid);
      if (!student) {
        throw new Error("Student not found");
      }
  
      let score = 0;
      student.answers.forEach(answer => {
        if (this.questions.get(answer.qid) === answer.answer) {
          score++;
        }
      });
  
      return score;
    }
  
    getAverageScore(): number {
      let totalScore = 0;
      this.students.forEach(student => {
        totalScore += this.scoreStudentBySid(student.studentId);
      });
      return totalScore / this.students.length;
    }
  }
  
  // Example usage:
  const student1 = new Student(10);
  student1.addAnswer(new Question(2, 'a'));
  student1.addAnswer(new Question(3, 'b'));
  student1.addAnswer(new Question(1, 'b'));
  
  const student2 = new Student(11);
  student2.addAnswer(new Question(3, 'b'));
  student2.addAnswer(new Question(2, 'a'));
  student2.addAnswer(new Question(1, 'd'));
  
  const students: Student[] = [student1, student2];
  const questions: Question[] = [
    new Question(1, 'b'),
    new Question(2, 'a'),
    new Question(3, 'b')
  ];
  
  const quiz = new Quiz(questions, students);
  
  const scoreforStudent10 = quiz.scoreStudentBySid(10);
  console.log(scoreforStudent10);
  
  const scoreforStudent11 = quiz.scoreStudentBySid(11);
  console.log(scoreforStudent11);
  
  const average = quiz.getAverageScore();
  console.log(average);
  