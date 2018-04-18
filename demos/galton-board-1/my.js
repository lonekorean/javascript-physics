function wall(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: '#868e96'
        }
    });
}

function peg(x, y) {
    return Matter.Bodies.circle(x, y, 14, {
        isStatic: true,
        render: {
            fillStyle: '#82c91e'
        }
    });
}

function bead() {
    return Matter.Bodies.circle(280, 40, 11, {
        render: {
            fillStyle: '#e64980'
        }
    });
}

function dropBead() {
    Matter.World.add(engine.world, bead());
}

// engine
let engine = Matter.Engine.create();

// render
let render = Matter.Render.create({
    element: document.body,
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

// boundary walls
Matter.World.add(engine.world, [
    wall(280, 0, 560, 20), // top
    wall(280, 800, 560, 20), // bottom
    wall(0, 400, 20, 800), // left
    wall(560, 400, 20, 800), // right
]);

// divider walls
for (let x = 0; x <= 560; x += 80) {
    Matter.World.add(engine.world, wall(x, 610, 20, 360));
}

// pegs
let isStaggerRow = false;
for (let y = 200; y <= 400; y += 40) {
    let startX = isStaggerRow ? 80 : 40;
    for (let x = startX; x <= 520; x+= 80) {
        Matter.World.add(engine.world, peg(x, y));
    }
    isStaggerRow = !isStaggerRow;
}

// beads
setInterval(dropBead, 2000);
