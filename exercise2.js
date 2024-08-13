const express = require('express'); 
const cookieParser = require('cookie-parser'); 

const app = express(); 
const port = process.env.PORT || 3000; 

app.use(cookieParser()); 

// Function to format the date with a specified time zone
function formatDateWithTimeZone(date, timezone) {
    return date.toLocaleString('en-US', {
        timeZone: timezone,
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: 'short' 
    });
}

app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies); 

    
    let visits = req.cookies ? req.cookies['numOfVisits'] : undefined;
    let lastVisit = req.cookies ? req.cookies['lastVisit'] : undefined;

    const currentDateTime = new Date();
    const timezone = 'America/New_York'; 
    const formattedDateTime = currentDateTime.toString();

    if (visits) {
        visits = parseInt(visits) + 1;

        res.cookie('numOfVisits', visits, { maxAge: 31536000000 }); 
        res.cookie('lastVisit', formattedDateTime, { maxAge: 31536000000 }); 
        
        res.send(`<h1 style="color: darkblue;">Hello, this is the ${visits} time(s) that you are visiting my webpage.</h1><p>Last time you visited my webpage was on: ${lastVisit}</p>`);
    } else {
        
        res.cookie('numOfVisits', 1, { maxAge: 31536000000 }); 
        res.cookie('lastVisit', formattedDateTime, { maxAge: 31536000000 }); 
        
        res.send('<h1 style="color: darkgreen;">Welcome to my webpage! This is your first time here.</h1>');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
