let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const bass = {
  letters: "BASS".split(""),
  colors: [0xFF7F50, 0xFF4500, 0xFFD700],
  styleOptions: {
    fontFamily: "Josefin Slab",
    fontSize: 35,
    letterSpacing: 50
  }
}

let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}
const renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight, {
  antialias: false,
  transparent: true,
  resolution: 1
});
renderer.view.style.position = "absolute";
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();
const canvas = document.getElementsByTagName("canvas");

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
  event = event || window.event;
}

canvas[0].addEventListener("click", () => {
  let newText = new PIXI.Container();
  bass.letters.forEach((letter, i) => {
    let letterSprite = new PIXI.Text(letter, bass.styleOptions);
    letterSprite.position.set(event.pageX - 60 + i * 20, event.pageY - 20);
    letterSprite.style.fill = bass.colors[Math.floor(Math.random() * bass.colors.length)];
    newText.addChild(letterSprite);
    newText.vx = 0;
    newText.vy = i * 0.5;
  });
  stage.addChild(newText);
});

renderer.render(stage);

const animate = () => {
  requestAnimationFrame(animate);
  stage.children.forEach(el => {
    el.vy += Math.random() / 3;
    el.y += el.vy;
  });
  renderer.render(stage);
};
animate();
