import { world } from "@minecraft/server";
import { ChestFormData } from './extensions/forms.js';

world.afterEvents.itemUse.subscribe(({ source: player, itemStack: item }) => {
    if (item.typeId === 'minecraft:diamond') return ChestForm(player)
})

function ChestForm(player) {
    new ChestFormData('single')
    .title('Select a block')
    .button(13, '§a§lChest', ['§7Click to open a chest§r'], 'minecraft:dirt', 1, false, (player) => {
        player.sendMessage('§aOpening chest...')
    })
    .button(14, '§a§lFurnace', ['§7Click to open a furnace§r'], 'minecraft:dirt', 1, false, (player) => {
        player.sendMessage('§aOpening furnace...')
    })
    .pattern([0, 0], [
        '#########', 
        '####__###',
         '#########'], {
        '#': {
            iconPath: 'minecraft:glass',
            stackAmount: 1,
            itemName: '§a§lGlass',
            itemDesc: ['§7Click to open a chest§r'],
            callback: (player) => {
                player.sendMessage('§aOpening chest...')
            }
        }
    })
    .show(player, true)
}
