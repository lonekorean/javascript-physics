// engine
let engine = Matter.Engine.create();

// render
let render = Matter.Render.create({
    element: document.body,
    engine: engine
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// draw
let ball = Matter.Bodies.circle(400, 100, 50);
Matter.World.add(engine.world, ball);
