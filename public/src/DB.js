const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'pickeatSurvey',
    user: 'postgres',
    password: '0531',
    port: 5432
});



async function fetchQuestions(){
    const queryText = "SELECT * FROM survey_questions";
    const client = await pool.connect();
    try {
        const res = await client.query(queryText);
        const surveyQuestions = res.rows
        for(let i=0; i<surveyQuestions.length; i++){
            const answers = surveyQuestions[i].choices
            const list = answers.replace(/[\[\]]/g, '').split(", ")
            surveyQuestions[i].choices = list

        }
        return surveyQuestions;
        
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        client.release();
    }
}

async function writeAnswers(queryText, values){
    //const queryText = "INSERT INTO survey_questions (question_id, question, choices, survey_id, type) VALUES ($1, $2, $3,$4, $5)";
    //const values = [1, 'How much do you like sweetness?', '[Prefer Less, Neutral, Slightly Like, Moderatly Like, Strongly Like]', 1, 'pref'];
    const client = await pool.connect();
    try{
        const res = await client.query(queryText,values)
        console.log(res.rows)
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.release();
    }
}

module.exports = {
    fetchQuestions,
    writeAnswers
};

