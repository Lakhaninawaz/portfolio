function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true }
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "body" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
}

function cursorEffect() {

  let cursor = document.querySelector('.cursor');
  let cursorScale = document.querySelectorAll('.cursor-scale');
  let mouseX = 0;
  let mouseY = 0;

  gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY,
        }
      })
    }
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 5;
    mouseY = e.clientY - 5;

    // var cursor = document.querySelector(".cursor")
    // var cursorScale = document.querySelectorAll(".cursor-scale")

    // document.addEventListener("mousemove", function (dets) {
    //   gsap.to(cursor, {
    //     left: dets.x - 5+"px",
    //     top: dets.y - 5+"px",
    //     opacity: 1
    //   })


    gsap.to(cursor, {
      opacity: 1,
    })

  })

  document.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      // opacity: 1,
      duration: .5
    })

    cursorScale.forEach(link => {
      link.addEventListener('mouseleave', () => {
        // cursor.classList.remove("grow")
        cursor.innerHTML = ""
        gsap.to(cursor, {
          scale: 1
        })
      });

      link.addEventListener('mouseenter', () => {
        console.log(cursorScale);

        // cursor.classList.add("grow")
        gsap.to(cursor, {
          scale: 7
        })

        if (link.classList.contains('small')) {

          gsap.to(cursor, {
            scale: 2.5
          })
        }

        if (link.classList.contains('project-link')) {
          cursor.innerHTML = "<h5>View</h5>"
        }
      })
    })

  })

  document.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0
    })
  })

}

window.onload = function loaderEffect() {
  const tl = gsap.timeline();
  
    tl.from(".preloader h1", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.4,
      // rotationX:10,
      // transformOrigin: "0% 50% -50",
      ease: "back"
    })
    tl.to(".preloader h1", {
      y: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.4,
      // rotationX:10,
      transformOrigin: "0% 50% -50",
      ease: "back"
    })
    // tl.to(".preloader", {
    //   height: -100 + "vh",
    //   duration: .7
    // })
    
  tl.to(".preloader ", {
    y: -100 + "%"
  })
  
  // const tl = gsap.timeline()

  tl.from(".navbar a", {
    y: -70,
    duration: .4,
    opacity: 0
  })
  .from(".page1 .who, .page1 h1, .page1 .scroll", {
    y: 100,
    duration: 1,
    opacity: 0,
    stagger: 0.3,
    // yoyo: true
  })




  }

function navEffect() {
  var element = document.querySelector(".resume");

  element.addEventListener("mouseenter", function () {
    gsap.to(".resume a", {
      y: -100 + "%",
      opacity: 1
    })
  })

  element.addEventListener("mouseleave", function () {
    gsap.to(".resume a", {
      y: 0 + "%",
    })
  })
}

function page1Animation() {
  gsap.to(".page1 p", {
    y: 30,
    repeat: -1,
    opacity: 0,
    duration: 1.8
  })
}

function page2Animation() {
  gsap.to(".page2 h3", {
    transform: "translateX(-100%)",
    duration: 1,
    scrollTrigger: {
      trigger: ".page2 h3",
      scroller: ".main",
      // markers: true,
      scrub: 0.7
    }
  })

  gsap.from(".page2 .about", {
    opacity: 0,
    width: 50 + "%",
    scrollTrigger: {
      trigger: ".page2 .about",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 65%",
      // scrub: 2
    },
  })

  gsap.from(".page2 .about h2", {
    opacity: 0,
    duration: .5,
    scrollTrigger: {
      trigger: ".page2 .about h2",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 65%",
    },
  })

  gsap.from(".page2 h1", {
    // opacity: 0,
    backgroundPositionX: "100%",
    // color: "gray",
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".page2 h1",
      scroller: ".main",
      // markers: true,
      start: "top 60%",
      end: "top 0%",
      scrub: 1
    },
  })
}

function page3Animation() {
  const left = document.querySelectorAll(".page3 .projectContainer .left")
  const right = document.querySelectorAll(".page3 .projectContainer .right")

  gsap.from(".page3 .portfolio", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".page3 .portfolio",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 65%",
      // scrub: 2
    },
  })

  gsap.from(".page3 .project h1", {
    y: 100,
    opacity: 0,
    duration: .5,
    stagger: .5,
    scrollTrigger: {
      trigger: ".page3 .project",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 65%",
      scrub: 2
    },
  })


  left.forEach(section => {
    // gsap.to(section, {
    //   x: 500,
    //   rotation: 250,
    //   duration: 1,
    //   opacity: 1,
    //   scrollTrigger: {
    //     trigger: section,
    //     end: "-=500",
    //     scrub: true,
    //     toggleActions: "restart none none none",
    //   },
    // });
    gsap.from(section, {
      x: -200,
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        scroller: ".main",
        // markers: true,
        start: "top 75%",
        end: "top 45%",
        scrub: 2
      },
    })
  });

  right.forEach(section => {

    gsap.from(section, {
      x: 200,
      opacity: 0,
      // duration: .5,
      // stagger: .5,
      scrollTrigger: {
        trigger: section,
        scroller: ".main",
        // markers: true,
        start: "top 75%",
        end: "top 45%",
        scrub: 2
      },
    })

  });

}

function page4Animation() {
  gsap.from(".page4 .skill", {
    opacity: 0,
    width: 50 + "%",
    scrollTrigger: {
      trigger: ".page4 .skill",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 60%"
    }
  })

  gsap.from(".page4 .skillImg .img-box ", {
    y: -100,
    opacity: 0,
    scale: 0.9,
    stagger: .5,
    scrollTrigger: {
      trigger: ".page4 .skillImg",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 60%",
      scrub: 2
    }
  })
}
function page5Animation() {
  gsap.from(".page5 .contact", {
    opacity: 0,
    width: 50 + "%",
    scrollTrigger: {
      trigger: ".page5 .contact",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 60%"
    }
  })

  gsap.from(".page5 h1", {
    y: 100,
    opacity: 0,
    stagger: .5,
    scrollTrigger: {
      trigger: ".page5 h1",
      scroller: ".main",
      // markers: true,
      start: "top 80%",
      end: "top 60%",
      scrub: 2
    }
  })

  gsap.from("footer h3", {
    y: -50,
    opacity: 0,
    stagger: .5,
    scrollTrigger: {
      trigger: "footer h3",
      scroller: ".main",
      // markers: true,
      start: "top 100%",
      end: "top 90%",
    }
  })
}

const lerp = (x, y, a) => x * (1 - a) + y * a;

function magneticEffectTag() {
  const tag = document.querySelector(".navbar .logo ");
  const crsr = document.querySelector(".cursor");

  tag.addEventListener("mousemove", (e) => {
    const dim = tag.getBoundingClientRect();
    const xstart = dim.x;
    const xend = dim.x + dim.width;

    const ystart = dim.y;
    const yend = dim.y + dim.height;

    const zeroone = gsap.utils.mapRange(xstart, xend, 0, 1, e.clientX);
    const zerotwo = gsap.utils.mapRange(ystart, yend, 0, 1, e.clientY);

    gsap.to(crsr, {
      scale: 3,
    });
    gsap.to(tag, {
      x: lerp(-20, 20, zeroone),
      y: lerp(-20, 20, zerotwo),
      duration: 0.6,
    });
  });

  tag.addEventListener("mouseleave", () => {
    gsap.to(crsr, {
      scale: 1,
    });
    gsap.to(tag, {
      x: 0,
      y: 0,
      duration: 0.6,
    });
  });
}

magneticEffectTag()
// function hideNavbarOnScroll(){
//     const navbar = document.querySelector("navbar");
//     const sticky = navbar.offsetTop;
//     window.addEventListener('scroll', () => {
//         if (window.pageYOffset > sticky) {
//             navbar.classList.add("sticky")
//           } else {
//           navbar.classList.remove("sticky");
//         }
//       });
//       }
// hideNavbarOnScroll()

init()
cursorEffect()
navEffect()
// loaderEffect()
page1Animation()
page2Animation()
page3Animation()
page4Animation()
page5Animation()