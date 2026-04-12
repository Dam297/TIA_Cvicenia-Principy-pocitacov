CREATE VIEW "View_exercise_best_attempts" AS
	WITH "exercise_attempt_time_correct" AS (
		SELECT 
			"user_id", 
			e."exercise_id", 
			EXTRACT(EPOCH FROM (ea."end" - ea."start")) AS "sec", 
			COUNT("exercise_question_answer_id") AS "count_correct" 
		FROM public."Exercise_attempts" AS ea
		JOIN public."Exercise_question_answers" AS eqa
			ON ea."exercise_attempt_id" = eqa."exercise_attempt_id"
		JOIN public."Exercises" AS e
			ON ea."exercise_id" = e."exercise_id"
		WHERE eqa."correct" = TRUE
		AND EXTRACT(EPOCH FROM (ea."end" - ea."start")) <= e."max_time_s" 
		GROUP BY ea."end", ea."start", ea."exercise_attempt_id", "user_id", e."exercise_id" 
	)

	SELECT DISTINCT ON ("user_id", "exercise_id")
		"user_id",
		"exercise_id",
		"sec",
		"count_correct"
	FROM "exercise_attempt_time_correct"
	ORDER BY
		"user_id",
		"exercise_id",
		"count_correct" DESC,
		"sec" ASC;


/* pocet bodov za otazku */
CREATE VIEW "View_test_answer_points" AS
	SELECT 
		tqa."test_question_answer_id",
        tqa."test_attempt_id",
		CASE
			WHEN 
				(	/* pouzivatel spravne odpovedal na danu otazku */
					SELECT
    					NOT EXISTS (
        					SELECT tqoa."test_question_option_id"
							FROM public."Test_question_option_answers" AS tqoa
							WHERE tqoa."test_question_answer_id" = tqa."test_question_answer_id"	 
        						EXCEPT
        					SELECT tqo."test_question_option_id" 
							FROM public."Test_question_options" AS tqo
							WHERE tqo."correct" = TRUE
							AND tqo."test_question_id" = tqa."test_question_id"
    					)
    					AND
    						NOT EXISTS (
        						SELECT tqo."test_question_option_id" 
								FROM public."Test_question_options" AS tqo
								WHERE tqo."correct" = TRUE
								AND tqo."test_question_id" = tqa."test_question_id"
        							EXCEPT
        						SELECT tqoa."test_question_option_id"
								FROM public."Test_question_option_answers" AS tqoa
								WHERE tqoa."test_question_answer_id" = tqa."test_question_answer_id"	
    				)
				)
				THEN 1
    		WHEN 
				(	/* pouzivatel neodpovedal na danu otazku */
					SELECT DISTINCT FALSE
					FROM public."Test_question_option_answers" AS tqoa
					WHERE tqoa."test_question_answer_id" = tqa."test_question_answer_id"		
				)
				THEN -1
    		ELSE -2
			END AS "points"
	FROM "Test_question_answers" AS tqa;

	
CREATE VIEW "View_test_best_attempts" AS
	WITH "test_attempt_time_correct" AS (
		SELECT 
			"user_id", 
			t."test_id", 
			EXTRACT(EPOCH FROM (ta."end" - ta."start")) AS "sec", 
			SUM("points") AS "sum_points" 
		FROM public."Test_attempts" AS ta
		JOIN "View_test_answer_points" AS tap
			ON ta."test_attempts_id" = tap."test_attempt_id"
		JOIN public."Tests" AS t
			ON ta."test_id" = t."test_id"
		WHERE EXTRACT(EPOCH FROM (ta."end" - ta."start")) <= t."max_time_s" 
		GROUP BY ta."end", ta."start", ta."test_attempts_id", "user_id", t."test_id" 
	)

	SELECT DISTINCT ON ("user_id", "test_id")
		"user_id",
		"test_id",
		"sec",
		"sum_points"
	FROM "test_attempt_time_correct"
	ORDER BY
		"user_id",
		"test_id",
		"sum_points" DESC,
		"sec" ASC;



CREATE VIEW "View_test_questions_count" AS
	SELECT
	t."test_id",
	t."name",
	t."description",
	t."max_time_s",
	t."enabled",
	COUNT(tq."test_question_id")
	FROM public."Tests" AS t
	JOIN public."Test_questions" AS tq
	ON tq."test_id" = t."test_id"
	GROUP BY t."test_id", t."name",	t."description", t."max_time_s", t."enabled"


