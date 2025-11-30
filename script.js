const words = ["Frontend Developer", "Backend Developer", "UI Designer"];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const textElement = document.getElementById("changingText");

function typeWriter() {
  const currentWord = words[currentWordIndex];

  if (isDeleting) {
    // Remove characters
    textElement.innerHTML =
      currentWord.substring(0, currentCharIndex - 1) +
      '<span class="cursor">|</span>';
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }
  } else {
    // Add characters
    textElement.innerHTML =
      currentWord.substring(0, currentCharIndex + 1) +
      '<span class="cursor">|</span>';
    currentCharIndex++;

    if (currentCharIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000); // Pause when word is complete
      return;
    }
  }

  // Speed: faster when deleting, slower when typing
  const speed = isDeleting ? 50 : 100;
  setTimeout(typeWriter, speed);
}

// Start the animation
typeWriter();

const toggleProject = (id, event) => {
  if (event.target.tagName === "A" || event.target.closest("a")) {
    return; // Exit early, don't toggle
  }
  const techStack = document.getElementById(id);
  techStack.classList.toggle("visible");
};

const contactForm = document.querySelector(".contact-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("user-email");
const messageInput = document.getElementById("user-message");
const sendBtn = document.querySelector(".btn");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendBtn.textContent = "Sending...";
  sendBtn.disabled = true;

  emailjs
    .send("service_gjupcy4", "template_apyumdj", {
      from_name: nameInput.value,
      from_email: emailInput.value,
      message: messageInput.value,
    })
    .then(
      function () {
        sendBtn.textContent = "Sent";
        sendBtn.classList.add("success");
        contactForm.reset();

        setTimeout(() => {
          sendBtn.textContent = "Send";
          sendBtn.classList.remove("success");
          sendBtn.disabled = false;
        }, 3000);
      },
      function () {
        sendBtn.textContent = "Failed";
        sendBtn.classList.add("error");

        setTimeout(() => {
          sendBtn.textContent = "Send";
          sendBtn.classList.remove("error");
          sendBtn.disabled = false;
        }, 3000);
      }
    );
});
