// plugins
Matter.use(MatterAttractors);

function throwBall() {
    let ball = Matter.Bodies.circle(-20, 250, 20, {
        render: {
            fillStyle: '#228be6'
        }
    });
    Matter.Body.setVelocity(ball, {x: 10, y: -10});
    Matter.World.add(engine.world, ball);
}

// engine
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;

// render
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 500,
        wireframes: false,
        background: '#f8f9fa'
    }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// big center magnet
Matter.World.add(engine.world, Matter.Bodies.circle(400, 250, 60, {
    isStatic: true,
    plugin: {
        attractors: [
            function (bodyA, bodyB) {
                return {
                    x: (bodyA.position.x - bodyB.position.x) * 0.000005,
                    y: (bodyA.position.y - bodyB.position.y) * 0.000005,
                };
            }
        ]
    },
    render: {
        fillStyle: '#fd7e14'
    }
}));

// add a bunch of balls on a small delay
for (let i = 1; i <= 50; i++) {
    setTimeout(throwBall, i * 250);
}

Matter.World.add(engine.world, Matter.MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(render.canvas),
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
}));
