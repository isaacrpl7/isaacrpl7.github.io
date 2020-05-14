const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelectorAll('.cardlink');
for(let i = 0;i<ball.length;i++) {
    const divStyler = styler(ball[i]);
    const ballXY = value({ x: 0, y: 0 }, divStyler.set);

    listen(ball[i], 'mousedown touchstart')
    .start((e) => {
        e.preventDefault();
        pointer(ballXY.get()).start(ballXY);
    });

    listen(document, 'mouseup touchend')
    .start(() => {
        spring({
        from: ballXY.get(),
        velocity: ballXY.getVelocity(),
        to: { x: 0, y: 0 },
        stiffness: 200,
        // mass: 1,
        // damping: 10
        }).start(ballXY);
    });
}