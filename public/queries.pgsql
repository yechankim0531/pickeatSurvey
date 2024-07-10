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
