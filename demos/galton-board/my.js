function peg(x, y) {
    return Matter.Bodies.circle(x, y, 15, {
        isStatic: true,
        restitution: 0.5,
        render: {
            strokStyle: '#ff922b',
            fillStyle: '#ffc078'
        }
    });
}

function bead() {
    return Matter.Bodies.circle(280, 20, 10, {
        restitution: 0.5,
        render: {
            fillStyle: 'purple'
        }
    });
}

function divider(x) {
    return Matter.Bodies.rectangle(x, 700, 20, 460, {
        isStatic: true,
        render: {
            fillStyle: 'green'
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
        background: '#868e96'
    }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// floor
let floor = Matter.Bodies.rectangle(280, 790, 560, 20, {
    isStatic: true,
    render: {
        fillStyle: 'blue'
    }
});
Matter.World.add(engine.world, floor);

// pegs
let isStaggerRow = true;
for (let y = 200; y <= 440; y += 40) {
    for (let x = 0; x <= 560; x += 80) {
        let staggerOffset = isStaggerRow ? 40 : 0;
        Matter.World.add(engine.world, peg(x + staggerOffset, y));
    }
    isStaggerRow = !isStaggerRow;
}

// dividers
for (let x = 0; x <= 560; x += 80) {
    Matter.World.add(engine.world, divider(x));
}

setInterval(dropBead, 250);
