const express = require('express');
const router = express.Router();

// Multiple students data
let students = [
    { id: 1, name: "Priyadharshini", age: 20, dept: "ECE" },
    { id: 2, name: "Prakash", age: 21, dept: "CSE" },
    { id: 3, name: "Anu", age: 20, dept: "ECE" }
];

// READ all students
router.get('/', (req, res) => {
    res.json(students);
});

// READ single student
router.get('/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    student ? res.json(student) : res.status(404).json({ message: "Student not found" });
});

// CREATE student
router.post('/', (req, res) => {
    students.push(req.body);
    res.json({ message: "Student added", students });
});

// UPDATE single student
router.put('/:id', (req, res) => {
    students = students.map(s =>
        s.id == req.params.id ? { ...s, ...req.body } : s
    );
    res.json({ message: "Student updated", students });
});

// UPDATE multiple students
router.put('/', (req, res) => {
    const updates = req.body;
    updates.forEach(u => {
        students = students.map(s =>
            s.id === u.id ? { ...s, ...u } : s
        );
    });
    res.json({ message: "Multiple students updated", students });
});

// DELETE student
router.delete('/:id', (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.json({ message: "Student deleted", students });
});

module.exports = router;
