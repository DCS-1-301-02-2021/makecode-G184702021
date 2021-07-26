scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . 8 7 7 7 7 . . . . . .
    . . . . . 8 8 7 7 7 7 7 . . . .
    . . . . . 1 8 7 7 7 7 7 . . . .
    . . . . 2 1 8 . . . . . . . . .
    . . . . 2 1 8 . . . . . . . . .
    . . 2 2 2 1 8 . . . . . . . . .
    . . 2 2 1 1 2 2 2 2 2 . . . . .
    4 2 2 5 5 1 1 1 1 1 2 f f f . .
    4 2 2 5 5 8 8 8 8 8 2 2 2 2 2 2
    4 2 2 5 5 1 1 1 1 1 2 f f f . .
    . . 2 2 1 1 8 2 2 2 2 . . . . .
    . . 2 2 2 1 8 . . . . . . . . .
    . . . . 2 1 8 . . . . . . . . .
    . . . . 2 1 8 7 7 7 . . . . . .
    . . . . . 8 8 7 7 7 7 7 . . . .
    . . . . . 8 7 7 7 7 7 7 . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressde() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . 3 . .
            . . . . . . . . . . . . . . 3 .
            e 9 6 8 2 3 5 9 b a f 3 3 3 3 3
            . . . . . . . . . . . . . . 3 .
            . . . . . . . . . . . . . 3 . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(assets.image`bogy`, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
