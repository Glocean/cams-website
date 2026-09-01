import axios from "axios";

// function for fetching the steam banner url
function getBannerUrl(data) {
    var banner;
    //console.log(data);
    
    // if there's a steam id, then fetch the banner image from steam
    if(data.steamId != null && data.steamId != ""){
        if(data.banner_hash != null && data.banner_hash != ""){
            var id = data.steamId;
            var hash = data.banner_hash;
            banner = "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/"+id+"/"+hash+"/header.jpg"; 
        }else{
            var id = data.steamId;
            banner = "https://cdn.akamai.steamstatic.com/steam/apps/"+id+"/header.jpg";
        }
    }else{
        // if it's not a steam game, grab the image locally
        var title = data.title.toLowerCase().replace(/ /g,"_").replace(/'/g, '').replace(/:/g, '');
        banner = "/game_assets/banners/"+title+"_banner.png";
    }
    return banner;
}

function getGamePageUrl(data) {
    var gamePage;
    if(data.steamId != null && data.steamId != ""){
        var id = data.steamId;
        var title = data.title.replace(/ /g,"_").replace(/'/g, '');
        gamePage = "https://store.steampowered.com/app/"+id+"/"+title+"/";
    }else{
        var title = data.title.toLowerCase().replace(/ /g,"-").replace(/'/g, '');
        gamePage = "https://store.epicgames.com/en-US/p/"+title;
    }
    return gamePage;
}

function getIconUrl(data) {
    var icon;
    if(data.steamIcon != null && data.steamIcon != ""){
        var id = data.steamId;
        var hash = data.steamIcon;
        icon = "http://media.steampowered.com/steamcommunity/public/images/apps/"+id+"/"+hash+".jpg";
    }else{
        var title = data.title.toLowerCase().replace(/ /g,"_").replace(/'/g, '');
        icon = "/game_assets/icons/"+title+"_icon.png";
    }
    return icon;
}

async function getGames() {
    const request = 'https://sheets.googleapis.com/v4/spreadsheets/1gbykEEXRHrIWTfl6gPrcxXjGZ6BndlAUxWrRcyHIp68/values/A2:L?key='+import.meta.env.VITE_API_KEY
    const { data } = await axios.get(request);
    var input = data.values
    const keys = ["title", "completion", "date", "hours", "genre", "rating", "reccomend", "return", "steamId", "steamIcon", "notes", "banner_hash"];
    var games = input.reduce(function(acc, cur, i) {
        var test = cur.reduce(function(acc, cur, i) {
        acc[keys[i]] = cur;
        return acc;
        }, {});
        acc[i] = test;
        return acc;
    }, []);
    return games;
}

export { getBannerUrl, getGamePageUrl, getIconUrl, getGames };