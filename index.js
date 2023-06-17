import sharp from "sharp"
import path from "path"
import fs from "fs"
const actions = [
    {short: '#w', name: 'walking', frames: 9, offset: 128*4},
    {short: '#c', name: 'spellcast', frames: 7, offset: 0},
    {short: '#t', name: 'thrust', frames: 8, offset: 64*4},
    {short: '#l', name: 'slash', frames: 6, offset: 192*4},
    {short: '#s', name: 'shoot', frames: 13, offset: 256*4},
    {short: '#h', name: 'hurt', frames: 6, offset: 320*4},
];

function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return btoa( binary );
}
const splitToLineLength = (string) => { 
    var l = string.length, lc = 0, chunks = [], c = 0, chunkSize = 64;
    for (; lc < l; c++) {
      chunks[c] = string.slice(lc, lc += chunkSize);
    }
    return chunks;
}
let allFiles=[];
function getAllFiles(dirPath){
    fs.readdirSync(dirPath).forEach(function(file) {
    let filepath = path.join(dirPath , file);
    let stat= fs.statSync(filepath);
    if (stat.isDirectory()) {            
      getAllFiles(filepath);
    } else {
            allFiles.push(filepath);
          
    }    
});  
}
getAllFiles('./input');
allFiles=allFiles.sort((a,b)=>a.length - b.length);
const policyId= '420acf8d7151fb73a556975cad1a60bf13e91d417be084fe87ef100d'
const tokenNames=[];

for (const tFile of allFiles) { 
    
    const mainDir = String(tFile).substring(6).split(String(tFile).substring(5,6),2)[0];
    
    let typeEmoji='';
    
    switch (mainDir) { 
        case 'accessories':
            typeEmoji='👜'
            break;
        case 'arms':
            typeEmoji='💪'
            break;
        case 'beards':
            typeEmoji='🧔'
            break;
        case 'behind_body':
            typeEmoji='⤴'
            break;
        case 'belt':
            typeEmoji='🥋'
            break;
        case 'body':
            typeEmoji='🧍'
            break;
        case 'cape':
            typeEmoji='🦸'
            break;
        case 'dress':
            typeEmoji='👗'
            break;
        case 'eyes':
            typeEmoji='👀'
            break;
        case 'facial':
            typeEmoji='😃'
            break;
        case 'feet':
            typeEmoji='🦶'
            break;
        case 'gloves':
            typeEmoji='🧤'
            break;
        case 'hair':
            typeEmoji='💇‍♀️'
            break;
        case 'hands':
            typeEmoji='🙌'
            break;
        case 'hat':
            typeEmoji='🎩'
            break;
        case 'head':
            typeEmoji='🤯'
            break;
        case 'legs':
            typeEmoji='🦵'
            break;
        case 'neck':
            typeEmoji='📿'
            break;
        case 'quiver':
            typeEmoji='🏹'
            break;
        case 'shadow':
            typeEmoji='👥'
            break;
        case 'shield':
            typeEmoji='🛡️'
            break;
        case 'shoulders':
            typeEmoji='🤷'
            break;
        case 'tools':
            typeEmoji='🛠️'
            break;
        case 'torso':
            typeEmoji='🧘'
            break;
        case 'weapon':
            typeEmoji='🔫'
            break;
        case 'wrists':
            typeEmoji='✊'
            break;
    }
    console.log(mainDir);
    try { 
        let tImage = sharp(tFile)
        const tMetadata = await tImage.metadata();
        if (tMetadata.width!=832 || tMetadata.height!=1344) { 
            console.log('skipping this one image size wrong:'+tFile);
            continue;
        }
    } catch (e) { 
        console.log(e);
        console.log('skipping this one');
        continue;
    }
    let pathPieces = String(tFile).split(String(tFile).substring(5,6))
    
    pathPieces = pathPieces.map((p)=>p.includes('.png')?p.substring(0,p.length-4):p);
    
    
    let genders = ['female','child','muscular','pregnant','skeleton','teen','zombie','male']
    let gender = pathPieces.filter((p)=>genders.includes(p))[0];
    if (!gender) { 
        for (const piece of pathPieces) {
            for (const tGen of genders) { 
                if (String(piece.toLocaleLowerCase()).includes(tGen)) {gender=tGen; break;}
            }    
            if (gender) break;
        }
    }
    let genderEmoji='';
    let genderShort='';
    if (!gender) { 
        gender='undefined';
    } else { 
        switch (gender) { 
            case 'male':
                genderEmoji='♂️'
                genderShort='m:'
            break;
            case 'female':
                genderEmoji='♀'
                genderShort='f:'
            break;
            case 'child':
                genderEmoji='👶'
                genderShort='c:'
            break;
            case 'muscular':
                genderEmoji='💪'
                genderShort='mu:'
            break;
            case 'pregnant':
                genderEmoji='🤰'
                genderShort='p:'
            break;
            case 'skeleton':
                genderEmoji='💀'
                genderShort='s:'
            break;
            case 'teen':
                genderEmoji='👦'
                genderShort='t:'
            break;
            case 'zombie':
                genderEmoji='🧟'
                genderShort='z:'
            break;
        }
    }

    console.log(gender);

    let fileName = (pathPieces[pathPieces.length-1].substring(0,pathPieces[pathPieces.length-1].length)).toLocaleLowerCase();
    
    let insertTitle = (String(tFile).substring(7+mainDir.length).split(String(tFile).substring(5,6)+gender,2)[0].replace(String(tFile).substring(5,6),' ')).toLocaleLowerCase();
    
    if (insertTitle.includes('.png')) { 
        insertTitle=insertTitle.substring(0,insertTitle.length-4);
    }
    
    if (insertTitle==gender) insertTitle='';
    insertTitle=insertTitle.replace(fileName, '');
    if (insertTitle==' ') inserTitle='';
    if (insertTitle.includes('bodies')) insertTitle=insertTitle.replace('bodies','');
    if (insertTitle.includes('heads')) insertTitle=insertTitle.replace('heads','');
    if (insertTitle==' ') inserTitle='';
    if (insertTitle==fileName) { 
        insertTitle='';
    }
    if (insertTitle.length) { 
        fileName=fileName.replace(insertTitle,'');
        fileName=insertTitle+' '+fileName;
    }
    fileName=fileName.replace(String(tFile).substring(5,6),' ')
    fileName=fileName.replace('  ',' ');
    fileName=fileName.replace(String(tFile).substring(5,6),' ')
    fileName=fileName.replace('  ',' ');
    fileName=fileName.replace(String(tFile).substring(5,6),' ')
    fileName=fileName.replace('  ',' ');
    fileName=fileName.replace(String(tFile).substring(5,6),' ')
    fileName=fileName.replace('  ',' ');
    fileName=fileName.replace(gender,'');
    fileName=fileName.replace(gender,'');
    fileName=fileName.replace(gender,'');
    fileName=fileName.replace("hair_","");
    fileName=fileName.replace('universal','');
    fileName=fileName.replace('universal','');
    fileName=fileName.replace('  ',' ');
    fileName=fileName.replace('  ',' ');
    fileName=fileName.replace(' _',' ');
    fileName=fileName.replace('_ ',' ');
    fileName=fileName.replace('__','_');
    fileName=fileName.replace('__','_');
    fileName=fileName.trim();
    if (fileName.substring(0,1)=="_") { 
        fileName=fileName.substring(1);
    }
    if (fileName.substring(fileName.length-1,fileName.length)=='_') { 
        fileName=fileName.substring(0,fileName.length-1);
    }
    if (fileName.substring(fileName.length-1,fileName.length)=='_') { 
        fileName=fileName.substring(0,fileName.length-1);
    }
    fileName=fileName.trim();
    
    const outputDir = "./output/"+ String(tFile).substring(6)+String(tFile).substring(5,6);
    
    fs.mkdirSync(outputDir, { recursive: true })
    
    const inFile = tFile


let globalTokenName=typeEmoji+genderEmoji+fileName
let globalTokenNameShort=typeEmoji+genderEmoji+(fileName.slice(0,13))
let c=2;
while (tokenNames.includes(globalTokenNameShort)) { 
    globalTokenNameShort=typeEmoji+genderEmoji+(fileName.slice(0,11))+c
    c++;
    if (c>99) {
        console.log('got to 100:'+globalTokenNameShort);
        break;
    }
}
if (tokenNames.includes(globalTokenNameShort)) { 
    console.log('Error token name already taken:'+globalTokenNameShort);
    break;
}
tokenNames.push(globalTokenNameShort);
var globalMetadata = {
    "721": { 
        
    }
};
let globalMetadataImage = "cnft:"+policyId+Buffer.from(globalTokenNameShort).toString('hex')+'/0';
if (globalMetadataImage.length>64) { 
    globalMetadataImage = splitToLineLength(globalMetadataImage);
}
const creditsUrl="https://nft-playground.dev/LPC-credits.csv"


const globalTokenMetadata={
    "name":globalTokenName,
    "image": globalMetadataImage, 
    "credits":creditsUrl,
    "license":"CC-BY-SA-3.0",
    "description":"Cardano Smart Avatars Project",
    "mediaType":"image/png",
    files: []
}
if (gender!="undefined") { 
    globalTokenMetadata.bodyType=gender;
}
const globalFiles=globalTokenMetadata.files;
globalMetadata['721'][policyId]={};
    
var globalMetadataFile = {
    "721": { 

    }
};

globalMetadataFile['721'][policyId]={};
globalMetadata['721'][policyId][globalTokenNameShort]={};
globalMetadata['721'][policyId][globalTokenNameShort]=globalTokenMetadata;
globalMetadataFile['721'][policyId][globalTokenNameShort]=globalTokenMetadata;
for (const action of actions) { 
    //console.log({width: 64*action.frames, height: 64, left: 0, top: action.offset});
    let image = sharp(inFile)
    let thisImage=null;
    let animations={};
    let frames={width: 64, height: 64};
    if (action.name!='hurt') { 
        thisImage = image.extract({width: 64*action.frames, height: 64*4, left: 0, top: action.offset});
        frames.count = action.frames*4;
        animations[action.name+'-north']=[0,action.frames-1];
        animations[action.name+'-west']=[action.frames, (action.frames*2)-1];
        animations[action.name+'-south']=[(action.frames*2), (action.frames*3)-1];
        animations[action.name+'-east']=[(action.frames*3), (action.frames*4)-1];
    } else { 
        thisImage = image.extract({width: 64*action.frames, height: 64, left: 0, top: action.offset});
        frames.count = action.frames;
        animations.hurt = [0, action.frames-1]
    }
    thisImage.png({palette:true, effort:10, compressionLevel: 9})
    var buffer = await thisImage.toBuffer();    
    var imageUrl = "data:image/png;base64,"+arrayBufferToBase64(buffer);
    
    let tokenName=typeEmoji+genderEmoji+fileName+" 🎬"+action.name
    let tokenNameShort = typeEmoji+genderShort+(fileName.slice(0,15))+""+action.short
    c=2;
    while (tokenNames.includes(tokenNameShort)) { 
        tokenNameShort=typeEmoji+genderShort+(fileName.slice(0,13))+c+""+action.short
        c++;
        if (c>99) {
            console.log('got to 100:'+tokenNameShort );
            break;
        }
    }
    tokenNames.push(tokenNameShort);
    if (tokenName.length>64) { 
        console.log('Token name too long: '+tokenName);
        continue;
        
    }
    let metadataImageURL = "cnft:"+policyId+Buffer.from(tokenNameShort).toString('hex')+'/0'
    if (metadataImageURL.length>64) { 
        metadataImageURL = splitToLineLength(metadataImageURL);
    }
    const tokenMetadata = {
        "name":tokenName,
        "image": metadataImageURL, 
        "mediaType":"image/png",
        "credits":creditsUrl,
        "license":"CC-BY-SA-3.0",
        "description":"Cardano Smart Avatars Project",
        "files": [
            {
                "id":"0",
                "src":splitToLineLength(imageUrl),
                "mediaType":"image/png",
                animations,
                frames
            }
        ]
    }
    if (gender!="undefined") { 
        tokenMetadata.bodyType=gender;
    }
    globalFiles.push({
        "id":action.name,
        "src":metadataImageURL,
        "mediaType":"image/png",
        animations,
        frames
    })

    
    var metadata = {
        "721": { 

        }
    };
    
    metadata['721'][policyId]={};
    globalMetadataFile['721'][policyId][tokenNameShort]=tokenMetadata;
    //metadata['721'][policyId][tokenName]={};
    metadata['721'][policyId][tokenNameShort]=tokenMetadata;
    //console.log(metadata);
    //console.log
    fs.writeFileSync(outputDir+(Buffer.from(tokenNameShort).toString('hex'))+".json",JSON.stringify(metadata,null,"\t"));
    var easelImport = { animations, frames, images:[imageUrl]}

    fs.writeFileSync(outputDir+action.name+"-test.html", `
        <html>
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/EaselJS/1.0.2/easeljs.min.js" integrity="sha512-LFVrDRb8AtfnlgyB/CDam6ESv7P88EdiUApUYYOv8T7/RT5M05ogumlzPegCPqHk/SqeBjW/0F/FbbyBenCkKg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            </head>
            <body style="background-color:green">
                
                <canvas id="testCanvas" width="500" height="300" />

                <script>
                var stage = new createjs.Stage(document.getElementById("testCanvas"));
                var spriteSheet = new createjs.SpriteSheet(${JSON.stringify(easelImport)});
                var animationN = new createjs.Sprite(spriteSheet, "${action.name+'-north'}");
                var animationS = new createjs.Sprite(spriteSheet, "${action.name+'-south'}");
                var animationW = new createjs.Sprite(spriteSheet, "${action.name+'-west'}");
                var animationE = new createjs.Sprite(spriteSheet, "${action.name+'-east'}");
                animationS.x=0;
                animationS.y=0;
                animationS.scale=2;
                animationS.framerate=7;
                animationN.x=128;
                animationN.y=0;
                animationN.scale=2;
                animationN.framerate=7;
                animationW.x=256;
                animationW.y=0;
                animationW.scale=2;
                animationW.framerate=7;
                animationE.x=384;
                animationE.y=0;
                animationE.framerate=7;
                animationE.scale=2;
                stage.addChild(animationN);
                stage.addChild(animationS);
                stage.addChild(animationW);
                stage.addChild(animationE);
                createjs.Ticker.timingMode = createjs.Ticker.RAF;
                createjs.Ticker.addEventListener("tick", stage);
                </script>
            </body>
            </html>
    `+JSON.stringify({frames, animations}));
    
    
}

fs.writeFileSync(outputDir+(Buffer.from(globalTokenNameShort).toString('hex'))+".json",JSON.stringify(globalMetadata,null,"\t"));
const globalOnlyMetadataFile = {"721":{}};
globalOnlyMetadataFile["721"][policyId]={}
globalOnlyMetadataFile["721"][policyId][globalTokenNameShort]=globalMetadataFile["721"][policyId][globalTokenNameShort];
const noGlobalMetadataFile = {...globalMetadataFile};

fs.writeFileSync(outputDir+"all.json",JSON.stringify(globalMetadataFile,null,"\t"));
fs.writeFileSync(outputDir+"all-compressed.json",JSON.stringify(globalMetadataFile));
delete noGlobalMetadataFile["721"][policyId][globalTokenNameShort]
fs.writeFileSync(outputDir+"noglobal-compressed.json",JSON.stringify(noGlobalMetadataFile));
fs.writeFileSync(outputDir+"globalonly-compressed.json",JSON.stringify(globalOnlyMetadataFile));
}
console.log(allFiles);

