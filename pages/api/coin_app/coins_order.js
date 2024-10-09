// /pages/api/video.js 

export default async function getOrder(token) {

    console.log(`--------------------------------------------------------------------------------------------------------\n`)

    const myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Host", "tuberocket.app:3000");
    myHeaders.append("Connection", "Keep-Alive");
    myHeaders.append("Accept-Encoding", "gzip");
    myHeaders.append("User-Agent", "okhttp/3.12.0");

    try {
        const response = await fetch("http://tuberocket.app:3000/api/share-code-coin", {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow"
        });
        const result = await response.json();
        console.log(` retMessage : ${result.retMessage}`)
    } catch (error) {
        console.error(error);
    };

    try {
        const response = await fetch("http://tuberocket.app:3000/api/video", {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        });
        const resulty = await response.json();
        console.log(` retMessage : ${JSON.stringify(resulty.result)}`)

        const videoId = await resulty.result.videoId;
        const sec = await resulty.result.playSecond;
        return { videoId, sec };

    } catch (error) {
        console.error(error);
    };

}