const btnScrollToTop = document.getElementById("btnScrollToTop");
const docEl = document.documentElement;
document.addEventListener("scroll", () => {
  const scrollToTal = docEl.scrollHeight - docEl.scrollHeight;
  if (docEl.scrollTop / scrollToTal >= 0.4) {
    btnScrollToTop.hidden = false;
  } else {
    btnScrollToTop.hidden = true;
  }
});
btnScrollToTop.addEventListener("click", () => {
  docEl.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
