// 12_tinted_stone_gate.js
// Tinted stones must be MINED, not crafted/farmed. Remove any recipe that
// produces them (notably Create's native Veridium heated-mixing recipe).
// They still CRUSH into raw ore natively (that path is untouched and is the
// only early-game source of iron/copper/gold/zinc).
ServerEvents.recipes(event => {
    const tintedStones = [
        'create:crimsite',
        'create:veridium',
        'create:ochrum',
        'create:asurine'
    ]
    tintedStones.forEach(stone => {
        event.remove({ output: stone })
    })
})
