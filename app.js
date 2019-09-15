const login = require('facebook-chat-api')
const {EMAIL, PASSWORD, pool} = require('./setting')
const readline = require('readline')
const fs = require("fs")
const {getUserInfo} = require('./helper')

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var cookieFile = 'appstate.json'

login({appState: JSON.parse(fs.readFileSync(cookieFile, 'utf8'))}, (err, api) => {
    if(err) return console.error(err)

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

            var sql = `INSERT INTO message(thread_id, sender_id, content, attachment, time, is_group) 
                        VALUES ('${message.threadID}', '${message.senderID}', '${message.body}', '${attachment}', '${time_curr}', ${message.isGroup}) `;
            
            pool.query(sql, (err, res) => {
                if(err)
                    console.error(err)
                else
                    console.info(`${time_curr}  |  saved`)
            })
        }
    });
});

//  script to login - get cookie - save to cookie file
/*function getCookie(){
    login({email: EMAIL, password: PASSWORD}, (err, api)=>{
        if(err) {
            switch (err.error) {
                case 'login-approval':
                    console.log('Enter code (OPT)> ');
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
        fs.writeFileSync(cookieFile, JSON.stringify(api.getAppState()));
    });
}

// Run this function if you don't have cookie file
getCookie()
*/