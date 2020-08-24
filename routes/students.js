const router = require('express').Router();
const studentsCtrl = require('../controllers/students');

// GET /students
router.get('/', studentsCtrl.index);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /students/:id/facts
router.post('/facts', studentsCtrl.addFact);

// DELETE /facts/:id
router.delete('/facts/:id', studentsCtrl.delFact);

module.exports = router;
