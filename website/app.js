




let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });





//--------------------------------------------------------------------------
const Wetter = {Verknüpfung:'https://api.openweathermap.org/data/2.5/weather?zip=' ,schlussel : '661daa7377189bfe425b6af1f07ac279' }

const heiß = Wetter.Verknüpfung;
const luft = Wetter.schlussel;


const temperaturAbrufen = async (heiß, Postleitzahl, luft ,Einheiten)=>{
     
    const response = await fetch(heiß + Postleitzahl +'&units='+Einheiten+'&APPID=' + luft)
    
    try {
        const data = await response.json();
        console.log(data);
        console.log('PIRMAS');
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}


//-------------------------------------------------------------------------------



//-------------------------------------------------------------------------------
const postInfo = async (url = '', data = {}) => {
    const anfragePosten= await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        
        const neuInfo = await anfragePosten.json();
        return neuInfo;
    }
    catch (error) {
        console.log('Error', error);
    }
}


const UIaktualisieren = async () => {
    const request = await fetch('http://localhost:2599/all');
    try {
        const ganzeInfo = await request.json();
    
        document.getElementById('date').innerHTML = ganzeInfo.date;
        document.getElementById('temp').innerHTML = ganzeInfo.temperature;
        document.getElementById('content').innerHTML = ganzeInfo.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}




document.getElementById('generate').addEventListener('click', function aktionAusführen(achtung){
    const Postleitzahl = document.getElementById('zip').value;
    const gefühle = document.getElementById('feelings').value;
    const Einheiten = document.getElementById("units").value ;
    console.log(newDate);
    temperaturAbrufen(heiß, Postleitzahl, luft, Einheiten)
    .then(function (data){       
        postInfo('http://localhost:2599/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: gefühle } )       
        .then(function() {
            UIaktualisieren()
        })
    })
});