import {google} from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN} = process.env;

export const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


export const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

oauth2Client.on('tokens', async(tokens) => {
    if(tokens.refresh_token) {
        try {
            await oauth2Client.setCredentials({
                refresh_token: tokens.refresh_token,
                access_token: tokens.access_token
            })
        } catch (error) {
            console.log(error)
        }
    }
})