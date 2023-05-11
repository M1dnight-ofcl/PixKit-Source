function detectMobile() {
  const w = window.innerWidth;
  if (w <= 600) {
    console.log("Device is mobile, redirecting")
    window.location.replace("/m");
  } else {
    console.log("Device is desktop, no redirect needed")
  }
}

detectMobile()