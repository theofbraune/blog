+++
title= "Roll a ball - Tutorial for a first game in Unity"
date= 2022-02-21T18:03:18+01:00
draft= false
author = "Theo"
tags = ["virtual reality","programming"]
summary = "The aim of this article is to guide you through the process of creating your first game in unity."
+++

The aim of this article is to guide you through the process of creating your first game in unity. In order to do this start by your Unity Hub, click on *new project* and select for this tutorial 3D-Core. Give the project your favorite name and location.
{{< figure src="/images/rollaball/unity_hub_start.PNG"   width="50%" height="50%" >}}
Now you should see the unity editor. In order to get started, select *Assets/Create/Scene*. 
{{< figure src="/images/rollaball/Create_scene.PNG"   width="30%" height="30%" >}}In the assets tab of the editor you should now see an icon *new scene*. Double click on it. In the hierarchy tab of the editor, there should be your newly created scene now that we can modify. You can rename the scene, it will be more professional and for a larger project with multiple scenes it is crucial to not lose the orientation.

To fill the scene with the content we need, let's create a ground plate.
{{< figure src="/images/rollaball/create_plane.PNG"   width="30%" height="30%" >}}
If you want to change the position of the plane, you can either select one of the orientation checkboxes on the top (follow my arrow) and then drag the object in the scene, or you could as well change the parameters directly on the right in the object inspector of your plane. For example you can change the name parameter to *ground*.
{{< figure src="/images/rollaball/plane-scene.png"   width="80%" height="80%" >}}

Further if you select the check boxes on the top, you can play around with the scale or rotation parameters.

A priori your plane has some arbitrary position, but as the plane will be the maon object in our game, we should place it into the origin of the world space. In order to that, click on the three dots in the Transform tab and select *reset*. 
{{< figure src="/images/rollaball/reset_plane.PNG"   width="40%" height="40%" >}}
If you want to modify for example your light source, make sure, that you unlock the inspector. It can be useful later to lock your object, when you click around and click on another object, that would be the one in the inspector. This can be annoying.

Now in order to make our objects look different, lets create different materials, that we will assign to the different instances in our game such as the ball, the plane, the pickup elements etc. Click on the + in your project tab and select the *material*. 
{{< figure src="/images/rollaball/create-cs-script.PNG"   width="30%" height="30%" >}}
In the asset section, there should be a new element, the material. In the asset section click on the material and then change in the inspector the properties, such as color, metallic or the smoothness. 

Now as we have the material we want to assign it to the ground plate. 
{{< figure src="/images/rollaball/material_to_plane.PNG"   width="50%" height="50%" >}}
To do that click-hold in the asset section the material and drag it in the scene view onto the object you want to modify. If you want to change the material, go to the inspector of the ground plane, select *Mesh Renderer/Materials*.
{{< figure src="/images/rollaball/change_material.PNG"   width="30%" height="30%" >}}

Now as we have the play ground, we need someone to play on it. In our case, we will take for this a sphere. So to create a player object. So again create a 3D-object, but this time take a sphere, place it at $$(0,0,0)$$. To do that click on the three dots next to the transform, select reset.
{{< figure src="/images/rollaball/reset_plane.PNG"   width="40%" height="40%" >}}
 You will realize, that your ball is located inside the plane now, so depending on the radius you wanna have, move it up by this margin in y-direction. 
{{< figure src="/images/rollaball/initial_sphere.PNG"   width="70%" height="70%" >}}
As this sphere will be the object moved by the player, one should give it a useful name such as *player*.


In order to control the components of the scene, such as the player, we can either fixed change the parameters in the insepector, but equivalently, we can also manipulate them within a C# script. A script can be considered as a component of a game object in order to control it. We will later see how one can do this in detail.
Here in this particular game we want, that the ball rolls on the ground, can hit a wall and bounces back and does not fly into space. The ball should roll, so we want some rigid-body motion. To do that, click in the hierarchy on *Player* (or whatever name you gave to your sphere), then go to the inspector and click on *Add component*
{{< figure src="/images/rollaball/select-rigid-body.PNG"   width="50%" height="50%" >}}

Search for *rigidbody*, then you should see in the inspector the physical components such as angular drag, mass etc. 
We want to control the game with our keyboard, so we need to use somehow the keyboard as an input device. In other cases it could be good to use a joystick as a device or as we will later see an Oculus quest. We will need the *Input package*. To get the package go to *Window* and select the Package Manager. 
{{< figure src="/images/rollaball/package-manager.PNG"   width="70%" height="70%" >}}
You might see only a few packages, to show all, select in the top left corner *Packages: Unity Registry* and search for *Input Systems*. 
{{< figure src="/images/rollaball/input-system.PNG"   width="70%" height="70%" >}}
This package will enable to use the information whether a key is pressed in our game. But if we would write this game for example for Playstation we could as well use their game pad for the input.
Click on install, after some time you might see a window, that asks whether you wanna use the systems backend. Select yes, after that, depending whether you have it installed already unity will restart itself.
If you are on windows, you need to check, whether your Architecture is ``x86_64``. To do that go in the top bar to *File/Build Settings* and change if necessary the architecture.

{{< figure src="/images/rollaball/build-settings.PNG"   width="40%" height="40%" >}}

Now as the input package is installed, we want to assign it only to the ball. For now, we do not want for example move around the plane. Thus we select the ball and add as a component the *Player Input*. In the inspector tab click on *Create Actions*. Now you should be directed into the asset folder. 
{{< figure src="/images/rollaball/folder-with-input-action.PNG"   width="50%" height="50%" >}}
In there create a folder called input and give save the file called for example ``InputAction`` in this folder. Then back in Unity check, whether you find the Input action file in the *Asset/Input* folder. 
{{< figure src="/images/rollaball/input-action.PNG"   width="40%" height="40%" >}}
Now your ball in the scene should have a flash, indicating to you, that it is linked to an InputAction. 
{{< figure src="/images/rollaball/ball-with-inputaction.PNG"   width="50%" height="50%" >}}
Now, this InputActions Asset will track whether we press a key on the keyboard. In order to use this information and modify our game, we need to fetch this information in a script and use it for manipulating our players position. To directly link the script to the player action, go to the player and add in the inspector the component ``new script``. Give the scipt for example the name ``PlayerController.cs``. 

{{< figure src="/images/rollaball/player-input.PNG"   width="60%" height="60%" >}}
This directly created a C# script linked to your ball. If you want to change the script in your favorite editor, in my case VS code, go to the upper bar, click edit and then select preferences. Then choose your favorite editor under *External Script Editor*.

{{< figure src="/images/rollaball/vs-code-editor.PNG"   width="40%" height="40%" >}}

If you open the ```PlayerController.cs```, we need to link the script to the input action. Therefore add in the Script the line 
```code
using UnityEngine.inputSystem;
```
Now in order to move the ball, we need to add forces to the rigid body. We want to link them to the input of the keyboard. Therefore add the function ``OnMove``

```code
void OnMove(InputValue movementValue)
    {
        Vector2 movementVector = movementValue.Get<Vector2>();
        movementX = movementVector.x;
        movementY = movementVector.y;
    }
```

This fetches for each frame, whether there is an input from the keyboard. Then to apply this force to the rigidbody, we need the function ``fixedUpdate``

```code
void FixedUpdate()
    {
        Vector3 movement =new Vector3( movementX, 0.0f, movementY );
        rb.AddForce(movement*speed);
    }
```
This applies the force to the rigid body and we can move the body around. If you switch into play mode, you will see, that your camera will not follow the ball and depending on your camera position, you cannot see the ball. In order to enable the tracking of the ball with the camera, we need to link the position of the ball to the position of the camera. In order to achieve that, we need to select the camera in the inspector and add a new script as before. You could call it ``CameraController.cs`` if you like. On the top of your script, you need to add a public variable 
```code
public class CameraController : MonoBehaviour
{
    public GameObject player;
}
```
Then in the inspector of the camera, you will see the game object player. Drag your ball to this game object. Then you can read and use all the variables in your script too. Before the game start, you need to compute how far your camera is away from the ball. Thus you have the following start function

```code
void Start()
    {
        offset = transform.position - player.transform.position;
    }
```

you can use this offset vector to update the position in the update function via the call
```code
void LateUpdate()
    {
        transform.position = player.transform.position + offset;   
    }
```

 Next we need to add some walls, such that the ball has a limit and does not fall down the plane. Since the ball has an included collider, it completely sufficed to add walls to the ground, that are sufficiently high. Here you see, that it is useful to use the provided unity tools, because like that, we have directly the acceleration and bouncing off included, it will be a lot easier.

{{< figure src="/images/rollaball/custum_pickups.PNG"   width="40%" height="40%" >}}

 To do this add walls to your scene and give them a certain height, such that you ball will not bounce. I gave them a black color, such that the set up reminds a bit of a billard table. Next you can add some pick-up objects to the play area. As I write this game in France, it is clear, that some french flavour is needed. Therefore I went to the unity Asset store, to get some Croissant.
 
{{< figure src="/images/rollaball/croissant-asset.PNG"   width="40%" height="40%" >}}
  You can create your own asset prefab now. In order to do that, I added a game object, where I added three planes, gave them the french colors and placed a croissant on top. 
  
{{< figure src="/images/rollaball/modify_croissant.PNG"   width="60%" height="60%" >}}
  The advantage is now, that the prefab like that can be scaled as one entity. 
  
{{< figure src="/images/rollaball/add-tag.PNG"   width="30%" height="30%" >}}
  We want to move the ball around, and if the ball hits the pickup, we want that the pickup dissapears and some score increases. If all pick up objects are collected you win and the game is over. Therefore in your script ``PlayerController.cs`` add a variable ``    private int countPickup;``

 in the head of your file. Now you can check for each frame, whether your ball collides with a pick-up and in if so, increase the ``countPickup``. One first idea how to do this could be to add a funcion of the form
```code
 private void OnTriggerEnter(Collider other)
    {
        
            other.gameObject.SetActive(false);
            countPickup+=1;
            SetCountText();
        
    }
```
But this will create a problem, because also when the ball hits the ground or a wall, the object will disappear. To solve this issue, you can add a tag to your croissant and then check if the collision object is a croissant. In this case you will disable the croissant and increase the score. 

{{< figure src="/images/rollaball/add-tag-2.PNG"   width="40%" height="40%" >}}
You should see a menu like that:
{{< figure src="/images/rollaball/create-the-tag-pickup.PNG"   width="40%" height="40%" >}}
Furthermore you need to add a collider to the prefab, but we do not want any physical interaction with the croissaint. It should not bounce off. As soon as it hits the croissant, the croissant should disappear. Therefore add the tick *is trigger*, then the collistion can be noticed and this information can be used in a script, but will not create any interaction.
{{< figure src="/images/rollaball/set-trigger-collider.PNG"   width="40%" height="40%" >}}
Note that in order to use the unity collision detector, you need to add a rigidbody to your pickup, otherwise the collision fails. You need to disable the tic use gravity, otherwise the ball will fall through the plane. Nevertheless we want to move the ball, so we need it's kinematic properties, i.e use the tick *is kinematic*
{{< figure src="/images/rollaball/is-kinematic-prefab.PNG"   width="40%" height="40%" >}}


Now place some pickup, but remember how many ;).
{{< figure src="/images/rollaball/creation-of-the-game.PNG"   width="40%" height="40%" >}}

 In order to display some text on the screen use a canvas object, declare in your script a public variable of the type ``    public TextMeshProUGUI countText;`` 

 {{< figure src="/images/rollaball/add_canvas.PNG"   width="40%" height="40%" >}}
 Then to write text on it, we need to create a TextMeshProUGUI object and link it to this public variable in your ``PlayerController.cs``. Then in order to write your score there add a function in the main class of the PlayerController of the form 
 ```code
 void SetCountText()
    {
        countText.text = "Count: "+countPickup.ToString();

        if (countPickup >=15)
        {
            countText.text = " ";
            winTextObject.SetActive(true);
        }
    }

```
This directly includes a condition when to end the game. In my case, I added 15 PickUp Objects, thus if there are 15 objects collected. In order to have a message appearing, I'll make the counter text disappear and activate the winTextObject. This is a public object, that I declared in the head of the class. On this game object I placed a big text "You Win! ". By default it is disabled, but if the 15 collectibles are hit, it will appear and the game ends.
