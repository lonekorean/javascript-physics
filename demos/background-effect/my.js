// plugins
Matter.use(MatterWrap);

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
for (let i = 0; i <= 20; i++) {
    let x = rand(0, viewportWidth);
    let y = rand(0, viewportHeight);
    bodies.push(Matter.Bodies.circle(x, y, 80, {
        plugin: {
            wrap: {
                min: { x: 0, y: 0 },
                max: { x: viewportWidth, y: viewportHeight }
            }
        },
        render: {
            fillStyle: '#dee2e6'
        }
    }));
}
Matter.World.add(engine.world, bodies);

// matter.js has a built in random range function, but it is deterministic
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

window.addEventListener('scroll', onScrollThrottled);

let lastScrollPos = 0;
let currentScrollDelta = 0;
let scrollTimeout = null;

function onScrollThrottled() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(onScroll, 50);
    }
}

function onScroll(event) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;

    let direction = lastScrollPos > document.documentElement.scrollTop ? 1 : -1;
    bodies.forEach((body) => {
        Matter.Body.setVelocity(body, { x: rand(-0.5, 0.5), y: direction * rand(2, 10) });
    });

    lastScrollPos = document.documentElement.scrollTop;
}
