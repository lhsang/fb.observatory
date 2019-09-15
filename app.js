const login = require('facebook-chat-api')
const {EMAIL, PASSWORD, pool} = require('./setting')
const readline = require('readline')
const fs = require("fs")


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }

    // Logged in!


    
    api.listen((err, message) => {
        if(err) return console.error(err);
        
		if (typeof message.body === "string") {
            var attachment = "";
            if (message.attachments.length == 0){
                //Do nothing
            }
            else if (message.attachments[0].type === "photo") {
                attachment = message.attachments[0].largePreviewUrl;
            } else {
                attachment = message.attachments[0].url;
            }
            var time_curr = new Date()
            time_curr.setHours(time_curr.getHours()+7)
            time_curr = time_curr.toISOString().replace(/T/, ' ').replace(/\..+/, '')

            var sql = `INSERT INTO message(thread_id, sender_id, content, attachment, time) 
                        VALUES ('${message.threadID}', '${message.senderID}', '${message.body}', '${attachment}', '${time_curr}') `;

            pool.query(sql, (err, res) => {
                if(err)
                    console.error(err)
                else
                    console.info(`${time_curr}---- saved`)
            })
        }
    });
});