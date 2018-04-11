function wall(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: '#868e96'
        }
    });
}

function peg(x, y) {
    return Matter.Bodies.circle(x, y, 15, {
        label: 'peg',
        isStatic: true,
        restitution: 0.5,
        render: {
            fillStyle: '#82c91e'
        }
    });
}

function bead() {
    return Matter.Bodies.circle(280, 40, 10, {
        restitution: 0.5,
        render: {
            fillStyle: '#e64980'
        }
    });
}

function dropBead() {
    let droppedBead = bead();

    // add some "real world" randomness
    Matter.Body.setVelocity(droppedBead, {
        x: rand(-0.05, 0.05),
        y: 0
    });
    Matter.Body.setAngularVelocity(droppedBead, rand(-0.05, 0.05));

    Matter.World.add(engine.world, droppedBead);
}

function lightPeg(event) {
    event.pairs
        .filter((pair) => pair.bodyA.label === 'peg')
        .forEach((pair) => {
            pair.bodyA.render.fillStyle = '#4c6ef5';
        });
}

// matter.js has a built in random range function, but it is deterministic
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// engine
let engine = Matter.Engine.create();

// render
let render = Matter.Render.create({
    element: document.getElementById('matter'),
    engine: engine,
    options: {
        width: 560,
        height: 800,
        wireframes: false,
        background: '#f8f9fa'
    }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// boundaries
Matter.World.add(engine.world, [
    wall(280, 0, 560, 20), // top
    wall(280, 800, 560, 20), // bottom
    wall(0, 400, 20, 800), // left
    wall(560, 400, 20, 800), // right
]);

// pegs
let isStaggerRow = false;
for (let y = 200; y <= 400; y += 40) {
    let startX = isStaggerRow ? 80 : 40;
    for (let x = startX; x <= 520; x+= 80) {
        Matter.World.add(engine.world, peg(x, y));
    }
    isStaggerRow = !isStaggerRow;
}

// dividers
for (let x = 0; x <= 560; x += 80) {
    Matter.World.add(engine.world, wall(x, 610, 20, 360));
}

// events
Matter.Events.on(engine, 'collisionStart', lightPeg);

// start
setInterval(dropBead, 250);
