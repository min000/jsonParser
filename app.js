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
    // 1. key
    // for(let centerKey in data){
    //     // PlaceSummary:placeid 형식이라 구분지음
    //     if(centerKey.startsWith(placeID)){
    //         placeData.push(`{${centerKey}}`);
    //     }
    // }
    // 2. key, value
    // for (const [key, value] of Object.entries(data)) {
    //     // placeID만 추출
    //     if(key.startsWith(placeID)){
    //          placeData.push(key,value);
    //     }
    // }  


    // 헬스장 데이터 추출
    for (const [key, value] of Object.entries(data)) {
        // placeID만 추출
        if(key.startsWith(placeID)){
            let data = new Object();
            
            data.id = value.id;
            data.name = value.name;
            data.type1 = value.category;
            data.type2 = ""; 

            if(data.name.indexOf("크로스핏") != -1){
                data.type2 = "크로스핏";
            }else if(data.name.indexOf("PT") != -1 || data.name.indexOf("퍼스널트레이닝") != -1){
                data.type2 = "PT샵";
            }else if(data.name.indexOf("점핑") != -1){
                data.type2 = "점핑";
            }
             placeData.push(data);
        }
    }  
}
// 배열내 객체id로 중복제거
const resultData = placeData.filter((v, idx, arr)=>{
    return arr.findIndex((item) => item.id === v.id) === idx
});

// 단순배열 중복제거
// const DedupData = new Set(placeData);
// const resultData = [...DedupData];

const resultJSON = JSON.stringify(resultData);
fs.writeFileSync('data/result.json',resultJSON);
