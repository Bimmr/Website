document.addEventListener('DOMContentLoaded', function() {
  let isMobile = window.innerWidth <= 820;

    window.onresize = function(){
      isMobile = window.innerWidth <= 820;
      updateNavbar();
    }

    /* Setup Custom ParticlesJS */
    particlesJS.load('particles-js', 'assets/particlesjs-config.json');

    window.onscroll = function(e){
      updateNavbar();
    };

    function updateNavbar(){
      let topOffset = this.scrollY;
      let bodyPos = document.querySelector(".container").offsetTop;
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
    document.querySelectorAll("a.quickLink").forEach(i =>{
      i.onclick = function(e){
        e.preventDefault();
        scrollTo(document.querySelector(i.getAttribute("href")));
      }
    });

    function scrollTo(e){
      const yCoordinate = e.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = isMobile ? -110 : -260;

      window.scrollTo({
          top: yCoordinate + yOffset,
          behavior: 'smooth'
      });
    }
});
