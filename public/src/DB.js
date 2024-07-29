const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'pickeatSurvey',
    user: 'postgres',
    password: '0531',
    port: 5432
});


let length = 0;
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
        length = surveyQuestions.length
        return surveyQuestions;
        
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        client.release();
    }
}

async function writeAnswers(data){
    const client = await pool.connect();
    const newData = cleanData(data)

    
    try{
        
        const date_submitted = new Date()
        const phone = newData.phone
        
        
        let queryText = "INSERT INTO users (phone, name, country_code, sex, dob,race) VALUES ($1, $2, $3, $4, $5, $6)";
        let values= [data['number'], data['name'],data['country'] ,data['sex'], data['DoB'],data['race'], ]
        
        //Uncomment to send Data to DB
        await client.query(queryText, values);
        
        for(let i=0; i<newData.question.length-1; i++){
            
            queryText = "INSERT INTO survey_answers (question_id, phone, answer, date_submitted, time) VALUES ($1, $2, $3, $4, $5)";
            const question_id = newData.question[i];
            const answer = newData.answers[i]
            const time = newData.time[i]
            
            values = [question_id, phone, answer, date_submitted, time];
            //console.log("With values:", values);
            //Uncomment to send Data to DB
            await client.query(queryText, values);
        }
        console.log("All data uploaded successfully.");
        
    }
    catch(err){
        console.log(err);
    }
    finally{
        client.release();
    }
}

function cleanData(data){
    let question= []
    

    let answers=[]
    for(let i=0;i<length;i++ ){
        
        const number = i+1
        question[number]=number
        if(i===40){
            answers[i] = `${data['height']}CM,${data['weight']}KG `
        }
        else{
            
            answers[i] = data[`${number}`]
        }
        question[i] = number
        
    }
    
    if(data['diabetesValue'])answers[38]=answers[38]+", Blood Sugar: "+data['diabetesValue']
    if(data['bloodPressure'])answers[38]= answers[38]+", Blood Pressure: "+data['bloodPressure']+ ", Heart Rate: "+ data['heartrate']
    if(data['otherAllergies'])answers[37]= answers[37]+": "+data['otherAllergies']
    if(data['otherReligion'])answers[41]= answers[41]+": "+data['otherReligion']

    const time= JSON.stringify(data['time']).replace(/["']/g,"").split(',')
    console.log(time)
    return { question, answers, phone: data['number'], time }
}

module.exports = {
    fetchQuestions,
    writeAnswers,
    cleanData
};



