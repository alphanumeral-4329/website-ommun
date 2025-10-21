// ===== HEADER HIDE/REVEAL ON SCROLL =====
let lastScrollTop = 0
const header = document.getElementById("header")

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add("hidden")
      } else {
        header.classList.remove("hidden")
      }

      lastScrollTop = scrollTop
    },
    { passive: true },
  )
}

// ===== SCROLL ANIMATIONS FOR COMMITTEE CARDS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const committeeCards = document.querySelectorAll(".committee-card")
  committeeCards.forEach((card) => {
    observer.observe(card)
  })

  // Add click event listeners to all committee cards
  committeeCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Click animation
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""

        // Get committee from data-committee attribute
        const committee = this.dataset.committee

        // Navigate to the corresponding committee page
        if (committee) {
          window.location.href = `committees/${committee}.html`
        } else {
          console.warn("No data-committee found for this card")
        }
      }, 150)
    })
  })

  const secretariatMembers = document.querySelectorAll(".secretariat-member")
  secretariatMembers.forEach((member) => {
    member.addEventListener("click", function (e) {
      // Prevent navigation if clicking on the existing <a> tag
      const isLink = e.target.closest("a")
      if (isLink) {
        e.preventDefault()
      }

      // Click animation
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""

        // Get member from data-member attribute
        const memberSlug = this.dataset.member

        if (memberSlug) {
          window.location.href = `secretariat/${memberSlug}.html`
        } else {
          console.warn("No data-member found for this card")
        }
      }, 150)
    })

    // Add hover effect for secretariat members
    member.style.cursor = "pointer"
  })

  // Ensure any previous inline transform is cleared on load
  const parallax = document.querySelector(".background-overlay")
  if (parallax) {
    parallax.style.transform = "" // keep background fixed and unmoving
  }

  // ===== ENHANCED HOVER EFFECTS =====
  const committeeImages = document.querySelectorAll(".committee-image")
  committeeImages.forEach((image) => {
    image.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 20px 50px rgba(223, 195, 111, 0.6), 0 0 30px rgba(223, 195, 111, 0.3)"
    })
    image.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 10px 30px rgba(223, 195, 111, 0.2)"
    })
  })

  // ===== LOADING ANIMATION =====
  window.addEventListener("load", () => {
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease-in-out"
    setTimeout(() => {
      document.body.style.opacity = "1"
    }, 100)
  })

// ===== HAMBURGER MENU FUNCTIONALITY (FIXED) =====
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn")
  const mobileNav = document.getElementById("mobile-nav")

  if (!hamburgerBtn || !mobileNav) return

  // Toggle menu open/close
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active")
    mobileNav.classList.toggle("active")
    document.body.classList.toggle("no-scroll") // Use CSS class instead of overflow style
  })

  // Close menu when clicking on nav links (event delegation)
  mobileNav.addEventListener("click", (e) => {
    if (e.target.classList.contains("mobile-nav-link")) {
      hamburgerBtn.classList.remove("active")
      mobileNav.classList.remove("active")
      document.body.classList.remove("no-scroll")
    }
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#mobile-nav") && !e.target.closest("#hamburger-btn")) {
      hamburgerBtn.classList.remove("active")
      mobileNav.classList.remove("active")
      document.body.classList.remove("no-scroll")
    }
  })

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      hamburgerBtn.classList.remove("active")
      mobileNav.classList.remove("active")
      document.body.classList.remove("no-scroll")
    }
  })
})


  // ===== PER-SECOND COUNTDOWN TO OCT 24, 2025 12:00 AM IST (+05:30) =====
  // Prefer locked IDs (cd-d/cd-h/cd-m/cd-s), fallback to legacy (cd-days/cd-hours/cd-minutes/cd-seconds)
  const daysEl = document.getElementById("cd-d") || document.getElementById("cd-days")
  const hoursEl = document.getElementById("cd-h") || document.getElementById("cd-hours")
  const minsEl = document.getElementById("cd-m") || document.getElementById("cd-minutes")
  const secsEl = document.getElementById("cd-s") || document.getElementById("cd-seconds")

  if (daysEl && hoursEl && minsEl && secsEl) {
    // Target: 2025-10-24T00:00:00 IST (UTC+05:30) == 2025-10-23T18:30:00Z
    const TARGET_ISO = "2025-10-24T00:00:00+05:30"
    const target = new Date(TARGET_ISO).getTime()

    const pad = (n) => String(n).padStart(2, "0")
    let interval

    function tick() {
      const now = Date.now()
      let diff = Math.max(0, target - now)

      const sec = 1000
      const min = sec * 60
      const hr = min * 60
      const day = hr * 24

      const d = Math.floor(diff / day)
      diff -= d * day
      const h = Math.floor(diff / hr)
      diff -= h * hr
      const m = Math.floor(diff / min)
      diff -= m * min
      const s = Math.floor(diff / sec)

      daysEl.textContent = pad(d)
      hoursEl.textContent = pad(h)
      minsEl.textContent = pad(m)
      secsEl.textContent = pad(s)

      if (target - now <= 0) {
        const subtitle = document.querySelector(".countdown-subtitle")
        if (subtitle) subtitle.textContent = "Event Started"
        clearInterval(interval)
      }
    }

    tick()
    const startDelay = 1000 - (Date.now() % 1000)
    setTimeout(() => {
      tick()
      interval = setInterval(tick, 1000)
    }, startDelay)
  }
})
