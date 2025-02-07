document.addEventListener('DOMContentLoaded', function() {

  let isMobile = window.innerWidth <= 820;
  updateNavbarActive();

  /* Setup Custom ParticlesJS */
  particlesJS.load('particles-js', 'assets/particlesjs-config.json');

  window.onresize = function(){
    isMobile = window.innerWidth <= 820;
    updateNavbarPosition();
  }

  window.onscroll = function(e){
    updateNavbarPosition();
    updateNavbarActive();
  };


    document.querySelectorAll("a.quickLink").forEach(i =>{
      i.onclick = function(e){
        e.preventDefault();
        scrollTo(document.querySelector(i.getAttribute("href")));
      }
    });
    function updateNavbarActive(){
      let topOffset = this.scrollY;
      let navbar =  document.querySelector(".navbar");

      let lastSec = null;
      document.querySelectorAll("span.quickLink").forEach(i =>{
        let pos = i.offsetTop;
        if(pos - topOffset < 0)
          lastSec = i;
      });
      navbar.querySelectorAll('a.quickLink').forEach(i =>{
        i.classList.remove("active");
      });

      if(lastSec)
        navbar.querySelector('a[href="#'+lastSec.id+'"]').classList.add("active");
      else
        navbar.querySelector('a[href="#home"]').classList.add("active");

    }

        function updateNavbarPosition(){
          let topOffset = this.scrollY;
          let bodyPos = document.querySelector("#content").offsetTop;
          let navbar =  document.querySelector(".navbar");
          let header =  document.querySelector("header");
          let isStuck = header.classList.contains("stuck");

          if(isMobile && isStuck){
            header.classList.remove("stuck");
            console.log("Mobilizing Navbar");
          }
          else if(!isMobile && bodyPos-topOffset < 42 + navbar.offsetHeight && !isStuck){
            header.classList.add("stuck");
            console.log("Sticking Navbar");
          }
          else if(!isMobile && bodyPos-topOffset > 42 && isStuck){
            header.classList.remove("stuck");
            console.log("Un-Sticking Navbar");
          }
        }
    function scrollTo(e){
      let isStuck = document.querySelector("header").classList.contains("stuck");
      const yCoordinate = e.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -92;

      window.scrollTo({
          top: yCoordinate + yOffset,
          behavior: 'smooth'
      });
    }
});
