const viewportWidth = document.documentElement.clientWidth;
const viewportHeight = document.documentElement.clientHeight;

// engine
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;

// render
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: viewportWidth,
        height: viewportHeight,
        wireframes: false,
        background: '#f8f9fa'
    }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

let bodies = [];
for (let i = 0; i <= 100; i++) {
    bodies.push(Matter.Bodies.circle(viewportWidth / 2, viewportHeight / 2, 30, {
        render: {
            fillStyle: '#228be6'
        }
    }));
}
Matter.World.add(engine.world, bodies);

document.addEventListener('scroll', onScroll);

// matter.js has a built in random range function, but it is deterministic
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function onScroll(event) {
    bodies.forEach((body) => {
        Matter.Body.setVelocity(body, { x: 0, y: rand(-5, -1)});
    });
}
