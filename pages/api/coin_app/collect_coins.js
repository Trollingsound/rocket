import getToken from "./token";
import getOrder from "./coins_order";
// /pages/api/video.js
export default async function handler(req, res) {
    
    if (req.method != 'POST') return res.status(405).json({ message: 'Method not allowed' });
    
    const { mytoken } = req.body;
    
    if (!mytoken) { res.status(400).json({ res: "My token not found" }) }
    const pertoken = mytoken
    const perticularToken = await getToken(pertoken)

    if (!perticularToken) { res.status(400).json({ res: "Token not found" }) }

    const { videoId, sec } = await getOrder(perticularToken);
    if (!videoId) { res.status(404).json({ res: "videoId Not Found" }) }

    const myHeaders = new Headers();
    myHeaders.append("token", perticularToken);
    myHeaders.append("Content-Length", "0");
    myHeaders.append("Host", "tuberocket.app:3000");
    myHeaders.append("Connection", "Keep-Alive");
    myHeaders.append("Accept-Encoding", "gzip");
    myHeaders.append("User-Agent", "okhttp/3.12.0");

    try {
        // Fetch share code coin
        const response = await fetch("http://tuberocket.app:3000/api/share-code-coin", {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow"
        });
        const result = await response.json();
        console.log(` retMessage : ${result.retMessage}`);
    } catch (error) {
        console.error(error);
    }

    const requestOptions = {
        method: "PUT",
        headers: {
            "token": perticularToken,
            "height": "0.0",
            "Content-Type": "application/json; charset=UTF-8",
            "Host": "tuberocket.app:3000",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.0"
        },
        body: JSON.stringify({
            id: videoId,
            playCount: 0,
            playSecond: 0,
            boost: 0,
            status: ""
        }),
        redirect: "follow"
    };

    try {

        if (process.stdout.isTTY) {
        process.stdout.clearLine();  // Clear the current line
        process.stdout.cursorTo(0);  // Move cursor to beginning of line
}

        

        // Delay function with logging every second in one line
        const delayWithLog = async (sec) => {
            return new Promise((resolve) => {
                let elapsed = 0;
                const interval = setInterval(() => {
                    elapsed++;
                    const remaining = sec - elapsed;

        if (process.stdout.isTTY) {   
                    // Overwrite the same line in the console
                    process.stdout.clearLine();  // Clear the current line
                    process.stdout.cursorTo(0);  // Move cursor to beginning of line
                    process.stdout.write(` Elapsed time: ${elapsed} second(s), Remaining time: ${remaining} second(s)`);
        }

                    if (elapsed >= sec) {
                        clearInterval(interval);
                        console.log("\n");  // Move to the next line after completion
                        resolve();  // Resolve the promise after the total delay
                    }
                }, 1000); // 1000ms = 1 second
            });
        };

        console.log(` Waiting for ${sec} seconds before making the request... / Video ID: ${videoId}`);

        // Wait for the delay before making the request
        await delayWithLog(sec);

        // Fetch video after delay
        const response = await fetch("http://tuberocket.app:3000/api/video", requestOptions);
        const resy = await response.json();

        // Log coins if present in the response
        if (resy && resy.result && resy.result.coin) {
            console.log(` Coins: ${resy.result.coin}`);
        } else {
            console.log(' No coins data found in response.');
        }

        console.log(`\n--------------------------------------------------------------------------------------------------------\n`);
        res.status(200).json({ message: 'Success', data: resy });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Request failed', error: error.toString() });
    }

}
