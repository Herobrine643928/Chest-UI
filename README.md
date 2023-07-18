# Chest-UI

A Minecraft: Bedrock Script API pack that alters the Action Form UI to look & function like a chest does.

![image](https://github.com/Herobrine643928/Chest-UI/assets/94234093/c7e1d4a6-8a86-4de6-95c4-40df88958ad3)

# Benefits

- As fast as vanilla forms
- Java-style UIs
- Cursor-following hover text
- Easy to read
- Good for large numbers of buttons

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
form.button(0, 'Button Name', ['Button Lore'], 'textures/button', 6)
```
The parameters for the button are as follows:
1. Location. The slot that the item will display in, starting from zero. Max of 26 for a small chest, or 53 for a large.
2. Name. The name of the button.
3. Lore. An array of strings which will display below the item's name.
4. Texture. A texture path that the item will reference. Some options are `textures/items/amethyst_shard`, or `textures/blocks/sponge`. Note that block textures will display as a flat texture rather than a 3D mini-block, like they do in the inventory.
5. Stack size. This is an optional parameter, and will default to 1. Displays a small number in the lower right-hand corner- useful for shops selling multiple of an item at once!

Show it to the player & get a response
```js
form.show(player).then(response)
```

# Future Ideas

- Functioning inventory section (it’s just for looks at the moment)
- Customizable background (Using the vanilla ui nineslice, as right now it’s just a static texture)
- Enchanted items support
- Dynamic sizing based on number of buttons

# Credits

Original JSON UI created by LeGend077

[GitHub](https://github.com/LeGend077)

[Discord](https://discord.com/users/695712100072292482)

Script extension & JSON UI rewrite by Herobrine643928

[GitHub](https://github.com/Herobrine643928)

[Discord](https://discord.com/users/330740982117302283)
