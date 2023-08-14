document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.4;
canvas.height = window.innerHeight * 0.6;

// Rest of your JavaScript code remains the same...

let animationFrameId;
let animating = true;

let position = 0;
let velocity = 0;
const acceleration = 0.1;
const mass = 1;
const gravity = 9.81;
let potentialEnergy = 0;
let kineticEnergy = 0;

let angle = Math.PI / 4;
let angularVelocity = 0;
const pendulumLength = 200;

const angleSlider = document.getElementById("angle-slider");
const animateButton = document.getElementById("animate-button");
const potentialEnergyButton = document.getElementById("potential-energy-button");
const kineticEnergyButton = document.getElementById("kinetic-energy-button");


const physicsConcepts = [
  {
    title: "Gravitational Potential Energy",
    description:
      "As the pendulum is lifted to one side, it gains potential energy due to its height above the lowest point of its swing. This energy is converted into kinetic energy as the pendulum moves.",
  },
  {
    title: "Simple Harmonic Motion",
    description:
      "The motion of the pendulum exhibits simple harmonic motion, a repetitive back-and-forth oscillation that follows a sinusoidal pattern. The restoring force acting on the pendulum bob is proportional to its angular displacement from the equilibrium position.",
  },
  // Add more physics concepts here
];
const toggleBtn = document.getElementById('toggleBtn');
const conceptList = document.getElementById('concept-list');

toggleBtn.addEventListener('click', function() {
  conceptList.classList.toggle('visible');
});

function updatePhysics() {
  velocity += acceleration;
  position += velocity;
  angularVelocity += (gravity / pendulumLength) * Math.sin(angle);
  angle += angularVelocity;

  potentialEnergy = mass * gravity * (canvas.height - position);
  kineticEnergy = 0.5 * mass * velocity * velocity;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPotentialEnergyAnimation() {
  const maxEnergy = 100;
  const barWidth = 20;
  const barHeight = (potentialEnergy / maxEnergy) * canvas.height * 0.6;
  const barX = canvas.width - 50;
  const barY = canvas.height - barHeight;

  ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
  ctx.fillRect(barX, barY, barWidth, barHeight);

  ctx.font = "14px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText("Potential Energy", barX + barWidth / 2, canvas.height - 10);
}

function drawKineticEnergyAnimation() {
  const maxEnergy = 100;
  const circleRadius = (kineticEnergy / maxEnergy) * 50;
  const circleX = canvas.width / 2;
  const circleY = canvas.height - 50;

  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 128, 0, 0.7)";
  ctx.fill();

  ctx.font = "14px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText("Kinetic Energy", circleX, circleY + circleRadius + 20);
}

function drawSHMAnimation() {
  const pivotX = canvas.width / 2;
  const pivotY = 100;
  const bobX = pivotX + pendulumLength * Math.sin(angle);
  const bobY = pivotY + pendulumLength * Math.cos(angle);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(bobX, bobY);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function updateConceptList() {
  conceptList.innerHTML = "";
  physicsConcepts.forEach((concept) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${concept.title}</strong>: ${concept.description}`;
    conceptList.appendChild(li);
  });
}

function animate() {
  clearCanvas();
  updatePhysics();
  drawSHMAnimation();

  if (animating) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

angleSlider.addEventListener("input", () => {
  angle = (angleSlider.value / 180) * Math.PI;
});

animateButton.addEventListener("click", () => {
  animating = !animating;
  if (animating) {
    animateButton.textContent = "Stop Animation";
    animate();
  } else {
    animateButton.textContent = "Start Animation";
    cancelAnimationFrame(animationFrameId);
  }
});

potentialEnergyButton.addEventListener("click", () => {
  drawPotentialEnergyAnimation();
});

kineticEnergyButton.addEventListener("click", () => {
  drawKineticEnergyAnimation();
});


updateConceptList();
animate();