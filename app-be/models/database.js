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

UNION


SELECT 
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
ORDER BY name 
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
		v."count_correct" AS "points"
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
		v."sum_points" AS "points"
	FROM "User_test" AS ut
	LEFT JOIN "View_test_best_attempts" AS v
	ON ut."user_id" = v."user_id"
	AND ut."test_id" = v."test_id"
	ORDER BY name 
		
`)
};


