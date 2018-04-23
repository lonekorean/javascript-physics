function wall(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: '#868e96'
        }
    });
}

// engine
let engine = Matter.Engine.create();

// render
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 600,
        height: 400,
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
    wall(300, 0, 600, 20),   // top
    wall(300, 400, 600, 20), // bottom
    wall(0, 200, 20, 400),   // left
    wall(600, 200, 20, 400), // right
]);

// no chamfer
Matter.World.add(engine.world, Matter.Bodies.rectangle(120, 200, 80, 160, {
    render: {
        fillStyle: '#228be6'
    }
}));

// some chamfer
Matter.World.add(engine.world, Matter.Bodies.rectangle(300, 200, 80, 160, {
    chamfer: { radius: 20 },
    render: {
        fillStyle: '#7950f2'
    }
}));

// much chamfer
Matter.World.add(engine.world, Matter.Bodies.rectangle(480, 200, 80, 160, {
    chamfer: { radius: 40 },
    render: {
        fillStyle: '#e64980'
    }
}));

Matter.World.add(engine.world, Matter.MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(render.canvas),
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
}));
