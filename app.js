selectElm("h1").text("Ohh boy, This a nice h1 text");

selectElm("h1").setAttr("class", "Cola");

selectElm("figure").event("click", (e) => {
	alert("Event");
});

slideShow("figure", 2);

lazy(".pictureContainer img");

chromeCast(
	"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
	".castBtn"
);

selectElm(".image").rainbowImg(".5s");

createElm("img", "body").class("image");

selectElm(".image").src("https://picsum.photos/500?random=1");

selectElm(".image").alt("Picture");

setStorage("lastname", "Thygesen");

getStorage("lastname");

selectElm(".WTF").typeEffect(1, "Type Effect");

selectElm(".image").popup(1);

selectElm(".searchBar").search(".values");
