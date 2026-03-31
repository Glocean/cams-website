// function for fetching the steam banner url
function getBannerUrl(data) {
    var banner;
    
    // if there's a steam id, then fetch the banner image from steam
    if(data.steamId != null && data.steamId != ""){
        var id = data.steamId;
        banner = "https://cdn.akamai.steamstatic.com/steam/apps/"+id+"/header.jpg";
    }else{
        // if it's not a steam game, grab the image locally
        var title = data.title.toLowerCase().replace(/ /g,"_").replace(/'/g, '');
        banner = "/game_assets/banners/"+title+"_banner.png";
    }
    return banner;
}

export { getBannerUrl };