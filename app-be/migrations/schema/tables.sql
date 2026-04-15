BEGIN;


ALTER TABLE IF EXISTS public."Exercise_attempts" DROP CONSTRAINT IF EXISTS to_exercise;

ALTER TABLE IF EXISTS public."Exercise_attempts" DROP CONSTRAINT IF EXISTS to_user;

ALTER TABLE IF EXISTS public."Exercise_question_answers" DROP CONSTRAINT IF EXISTS to_attempt;

ALTER TABLE IF EXISTS public."Test_attempts" DROP CONSTRAINT IF EXISTS test_id;

ALTER TABLE IF EXISTS public."Test_attempts" DROP CONSTRAINT IF EXISTS user_id;

ALTER TABLE IF EXISTS public."Test_question_answers" DROP CONSTRAINT IF EXISTS test_attempt;

ALTER TABLE IF EXISTS public."Test_question_answers" DROP CONSTRAINT IF EXISTS test_question;

ALTER TABLE IF EXISTS public."Test_question_option_answers" DROP CONSTRAINT IF EXISTS test_question_answer;

ALTER TABLE IF EXISTS public."Test_question_option_answers" DROP CONSTRAINT IF EXISTS test_question_option;

ALTER TABLE IF EXISTS public."Test_question_options" DROP CONSTRAINT IF EXISTS test_question;

ALTER TABLE IF EXISTS public."Test_questions" DROP CONSTRAINT IF EXISTS test_id;

ALTER TABLE IF EXISTS public."Users" DROP CONSTRAINT IF EXISTS user_role;



DROP TABLE IF EXISTS public."Exercise_attempts";

CREATE TABLE IF NOT EXISTS public."Exercise_attempts"
(
    exercise_attempt_id serial NOT NULL,
    exercise_id integer NOT NULL,
    user_id integer NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone,
    CONSTRAINT "Exercise_attempts_pkey" PRIMARY KEY (exercise_attempt_id)
);

DROP TABLE IF EXISTS public."Exercise_question_answers";

CREATE TABLE IF NOT EXISTS public."Exercise_question_answers"
(
    exercise_question_answer_id serial NOT NULL,
    exercise_attempt_id integer NOT NULL,
    question text COLLATE pg_catalog."default" NOT NULL,
    student_answer text COLLATE pg_catalog."default" NOT NULL,
    correct_answer text COLLATE pg_catalog."default" NOT NULL,
    correct boolean NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone NOT NULL,
    CONSTRAINT "Exercise_question_answers_pkey" PRIMARY KEY (exercise_question_answer_id)
);

DROP TABLE IF EXISTS public."Exercises";

CREATE TABLE IF NOT EXISTS public."Exercises"
(
    exercise_id serial NOT NULL,
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    count_of_questions smallint NOT NULL,
    max_time_s integer,
    enabled boolean NOT NULL,
    CONSTRAINT "Exercises_pkey" PRIMARY KEY (exercise_id),
    CONSTRAINT name_exercise UNIQUE (name)
);

DROP TABLE IF EXISTS public."Test_attempts";

CREATE TABLE IF NOT EXISTS public."Test_attempts"
(
    test_attempt_id serial NOT NULL DEFAULT nextval('"Test_attempts_test_attempt_seq"'::regclass),
    test_id integer NOT NULL,
    user_id integer NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone,
    CONSTRAINT "Test_attempts_pkey" PRIMARY KEY (test_attempts_id)
);

DROP TABLE IF EXISTS public."Test_question_answers";

CREATE TABLE IF NOT EXISTS public."Test_question_answers"
(
    test_question_answer_id serial NOT NULL DEFAULT nextval('"Test_question_answers_test_question_answer_seq"'::regclass),
    test_attempt_id integer NOT NULL,
    test_question_id integer NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone NOT NULL,
    CONSTRAINT "Test_question_answers_pkey" PRIMARY KEY (test_question_answer_id)
);

DROP TABLE IF EXISTS public."Test_question_option_answers";

CREATE TABLE IF NOT EXISTS public."Test_question_option_answers"
(
    test_question_option_id integer NOT NULL,
    test_question_answer_id integer NOT NULL,
    CONSTRAINT "Test_question_option_answers_pkey" PRIMARY KEY (test_question_option_id, test_question_answer_id)
);

DROP TABLE IF EXISTS public."Test_question_options";

CREATE TABLE IF NOT EXISTS public."Test_question_options"
(
    test_question_option_id serial NOT NULL,
    test_question_id integer NOT NULL,
    option text COLLATE pg_catalog."default" NOT NULL,
    correct boolean NOT NULL,
    CONSTRAINT "Test_question_options_pkey" PRIMARY KEY (test_question_option_id)
);

DROP TABLE IF EXISTS public."Test_questions";

CREATE TABLE IF NOT EXISTS public."Test_questions"
(
    test_question_id serial NOT NULL DEFAULT nextval('"Test_questions_test_questions_id_seq"'::regclass),
    test_id integer NOT NULL,
    question text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Test_questions_pkey" PRIMARY KEY (test_question_id)
);

DROP TABLE IF EXISTS public."Tests";

CREATE TABLE IF NOT EXISTS public."Tests"
(
    test_id serial NOT NULL,
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    max_time_s integer,
    enabled boolean NOT NULL,
    CONSTRAINT "Tests_pkey" PRIMARY KEY (test_id),
    CONSTRAINT name_tests UNIQUE (name)
);

DROP TABLE IF EXISTS public."User_roles";

CREATE TABLE IF NOT EXISTS public."User_roles"
(
    user_role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_roles_pkey" PRIMARY KEY (user_role)
);

DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id serial NOT NULL,
    user_role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    login character varying(64) COLLATE pg_catalog."default" NOT NULL,
    email character varying(256) COLLATE pg_catalog."default" NOT NULL,
    name character varying(256) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (user_id)
);

-- required by connect-pg-simple (storing sessions in DB)
DROP TABLE IF EXISTS "session";
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE); -- do not add the hidden OID column / backward compatibility

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
CREATE INDEX "IDX_session_expire" ON "session" ("expire");


ALTER TABLE IF EXISTS public."Exercise_attempts"
    ADD CONSTRAINT to_exercise FOREIGN KEY (exercise_id)
    REFERENCES public."Exercises" (exercise_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Exercise_attempts"
    ADD CONSTRAINT to_user FOREIGN KEY (user_id)
    REFERENCES public."Users" (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;



ALTER TABLE IF EXISTS public."Exercise_question_answers"
    ADD CONSTRAINT to_attempt FOREIGN KEY (exercise_attempt_id)
    REFERENCES public."Exercise_attempts" (exercise_attempt_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;



ALTER TABLE IF EXISTS public."Test_attempts"
    ADD CONSTRAINT test_id FOREIGN KEY (test_id)
    REFERENCES public."Tests" (test_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;



ALTER TABLE IF EXISTS public."Test_attempts"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES public."Users" (user_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;



ALTER TABLE IF EXISTS public."Test_question_answers"
    ADD CONSTRAINT test_attempt FOREIGN KEY (test_attempt_id)
    REFERENCES public."Test_attempts" (test_attempt_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;



ALTER TABLE IF EXISTS public."Test_question_answers"
    ADD CONSTRAINT test_question FOREIGN KEY (test_question_id)
    REFERENCES public."Test_questions" (test_question_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Test_question_option_answers"
    ADD CONSTRAINT test_question_answer FOREIGN KEY (test_question_answer_id)
    REFERENCES public."Test_question_answers" (test_question_answer_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Test_question_option_answers"
    ADD CONSTRAINT test_question_option FOREIGN KEY (test_question_option_id)
    REFERENCES public."Test_question_options" (test_question_option_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Test_question_options"
    ADD CONSTRAINT test_question FOREIGN KEY (test_question_id)
    REFERENCES public."Test_questions" (test_question_id) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Test_questions"
    ADD CONSTRAINT test_id FOREIGN KEY (test_id)
    REFERENCES public."Tests" (test_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT;


ALTER TABLE IF EXISTS public."Users"
    ADD CONSTRAINT user_role FOREIGN KEY (user_role)
    REFERENCES public."User_roles" (user_role) MATCH FULL
    ON UPDATE CASCADE
    ON DELETE RESTRICT;

END;