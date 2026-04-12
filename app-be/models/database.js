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
	ue."exercise_id" AS "id",
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
	ut."test_id" AS "id",
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

exports.getExerciseDescriptionUser = function (param) {
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
	AND e."exercise_id" = $1
)

SELECT 
	ue."exercise_id",
	ue."name", 
	ue."description", 
	ue."count_of_questions", 
	ue."max_time_s", 
	ue."enabled",
	v."sec",
	v."count_correct" AS "points"
FROM "User_exercise" AS ue
LEFT JOIN "View_exercise_best_attempts" AS v
ON ue."user_id" = v."user_id"
AND ue."exercise_id" = v."exercise_id"
    `, [param.exercise_id])
};

exports.getTestDescriptionUser = function (param) {
	return pool.query(`
		WITH "User_test" AS (
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
	AND t."test_id" = $1
)

SELECT 
	ut."test_id",
	ut."name", 
	ut."description", 
	ut."count_of_questions", 
	ut."max_time_s", 
	ut."enabled",
	v."sec",
	v."sum_points" AS "points"
FROM "User_test" AS ut
LEFT JOIN "View_test_best_attempts" AS v
ON ut."user_id" = v."user_id"
AND ut."test_id" = v."test_id"
    
    `, [param.test_id])
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

exports.getStartedTestAttempt = function (param) {
	return pool.query(`SELECT ta."test_attempts_id"
		FROM public."Test_attempts" AS ta 
		WHERE ta."end" IS null
		AND ta."test_id" = $1
		AND ta."user_id" = $2
		ORDER BY test_attempts_id ASC `,
		[param.test_id, param.user_id])
};

exports.getLastTestAttempt = function (param) {
	return pool.query(`SELECT ta."test_attempts_id"
		FROM public."Test_attempts" AS ta 
		WHERE ta."end" IS NOT null
		AND ta."test_id" = $1
		AND ta."user_id" = $2
		ORDER BY ta."end" DESC 
		LIMIT 1`,
		[param.test_id, param.user_id])
};

exports.newTestAttempt = function (param) {
	return pool.query(`INSERT INTO public."Test_attempts" ("test_id", "user_id", "start") VALUES ($1, $2, NOW())`,
		[param.test_id, param.user_id])
};

exports.getTestQuestion = function (param) {
	return pool.query(`
		SELECT *
FROM (	
	SELECT COUNT(1) AS "count_maximum"
	FROM public."Test_questions" AS tq
	WHERE tq."test_id" = $1)
CROSS JOIN (
	SELECT COUNT(1) AS "count_actual"
	FROM public."Test_question_answers" AS tqa
	WHERE tqa."test_attempt_id" = $2)
CROSS JOIN (
	SELECT tq."test_question_id", tqa."test_question_answer_id", tq."question"
	FROM public."Test_questions" AS tq
	LEFT JOIN 
	(
		SELECT *
		FROM public."Test_question_answers" AS tqa2
		WHERE tqa2."test_attempt_id" = $2
	) AS tqa
	ON tqa."test_question_id" = tq."test_question_id" 
	WHERE tq."test_id" = $1
	
	AND tqa."end" IS NULL
	ORDER BY tqa."start" ASC, tqa."test_attempt_id" ASC, RANDOM()
	LIMIT 1
	);
    `,
		[param.test_id, param.test_attempt_id])
};


exports.getTestOptions = function (param) {
	return pool.query(`SELECT tqa."test_question_option_id", tqa."option"
FROM public."Test_question_options" AS tqa
WHERE tqa."test_question_id" = $1
ORDER BY Random()`,
		[param.test_question_id]
	)
};

exports.startTestQuestion = function (param) {
	return pool.query(`	INSERT INTO public."Test_question_answers" ("test_attempt_id", "test_question_id", "start") VALUES ($1, $2, NOW()) RETURNING public."Test_question_answers"."test_question_answer_id";`,
		[param.test_attempt_id, param.test_question_id])
};


exports.endTestQuestion = function (param) {
	return pool.query(`UPDATE public."Test_question_answers" SET "end" = NOW() WHERE "test_question_answer_id" = $1;`,
		[param.test_question_answer_id])
};

exports.setAnswerTestQuestion = function (option, answer) {
	return pool.query(`INSERT INTO public."Test_question_option_answers" (test_question_option_id, test_question_answer_id) VALUES ($1, $2)`,
		[option, answer])
};

exports.endTest = function (param) {
	return pool.query(`UPDATE public."Test_attempts" as ta SET "end" = (
		SELECT tqa."end"
		FROM public."Test_question_answers" as tqa
		WHERE tqa."test_attempt_id" = $1
		ORDER BY tqa."end" DESC
		LIMIT 1
		)
		WHERE ta."test_attempts_id" = $1;`,
		[param.test_attempt_id])
};

exports.getTestAttempt = function (param) {
	return pool.query(`
	SELECT ta."start", t."max_time_s"
	FROM public."Test_attempts" AS ta
	JOIN public."Tests" AS t ON t."test_id" = t."test_id"
	WHERE ta."test_attempts_id" = $1;`,
		[param.test_attempt_id])
};

exports.getFinalTestAttempt = function (param) {
	return pool.query(`
	SELECT * FROM (
		SELECT
		SUM(CASE WHEN vtap."points" = -1 THEN 1 ELSE 0 END) AS "count_empty",
		SUM(CASE WHEN vtap."points" = -2 THEN 1 ELSE 0 END) AS "count_incorrect",
		SUM(CASE WHEN vtap."points" = 1 THEN 1 ELSE 0 END) AS "count_correct"
		FROM public."View_test_answer_points" as vtap
		WHERE vtap."test_attempt_id" = $1
		)
	CROSS JOIN(
		SELECT t."name",
		EXTRACT(EPOCH FROM (ta."end" - ta."start")) AS "sec"
		FROM public."Tests" AS t 
		JOIN public."Test_attempts" AS ta ON t."test_id" = ta."test_id"
		WHERE ta."test_attempts_id" = $1
	)`, [param.test_attempt_id])
};

