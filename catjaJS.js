const createElm = (element, parent) => {
	const Element = document.createElement(element);
	const className = {
		class: (className) => {
			Element.classList.add(className);
		},
	};
	document.querySelector(parent).appendChild(Element);
	return className;
};

const selectElm = (selector) => {
	const self = {
		element: document.querySelector(selector),
		target: () => self.element,
		event: (event, callback) => {
			self.element.addEventListener(event, callback);
		},
		append: (element) => {
			self.element.appendChild(element);
		},
		setAttr: (attr, value) => {
			self.element.setAttribute(attr, value);
		},
		hide: () => {
			self.element.style.display = "none";
		},
		alt: (altText) => {
			self.element.alt = altText;
		},
		src: (srcText) => {
			self.element.src = srcText;
		},
		text: (text) => {
			self.element.innerText = text;
		},
		popup: (place) => {
			function scrollAppear() {
				const popupElement = self.element;
				popupElement.classList.add("popup");
				const introPosistion = popupElement.getBoundingClientRect().top;
				const screenPosistion = window.innerHeight / place;
				if (introPosistion < screenPosistion) {
					popupElement.classList.add("popup-appear");
				}
			}

			window.addEventListener("scroll", scrollAppear);
		},
		typeEffect: (time, text) => {
			let texts = text.split(" ");
			let count = 0;
			let index = 0;
			let currentText = "";
			let letter = "";

			(function type() {
				if (count === texts.length) {
					count = 0;
				}
				currentText = texts[count];
				letter = currentText.slice(0, ++index);

				document.querySelector(selector).textContent = letter;
				if (letter.length === currentText.length) {
					count++;
					index = 0;
				}
				setTimeout(type, time * 1000);
			})();
		},
		rainbowImg: (time) => {
			self.element.addEventListener("mouseover", () => {
				self.element.classList.toggle("hoverMe");
				const picture = document.querySelector(".hoverMe");
				picture.style.animation = `color-rotate ${time}`;
				picture.style.animationIterationCount = `infinite`;
				picture.style.animationDirection = `alternate`;
			});
			self.element.addEventListener("mouseout", () => {
				const picture = document.querySelector(".hoverMe");
				picture.style.animation = ``;
				self.element.classList.toggle("hoverMe");
			});
		},
		search: (searchParent) => {
			const searchChilds = document.querySelector(searchParent).children;
			const searchBar = self.element;
			for (let i = 0; i < searchChilds.length; i++) {
				searchChilds[i].classList.add("hideSlideShowImg");
			}
			searchBar.addEventListener("keyup", (e) => {
				e.preventDefault();
				let value = searchBar.value.toLowerCase();
				for (let i = 0; i < searchChilds.length; i++) {
					let child = searchChilds[i];
					let childValue = child.innerText.toLowerCase();
					if (childValue.includes(value)) {
						if (!child.classList.contains("show") && value != "") {
							child.classList.remove("hideSlideShowImg");
							child.classList.add("show");
						}
					} else if (!childValue.includes(value)) {
						child.classList.remove("show");
						child.classList.add("hideSlideShowImg");
					}
					if (value == "") {
						child.classList.remove("show");
						child.classList.add("hideSlideShowImg");
					}
				}
			});
		},
	};
	return self;
};

const setStorage = (property, value) => {
	localStorage.setItem(property, value);
};

const getStorage = (property) => {
	const storage = localStorage.getItem(property);
	console.log("storage:", storage);
};

const chromeCast = (src, castBtn) => {
	const script1 = document.createElement("script");
	script1.src =
		"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
	document.head.appendChild(script1);
	const script2 = document.createElement("script");
	script2.src =
		"https://www.gstatic.com/cast/sdk/libs/receiver/2.0.0/cast_receiver.js";
	document.head.appendChild(script2);

	var session = null;

	window.onload = function () {
		const loadCastInterval = this.setInterval(function () {
			if (chrome.cast.isAvailable) {
				clearInterval(loadCastInterval);
				initializeCastApi();
			} else {
			}
		}, 1000);
	};

	function initializeCastApi() {
		const applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
		const sessionRequest = new chrome.cast.SessionRequest(applicationID);
		const apiConfig = new chrome.cast.ApiConfig(
			sessionRequest,
			sessionListener,
			receiverListener
		);
		chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
	}

	function sessionListener(e) {
		session = e;
		if (session.media.length != 0) {
		}
	}

	function receiverListener(e) {
		if (e === "available") {
		} else {
		}
	}

	function onInitSuccess() {}
	function onInitError() {}

	document.querySelector(castBtn).addEventListener("click", (e) => {
		e.preventDefault();
		launchApp();
	});

	function launchApp() {
		chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
	}

	function onRequestSessionSuccess(e) {
		session = e;
	}

	function onLaunchError() {}

	function onRequestSessionSuccess(e) {
		session = e;
		loadMedia();
	}

	function loadMedia() {
		if (!session) {
			return;
		}

		const mediaInfo = new chrome.cast.media.MediaInfo(src);
		mediaInfo.contentType = "video/mp4";

		const request = new chrome.cast.media.LoadRequest(mediaInfo);
		request.autoplay = true;

		session.loadMedia(request, onLoadSuccess, onLoadError);
	}

	function onLoadSuccess() {}

	function onLoadError(err) {}

	function stopApp() {
		const status = chrome.cast.requestSession.STOPPED;
		session.stop(onRequestSessionSuccess, onLaunchError);
	}
};

const lazy = (selector) => {
	const images = document.querySelectorAll(selector);
	images.forEach((img) => {
		img.setAttribute("loading", "lazy");
		img.classList.add("lazyload");
		img.classList.add("lazyLoadingImage");
	});
	if ("loading" in HTMLImageElement.prototype) {
		images.forEach((img) => {
			img.src = img.dataset.src;
			img.removeAttribute("data-src");
		});
	} else {
		const script = document.createElement("script");
		script.src =
			"https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js";
		document.body.appendChild(script);
	}
};

const slideShow = (selector, seconds) => {
	const time = seconds * 1000;
	const images = document.querySelectorAll(`${selector} img`);
	const element = document.querySelector(selector);
	element.classList.add("slideShowContainer");
	images.forEach((img) => {
		img.style.cssText = `animation: slideShow ${seconds}s;`;
		img.classList.remove("showSlideShowImg");
		img.classList.add("hideSlideShowImg");
	});
	images[0].classList.remove("hideSlideShowImg");
	images[0].classList.add("showSlideShowImg");
	let counter = 0;
	const slide = () => {
		if (counter == images.length) {
			counter = 0;
			images[images.length - 1].classList.remove("showSlideShowImg");
			images[images.length - 1].classList.add("hideSlideShowImg");
			images[counter].classList.remove("hideSlideShowImg");
			images[counter].classList.add("showSlideShowImg");
		}
		if (counter > 0) {
			images[counter - 1].classList.remove("showSlideShowImg");
			images[counter - 1].classList.add("hideSlideShowImg");
			images[counter].classList.remove("hideSlideShowImg");
			images[counter].classList.add("showSlideShowImg");
		}
		counter++;
		setTimeout(slide, time);
	};
	slide();
};
