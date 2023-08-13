# Chest-UI

A Minecraft: Bedrock Script API pack that alters the Action Form UI to look & function like a chest does.

![image_1](https://github.com/Herobrine643928/Chest-UI/assets/94234093/e8959623-7806-430d-b35c-184f4818e914)

![image_2](https://github.com/Herobrine643928/Chest-UI/assets/94234093/2ae6b3d8-535e-4164-8073-cabd92ac3d11)

![image_3](https://github.com/Herobrine643928/Chest-UI/assets/94234093/474ad660-d4f8-4280-9403-d1920efada77)

# Benefits

- As fast as vanilla forms
- Java-style UIs
- Cursor-following hover text
- Easy to read
- Good for large numbers of buttons
- Supports enchanted items and isometric blocks

**For Pack's additional features/add-ons, visit the `additional-features` branch.**

Note that the inventory section of the form is simply for display, and does not reflect the actual player's inventory. Hopefully coming soon!

Also note that custom UI retextures will not affect these UIs, as they are controlled by `RP/textures/ui/generic_27.png` & `RP/textures/ui/generic_54.png`.

# Usage
Import into file- this example will work for any top-level file. Changes will be needed for nested files.
```js
import { ChestFormData } from './extensions/forms.js';
```

Create a new chest form, like you would for any other form UI. The size can be left out, and will default to `'small'`.
```js
const form = new ChestFormData()
```

Add a name to the UI, to display at the top.
```js
form.title('Form Title')
```
Add buttons!
```js
form.button(0, 'Button Name', ['Button Lore'], 'minecraft:diamond', 10)
form.button(2, 'Button Name', ['Button Lore'], 'textures/items/my_custom_item', 6)
```
The parameters for the button are as follows:
1. Location. The slot that the item will display in, starting from zero. Max of 26 for a small chest, or 53 for a large.
2. Name. The name of the button.
3. Lore. An array of strings which will display below the item's name.
4. Texture. Item/block type id or path to the texture. Can be used like `minecraft:cake` or `minecraft:acacia_log` (A namespace of `minecraft:` will be assumed if not specified). For custom textures, specify the path of the texture (Must include `textures/` at the start of the path)
5. Stack size. This is an optional parameter, and will default to 1. Displays a small number in the lower right-hand corner- useful for shops selling multiple of an item at once!
6. Enchanted. This is an optional parameter, and will default to false. Displays the enchant glint effect on the item/block rendered if using the type id. This parameter will not work if using a custom textures path (`textures/...`)

Show it to the player & get a response
```js
form.show(player).then(response)
```

Example usage: [`index.js`](https://github.com/Herobrine643928/Chest-UI/blob/main/BP/scripts/index.js).

Find all item/block type ids [here](https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/examples/addonitems).

All item images & semi-referenced ids can be found [here](https://imgur.com/a/GRLxkfx)

Want to add custom items / blocks to the form?
1. Download [this_pack](https://www.mediafire.com/file/53wlw5djaf3hd7m/ID_Testing.zip/file) to see all item IDs and their icons, including custom ones.
2. Add the item typeId & ID to the `typeIds.js` file. Note that experimental items shift the vanilla IDs at 256- make sure to manually shift the IDs up, and remember the *full* typeId for your custom items!
3. You cannot use the constant `number_of_1_16_100_items` if you chose to add your custom items. Set it to zero!

### Important!!!
If you are using behaviour packs with items of format 1.16.100 or higher, vanilla item IDs are changed!
To remedy this, navigate to `scripts/extensions/forms.js` and change the constant `number_of_1_16_100_items` to whatever number of 1.16.100+ custom items your applied pack(s) have.

# Future Ideas

- Functioning inventory section (it’s just for looks at the moment)
- Customizable background (Using the vanilla ui nineslice, as right now it’s just a static texture)
- Dynamic sizing based on number of buttons, in rows of 9 at a time.

# Credits

Maintained by [Herobrine64](https://discord.com/users/330740982117302283) & [LeGend077](https://discord.com/users/695712100072292482).
