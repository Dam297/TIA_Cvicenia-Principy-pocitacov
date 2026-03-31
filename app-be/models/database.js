const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

exports.getListExerciseTestUser = function () {
    return pool.query(`
    
WITH "User_exercise" AS (
    SELECT 
		u."user_id", 
		e."exercise_id", 
		e."name", 
		e."description", 
		e."count_of_questions", 
		e."max_time_s", 
		e."enabled"
    FROM public."Users" AS u
    CROSS JOIN public."Exercises" AS e
	WHERE u."user_id" = 1
),

"User_test" AS (
    SELECT 
		u."user_id", 
		t."test_id", 
		t."name", 
		t."description", 
		t."count" AS "count_of_questions", 
		t."max_time_s", 
		t."enabled"
    FROM public."Users" AS u
    CROSS JOIN public."View_test_questions_count" AS t
	WHERE u."user_id" = 1
)

SELECT 
	ue."exercise_id",
	ue."name", 
	ue."description", 
	ue."count_of_questions", 
	ue."max_time_s", 
	ue."enabled",
	v."sec",
	v."count_correct" AS "points",
	true AS "is_exercise"
FROM "User_exercise" AS ue
LEFT JOIN "View_exercise_best_attempts" AS v
ON ue."user_id" = v."user_id"
AND ue."exercise_id" = v."exercise_id"

UNION


SELECT 
	ut."test_id",
	ut."name", 
	ut."description", 
	ut."count_of_questions", 
	ut."max_time_s", 
	ut."enabled",
	v."sec",
	v."sum_points" AS "points",
	false AS "is_exercise"
FROM "User_test" AS ut
LEFT JOIN "View_test_best_attempts" AS v
ON ut."user_id" = v."user_id"
AND ut."test_id" = v."test_id"
ORDER BY "is_exercise" DESC, "name" ASC 
    
    `)
};


exports.getSuccessExerciseTestUser = function () {
    return pool.query(`
	WITH "User_exercise" AS (
		SELECT 
			u."user_id", 
			e."exercise_id", 
			e."name", 
			e."count_of_questions", 
			e."enabled"
		FROM public."Users" AS u
		CROSS JOIN public."Exercises" AS e
		WHERE u."user_id" = 1
	),

	"User_test" AS (
		SELECT 
			u."user_id", 
			t."test_id", 
			t."name", 
			t."count" AS "count_of_questions", 
			t."enabled"
		FROM public."Users" AS u
		CROSS JOIN public."View_test_questions_count" AS t
		WHERE u."user_id" = 1
	)

	SELECT 
		ue."name", 
		ue."count_of_questions", 
		ue."enabled",
		v."sec",
		v."count_correct" AS "points",
		true AS "is_exercise"
	FROM "User_exercise" AS ue
	LEFT JOIN "View_exercise_best_attempts" AS v
	ON ue."user_id" = v."user_id"
	AND ue."exercise_id" = v."exercise_id"

	UNION


	SELECT 
		ut."name", 
		ut."count_of_questions", 
		ut."enabled",
		v."sec",
		v."sum_points" AS "points",
		false AS "is_exercise"
	FROM "User_test" AS ut
	LEFT JOIN "View_test_best_attempts" AS v
	ON ut."user_id" = v."user_id"
	AND ut."test_id" = v."test_id"
	ORDER BY "is_exercise" DESC, "name" ASC
		
`)
};


exports.getStudents = function () {
	return pool.query(`
		SELECT 
			"user_id",
			"login",
			"name"
		FROM 
		public."Users"
		WHERE "user_role" = 'student'	
`)
};

exports.getExercises = function () {
	return pool.query(`
		SELECT 
			"exercise_id",
			"name",
			"count_of_questions",
			"enabled"
		FROM 
		public."Exercises"
`)
};

exports.getTests = function () {
	return pool.query(`
		SELECT 
			t."test_id",
			t."name",
			t."enabled", 
			COUNT(tq."test_question_id") AS "count_of_questions"
		FROM
		public."Tests" AS t
		JOIN public."Test_questions" AS tq
		ON t."test_id" = tq."test_id" 
		GROUP BY t."test_id", t."name", t."enabled"
`)
};

exports.getBestTestAttempt = function (param) {
	return pool.query(`SELECT * FROM public."View_test_best_attempts" WHERE "user_id" = $1 AND "test_id" = $2`,
		[param.user_id, param.test_id])

};

exports.getBestExerciseAttempt = function (param) {
	return pool.query(`SELECT * FROM public."View_exercise_best_attempts" WHERE "user_id" = $1 AND "exercise_id" = $2`,
		[param.user_id, param.test_id])

};

