//这两个函数干嘛用的
//gen html
function genBilibiliFrame(aid, cid, width, height, divid) {
  var f =
    '<iframe src="https://player.bilibili.com/player.html?aid=' +
    aid +
    "&cid=" +
    cid +
    '" width="' +
    width +
    '" height="' +
    height +
    '" frameborder="0" ' +
    "webkitallowfullscreen " +
    "mozallowfullscreen " +
    "allowfullscreen=\"true\">" +
    "</iframe>";
  return f;
}

//get video cid
function genBiliVideo(aid, width, height, divid) {
  $.get(
    "https://cors-anywhere.herokuapp.com/www.bilibili.com/video/av" + aid,
    function(data) {
      let d = data.match(/cid=\d+/)[0].match(/\d+/)[0];
      console.log(d);
      let frame = genBilibiliFrame(aid, d, width, height);
      console.log(frame);
      divid.className = "bilibilivideo";
      divid.innerHTML = frame;
    }
  );
}
