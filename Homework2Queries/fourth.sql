SELECT * FROM question INNER JOIN users ON  question.User_user_id=users.user_id INNER JOIN exam_has_question ON question.question_id=exam_has_question.Question_question_id
WHERE kind_of_exam='test' AND exam_mark >15;
