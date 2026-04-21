
let students = [
  { id: 1, name: 'Alice Johnson', score: 85 },
  { id: 2, name: 'Bob Smith', score: 42 },
  { id: 3, name: 'Charlie Davis', score: 28 }
];

const PASS_MARK = 35;


const studentList = document.getElementById('student-list');
const studentForm = document.getElementById('student-form');
const totalCount = document.getElementById('total-count');
const emptyState = document.getElementById('empty-state');


function createStudentRow(student, index) {
  const isPass = student.score >= PASS_MARK;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><span class="rank-badge">${index + 1}</span></td>
    <td class="name-cell">${student.name}</td>
    <td>
      <input type="number" class="score-edit" value="${student.score}" min="0" max="100" data-id="${student.id}">
    </td>
    <td>
      <span class="status-badge ${isPass ? 'status-pass' : 'status-fail'}">
        ${isPass ? 'PASS' : 'FAIL'}
      </span>
    </td>
    <td>
      <button class="delete-btn" data-id="${student.id}">Delete</button>
    </td>
  `;

  const scoreInput = tr.querySelector('.score-edit');
  scoreInput.addEventListener('change', (e) => {
    updateScore(student.id, parseInt(e.target.value));
  });

 
  const deleteBtn = tr.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    deleteStudent(student.id);
  });

  return tr;
}


function renderScoreboard() {
  studentList.innerHTML = '';
  

  const sortedStudents = [...students].sort((a, b) => b.score - a.score);
  
  if (sortedStudents.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    sortedStudents.forEach((student, index) => {
      studentList.appendChild(createStudentRow(student, index));
    });
  }
  
  totalCount.textContent = students.length;
}


studentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('student-name').value;
  const score = parseInt(document.getElementById('student-score').value);
  
  const newStudent = {
    id: Date.now(),
    name,
    score
  };
  
  students.push(newStudent);
  studentForm.reset();
  renderScoreboard();
});


function updateScore(id, newScore) {
  const student = students.find(s => s.id === id);
  if (student) {
    student.score = isNaN(newScore) ? 0 : Math.min(100, Math.max(0, newScore));
    renderScoreboard();
  }
}


function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderScoreboard();
}


renderScoreboard();
