export default async function getToken(perTo) {

    const myHeaders = new Headers();
    myHeaders.append("token", perTo);
    myHeaders.append("versionCode", "187");
    myHeaders.append("android", "30");
    myHeaders.append("device", "Vivo1904");
    myHeaders.append("locale", "IN");
    myHeaders.append("sensors", "{\"accelerometer\":{\"maximumRange\":78.453156,\"name\":\"ACCELEROMETER\",\"power\":0.001,\"resolution\":0.0012,\"type\":1,\"values\":[0.41700003,3.24495,9.280951],\"vendor\":\"MTK\",\"version\":2},\"gyroscope\":{\"maximumRange\":34.906574,\"name\":\"AK09918-pseudo-gyro\",\"power\":0.001,\"resolution\":0.0011,\"type\":4,\"values\":[0.03575,-0.022275,-0.086899996],\"vendor\":\"virtual_gyro\",\"version\":2},\"light\":{\"maximumRange\":65535.0,\"name\":\"LIGHT\",\"power\":0.001,\"resolution\":1.0,\"type\":5,\"values\":[2.3923445,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],\"vendor\":\"MTK\",\"version\":1},\"magnetometer\":{\"maximumRange\":4911.994,\"name\":\"MAGNETOMETER\",\"power\":0.001,\"resolution\":0.15,\"type\":2,\"values\":[-33.787502,-8.15625,-21.112501],\"vendor\":\"MTK\",\"version\":1},\"proximity\":{\"maximumRange\":1.0,\"name\":\"PROXIMITY\",\"power\":0.001,\"resolution\":1.0,\"type\":8,\"values\":[5.0,0.0,0.0],\"vendor\":\"MTK\",\"version\":1}}");
    myHeaders.append("Content-Length", "0");
    myHeaders.append("Host", "tuberocket.app:3000");
    myHeaders.append("Connection", "Keep-Alive");
    myHeaders.append("Accept-Encoding", "gzip");
    myHeaders.append("User-Agent", "okhttp/3.12.0");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch("http://tuberocket.app:3000/api/signIn", requestOptions);
        const resultor = await response.json();
        const token = resultor.result.token
         
        return token;
    } catch (error) {
        console.error(error);
    };

}