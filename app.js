const fs = require('fs');

// 파일읽기
const dataBuffer = fs.readFileSync('data/data.json');
const dataJSON = dataBuffer.toString();
const datas = JSON.parse(dataJSON);

let placeID="PlaceSummary:";

// 파일쓰기
var placeData = [];

console.log("done!");
// 역별로 데이터 추출
for (const index in datas){
    let data = datas[index];
    // 헬스장별 데이터 추출
    //key
    for(let centerKey in data){
        // PlaceSummary:placeid 형식이라 구분지음
        if(centerKey.startsWith(placeID)){
            placeData.push(`{${centerKey}}`);
        }
    }
    //key, value
    // for (const [key, value] of Object.entries(data)) {
    //     // placeID만 추출
    //     if(key.startsWith(placeID)){
    //         placeData.push(key,value);
    //     }
    // }  
}

// 중복제거
const DedupData = new Set(placeData);
const resultData = [...DedupData];

var resultJSON = JSON.stringify(resultData);
fs.writeFileSync('data/result.json',resultJSON);
