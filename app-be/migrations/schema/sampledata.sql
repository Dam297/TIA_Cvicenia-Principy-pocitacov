/* User_roles */
INSERT INTO public."User_roles"("user_role") VALUES ('student');
INSERT INTO public."User_roles"("user_role") VALUES ('ucitel');

/* Users */
INSERT INTO public."Users"("user_id", "user_role", "login", "email", "name") VALUES 
('1', 'student', 'hrasko1', 'hrasko1@uniba.sk', 'Janko Hráško');
INSERT INTO public."Users"("user_id", "user_role", "login", "email", "name") VALUES 
('2', 'ucitel', 'ucitel1', 'ucitel1@uniba.sk', 'Učiteľ');
INSERT INTO public."Users"("user_id", "user_role", "login", "email", "name") VALUES 
('3', 'student', 'adam101', 'adam101@uniba.sk', 'Adam');

/* Temp_password */
INSERT INTO public."Temp_password"("user_id", "password") VALUES 
('1', '$2b$10$miemuj1H6s.1Rl/YPvLS2uNYks2Okc45HaEU1HTkm6LAEiWCGpvFe');
INSERT INTO public."Temp_password"("user_id", "password") VALUES 
('2', '$2b$10$miemuj1H6s.1Rl/YPvLS2uNYks2Okc45HaEU1HTkm6LAEiWCGpvFe');
INSERT INTO public."Temp_password"("user_id", "password") VALUES 
('3', '$2b$10$miemuj1H6s.1Rl/YPvLS2uNYks2Okc45HaEU1HTkm6LAEiWCGpvFe');

/* Exercises */
INSERT INTO public."Exercises"("exercise_id", "name", "description", "count_of_questions", "max_time_s", "enabled") VALUES 
('1', 'Prevod celého čísla z 2 do 10 sústavy', 'Cieľom cvičenia je precvičenie prevodu celého čísla z 2 do 10 sústavy', '10', '1800', 'true');
INSERT INTO public."Exercises"("exercise_id", "name", "description", "count_of_questions", "max_time_s", "enabled") VALUES 
('2', 'Prevod celého čísla z 10 do 2 sústavy', 'Cieľom cvičenia je precvičenie prevodu celého čísla z 10 do 2 sústavy', '10', '1800', 'true');

/* Tests */
INSERT INTO public."Tests"("test_id", "name", "description", "max_time_s", "enabled") VALUES 
('1', 'Skúšobný test', 'Skúšobný test slúži na precvičenie vedomostí z celého semestra.', '3600', 'true');
INSERT INTO public."Tests"("test_id", "name", "description", "max_time_s", "enabled") VALUES 
('2', 'Krátky test', 'Krátky test je naozaj krátky', '30', 'true');

/* Test_questions*/
INSERT INTO public."Test_questions"("test_question_id", "test_id", "question") VALUES 
('1', '1', 'Koľko je 10 + 10, ak daný príklad je v dvojkovej sústave? (aj výsledok je v dvojkovej sústave)');
INSERT INTO public."Test_questions"("test_question_id", "test_id", "question") VALUES 
('2', '1', 'Koľko je 10 + 10, ak daný príklad je v desiatkovej sústave? (aj výsledok je v desiatkovej sústave)');
INSERT INTO public."Test_questions"("test_question_id", "test_id", "question") VALUES 
('3', '1', 'Aké formáty ukladania bajtov poznáme?');
INSERT INTO public."Test_questions"("test_question_id", "test_id", "question") VALUES 
('4', '2', 'Je tento test krátky?');

/* Test_question_options */
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('1', '1', '10', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('2', '1', '200', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('3', '1', '20', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('4', '1', '100', 'true');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('5', '2', '10', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('6', '2', '200', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('7', '2', '20', 'true');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('8', '2', '100', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('9', '3', 'Big-indian', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('10', '3', 'Big-endian', 'true');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('11', '3', 'Little-indian', 'false');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('12', '3', 'Little-endian', 'true');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('13', '4', 'Áno', 'true');
INSERT INTO public."Test_question_options"("test_question_option_id", "test_question_id", "option", "correct") VALUES 
('14', '4', 'Nie', 'false');