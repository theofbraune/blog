+++
title= "Implementation of Ski Locomotion in Virtual Reality."
date= 2022-01-31T14:29:19+01:00
draft= false
author = "Theo"
tags = ["virtual reality", "programming"]
+++


In my locomotion project I went for an approach to imitate cross-country-skiing in VR. The overall idea will be, that you have to move your arms from top to down, and this then gives you a push.

[INCLUDE PICTURE]

In the first part of my implementation, I realized, that I can enter the ground. In order to prevent this, I first implemented a very simple locomotion with a joystick, where I take the x-value and associate it to the speed that the player will feel. Then I took the normalized forward vector of the head mounted display to move forward. As I want to stay on the ground and do not want to move in the air, I took the projection onto the x-z-plane with the `hmd.forward`. 

[Include code]


This script mainly allows to check to move forward with the help of the joystick and brakes by adding drag if nothing is pressed.

In order to access the rigidbody in my script, I declared a public variable `public Rigidbody rbdy` in the header of the file. To link them, I just dragged in the unity editor the rigidbody component into the public variable of the script. Make sure that you untick the `isKinematic` in the rigidbody. 

In order to solve this issue of entering the street, my first idea was to use a second collider, but there seemed to be a problem, because if the new collider is not a trigger, we will bounce of the coins and cannot collect them. Thus I tried to activate and deactivate the trigger of the collider in the script in such a way, that if I hit the street, the trigger is false. I used the call
`this.GetComponent<Collider>().isTrigger = false` 
If the collider detected, that the collision object is a banner or a coin, I reset the trigger to true. But there was still an issue, because this action is not fast enough. That means, that we hit a coin, collide hard, and then the coin can be collected, to overcome this issue, I used a little dirty hack, in such a way, that I manually defined the y-position. I placed 8 cubes in the area of the bridge and manually checked their positions. 
[INCLUDE PIC]
If the player is not inside the bridge zone, I set the y-coordinate to $0.5$. In my scipt I then check, whether the player is going uphill, downhill or whether he is on top of the bridge. Then I used an easy linear function to measure how high I need to set the player

[INCLUDE CODE]

In the game in the end, this method seems quite smooth and floorless, but of course, jumping is a little problem with that.

With the boolean information, whether we are going uphill/downhill, I then added some drag to the rigidbody, such that it is harder/easier to move forward.

Now in order to get the ski locomotion right, my plan was to place 4 cubes in front of the player and then to measure, whether the controller move from the upper box to the lower box and if they do, to add a force.

In order to do this, I attached a game object to the `CenterEyeAnchor`, where I place 4 cubes. In order to place them, I used the Oculus link to debug, when they have a good position.

First I checked the upper cubes and placed them by hand, next I placed the lower cubes and tested, that a natural ski stroke movement is from the upper to the lower cube.

Next I assigned some materials to the cubes.
[INCLUDE PICTURE]

When I tried to start the game now on my Oculus, I realised, that I cannot pass the first banner, thats because the added cubes all have attached colliders and they need to be triggers, thus, set the trigger to all the 4 box colliders of the added cubes.

In the next step, we somehow need to detect, whether we hit with the controller the cubes, in order trigger a push. To do that, I declared 4 public GameObject variables in the locomotion script with boolean variables, that will indicate whether we are in one of the cubes. Then I attached in the unity inspector the cubes we just moved around to the Locomotion script.

Next in order to check if the `LeftHandAnchor` is inside the box or not, I attached a new script to the left (and then right) hand anchor. In the project window, drag them over to the `Scripts` folder.
Now, we additionally need to add a box collider to the Controllers/Anchors. Make sure to tick the `isTrigger` again. There one needs to be careful, because by default the collider of the Anchors has not the same size as the collider of the boxes. Thus it might be, that the collider of the anchor is at the same time in the upper and the lower cube, and our locomotion scipt has a problem. In my case, scaling the collider by around $0.1$ does the trick.

In order to access the information of the collider of the controller, I defined public variables for the `ColliderLeft` and `ColliderRight` in the header of the LocomotionTechnique script. In the Inspector of the LocomotionScript click on the right circle and select your script.

[INCLUDE PICTURE]


Next we need to write the script for ColliderLeft and ColliderRight. In order to do that, we need to check, if the handle is in the upper box, then set a boolean variable on true for that, and we set it back to false, when we leave the box again. 

[INCLUDE CODE]

Note, that it is necessary for that to give a tag to each of the cubes. Furthermore you need to add to your left and RightHandAnchor a Rigidbody! Only in this case unity can detect the collision. Trust me, painful debugging time was needed for this insight.
As the variables like `in_right_up` are defined as public in the script, we can read them out in the main locomotion script. This can be done with the following call:
[INCLUDE CODE]

Now this is what we want, like that we get in each frame the information, whether our handle is in the upper or lower box.

The logical steps are to check, is the handle in the upper box. Does it move from there to the lower box, if so, trigger a push.
I measure the time it takes, and the faster it is, the bigger the push is going to be.
[INCLUDE CODE]


Now you should be able to move by going up and down with the controllers from the boxes. I experimented a little bit how to set the natural drag, to slow down again and the force from the push. It turned out, that for the plane a drag value of $0.4$ seems quite fun.
When going downhill, I add a drag of $-0.1$, so that you accelerate when decending. But in order to get into the next corner, we need to brake down. I just use the value of the right `PrimaryIndexTrigger` and add a large drag according to this value. Before the push, I add a condition of the form 
[INCLUDE CODE]

From now on, I played a bit and modified the application a bit more. I added for example 2 ski rigs to the hands.[ADD Pictures] Then play around until they have the right size.

Next, to create an even more authentic experience, I added a haptic feedback to the controllers, when performing the stroke. To trigger the haptic feedback, you can add in the script the line `OVRInput.SetControllerVibration(1,1,leftController)` this triggers the vibration of the controller. Oculus claims that you can also give a direct feedback for a predefined time, but this did not really work for me, therefore I measured the time of the push, if more then 0.1 seconds are elapsed, the vibration becomes disabled by  `OVRInput.SetControllerVibration(0,0,leftController)`. This can be performed by the following code


(Simultaniously for the right one as well of course)
Furthermore the call of `collider_left.triggered_left` allows us to pass the information, that the stroke is performed to the script of the left and right anchor. As we already have a sound attached to the OVRCameraRig through the coins, we can add there the noise of hitting snow. I added an audio component to the Left and Right Anchor. Then I bought from [soundsnap](https://www.soundsnap.com/tags/snow) a audio tag, that gives you the sound, when you step on snow.
I added the downloaded soundfile to the Sounds folder in the Assets folder of the game. Then add the snow sound to the AudioSource of the HandAnchor.
[Picture]

Then in the script of your controller, change the `Update` method as follows
[Include Code]

Then you should hear the sound, when performing the stroke.

During the implementation there was big problem, that only one eye was rendering. I have no idea what caused it, but as I wrote this article, I rebuild the application. Downgrading to Unity 2019.4.15f1 did the trick for me, 



The files for this project can be found under this [github link](https://github.com/theofbraune/VR-Ski-Locomotion)




