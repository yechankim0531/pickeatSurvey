const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'pickeatSurvey',
    user: 'postgres',
    password: '0531',
    port: 5432
});



async function fetchQuestions(){
    const queryText = "SELECT * FROM survey_questions ORDER BY question_id";
    const client = await pool.connect();
    try {
        const res = await client.query(queryText);
        const surveyQuestions = res.rows
        for(let i=0; i<surveyQuestions.length; i++){
            const answers = surveyQuestions[i].choices
            const list = answers.replace(/[\[\]]/g, '').split(", ")
            surveyQuestions[i].choices = list

        }
        //console.log(surveyQuestions)
        return surveyQuestions;
        
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        client.release();
    }
}

async function writeAnswers(data){
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

// function cleanData(data){
//     let question=[]
//     let answers=[]
//     for(let i=0;i<48;i++ ){
//         const number = i+1
//         question[i] = number
//         answers[i] = data[`${number}`]
//     }
//     return question, answers
// }

module.exports = {
    fetchQuestions,
    writeAnswers,
    //cleanData
};



