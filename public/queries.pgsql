CREATE TABLE users (
    phone VARCHAR(15) PRIMARY KEY,
    name VARCHAR(255),
    country_code INT,
    sex CHAR(1),
    DoB VARCHAR(8),
    race VARCHAR(20)
);


CREATE TABLE surveys (
    survey_id INT PRIMARY KEY,
    survey_name VARCHAR(100),
    country VARCHAR(30)
);

CREATE TABLE survey_versions (
    survey_version_id INT PRIMARY KEY,
    survey_id INT,
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id)
);

CREATE TABLE survey_questions (
    question_id INT PRIMARY KEY,
    survey_id INT,
    type VARCHAR(255),
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id)
);

CREATE TABLE survey_answers (
    question_id INT,
    phone VARCHAR(15),
    answer VARCHAR(255),
    survey_datetime TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES survey_questions(question_id),
    FOREIGN KEY (phone) REFERENCES users(phone),
    PRIMARY KEY (question_id, phone)
);

SELECT * FROM public.survey_questions
ORDER BY question_id ASC 


DELETE From survey_questions WHERE question_id IN (40,41,42,43)
	
INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (17, 'How much do you like spiciness?', '[Prefer Less, Neutral, Slightly Like, Moderatly Like, Strongly Like]', 1, 'pref')


UPDATE survey_questions SET choices = '[<$4, $4-8,$8-12, $12-16, $16-20, >$20]' WHERE question_id = 47

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (38, 'What food allergies do you have? (Select all that apply)', '[None, Poultry, Milk, Buckwheat, Peanuts, Soybeans, Wheat, Pinenuts,  Walnuts, Crab, Shrimp, Squid, Mackerel, Shellfish, Peach, Tomato, Chicken, Pork, Beef, Sulfites, Other]', 1, 'health')

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (39, 'What medical conditions or diseases do you have? (Select all that apply)', '[None, Diabetes, Hypertension, Obesity]', 1, 'health')

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (40, 'What specific diet do you follow?(Select all that apply)', '[None, Balanced, High Protein, Keto, Vegan, Intermittent Fasting]', 1, 'health')

	
INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (41, 'What is your height and weight', '', 1, 'BMI')

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (42, 'What religious dietary restrictions do you have?(Select all that apply)', '[None, Catholic, Muslim, Buddhist, Christian, Hindu, Other]', 1, 'restriction')

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (43, 'What meat do you typically avoid? (Select all that apply)','[None, Seafood, Pork, Beef, Chicken, Lamb, Duck]', 1, 'restriction')
	
INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (44, 'What foods do you find difficult to digest? (Select all that apply)','[None, Flour Based Products, Animal Protein, Dairy Products, Spicy Products]', 1, 'restriction')


INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (45, 'What occational foods do you consume? (Select all that apply)','[None, Seasonal Food, Weather-based Food, Holiday Food]', 1, 'health')

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (46, 'How frequently do you eat your favorite food?','[Daily, Every other day, Once every 3 days, Once every 4 days, Once every 2 weeks, Monthly겨]', 1, 'habit')
	
INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (47, 'What is your ideal price range for a single meal?','[$8-12, $12-16, $16-20, $20+]', 1, 'habit')

INSERT INTO survey_questions (question_id, question, choices, survey_id, type) 
VALUES (48, 'When do you eat your heaviest meal','[Every Meal, Breakfast & Lunch, Lunch & Dinner, Breakfast & Dinner]', 1, 'habit')


	
