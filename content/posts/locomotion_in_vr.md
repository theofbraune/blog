+++
title= "Locomotion in virtual reality."
date= 2022-01-03T17:10:32+01:00
draft= true
author = "Theo"
tags = ["virtual reality"]
+++

In this post I will describe possibilities of locomotion in virtual reality.

### The Alpine Way - Cross Country Skiing


Suppose you are in the Alps and there is enough snow to use your cross country skies, you can do your health a favor and do this wonderful sport.


| {{< figure src="/images/locomotion/langlauf.png"   width="50%" height="50%" >}} |
|:--:|
| <b>Image Credits - https://www.youtube.com/watch?v=WaMTbWNVRko</b>|






To move forward you have two sticks whitch can help you to move forward, while skating on the snow.
This Movement sequence for the arms can be used as well for locomotion in VR and for the parcours that we want to use.

We will neglect, that there is also a lot of effort to be done from the legs when cross country skiing. We will only focus on the arms.
In the VR Setup, a first approach could be to move forward when pushing both sticks back at the same time.

In the VR-Setup this can be measured, with the hand control handles. As soon as they are pushed back, the player in the game becomes pushed as well.
The speed of the handle movement corresponds to the acceleration. 

In order to enable some steering, it might be a good idea to assign a velocity vector that is pointing to the right for the right handle and a velocity vector, that points more to the left in order to enable some steering and orientation.

![Demonstration of the steering](/images/locomotion/ezgif.com-gif-maker.gif)

Another opportunity for the steering could be to use the orientation of the head in order to determine the direction of travel for the guy in the parcours.

Probably this method is not the fastest and physically demanding. 
It has the opporunity to give a feeling of steepness. This could be achieved, when the arm is raised a lot, but the display only shows a minor raise. 
A little drawback to the old days with WII winter olympics.

But still this could be quite fun! 

Oculus even developed a VR-Game for a downhill Ski Race, where you can orient with the handles.

 [{{< figure src="/images/locomotion/alpine_ski_vr.png"   align="center" width="50%" height="50%" >}}](https://www.youtube.com/watch?v=ewGFD59Azc8) 


The slides for this pitch, how an implementation can be achieved, can be found [here](https://1drv.ms/p/s!AiOj4yVSmxYLiKtChRf5H7S0oy7e1g?e=Y7i61l).

### The US Gemini Astronaut

In the 60's during the space race between the United States and the Soviet Union both nations put a lot of effort into performing so called *EVA* aka *extravehicular activity* aka space walk. We want to pay attention how they managed/manage to move in space when classic walking is not an option. 

The russians decided to attach a rope to the cosmonaut to give him the possibility to orient and to move back to his capsule.

| {{< figure src="/images/locomotion/voskhod-2_3-locomotion.jpg"   width="30%" height="30%" >}} |
|:--:|
| <b>Alexei Leonow during the training. Image Credits - http://www.spacefacts.de/graph/sts/large_training/english/voskhod-2_3.htm </b>|


This way of locomotion to pull along a rope is quite promising, as long as we want to move to a fixed point as in his case the capsule. Of course one could combine this method, with some Spider-Man like move to create new fixed points where one can move to for the VR applications.

Although this might a pragmatic way of locomotion in space, the Americans were experimenting with other ways to move in space and get back to the capsule.

| {{< figure src="/images/locomotion/Astronaut_Edward_White_first_American_spacewalk_Gemini_4.jpg"   width="60%" height="60%" >}} |
|:--:|
| <b>Edward White during his spacewalk. Image Credits - NASA, Public domain, via Wikimedia Commons </b>|

In the picture we can see this stange looking device in his right hand. This is a so called [*Hand-held maneuvering unit*]("https://en.wikipedia.org/wiki/Hand-held_maneuvering_unit"), some kind of gun, that shoots a flame out in order to move forward.

In the case of our virtual reality goggle we can think of a similar locomotion technique. In space all the moving attempts of head or legs will not result into locomotion, hence this small portable rocket engine can be a means to the goal.

We can use this idea for locomotion as well, by using one (or both) of our handles as a gun. Then the orientation of the handle can determine the direction of travel. 
The firing could be toggled by pressing a button. Depending on the thrust of the engine this can cause some severe simulator sickness, but in my opinion this is such a cool method, that is is worth trying.


### The Karlsson on the roof locomotion.

In the story of Astrid Lindgren, Karlsson is a little boy living on the roof of a house in sweden. He has a red button on his stomach and as soon as he presses it, a propeller on his back start to turn and he can fly.

| {{< figure src="/images/locomotion/karlsson_vom_dach.jpg"   width="60%" height="60%" >}} |
|:--:|
| <b>Karlsson on the roof https://astridlindgrenstore.com/en/artiklar/9780192727725.html </b>|

Not only is this an amazing and beautiful book. When he is visiting his friend Lillebror, he sometimes brings him into trouble, but can escape quickly enough. I thought that this could be a cute and interesting idea for a locomotion technique. In order to determine how one could determine the steering direction, keep in mind, that Karlsson flying looks like that:

| {{< figure src="/images/locomotion/karlsson_moving.jpg"   width="60%" height="60%" >}} |
|:--:|
| <b>Karlsson on the roof https://www.prisma.de/mediathek/zdf/astrid-lindgren/karlsson-auf-dem-dach,29790816</b>|

We can determine the plane out of the two controllers and the Head mounted display in order to determine the pitch, roll and yaw angle of Karlsson. Then we can use similar rules as for an airplane in order to determine his forward moving position. In the book, there is -if I remember correctly- no information given how Karlsson controlls his speed. Hence we could for an implementation just use the joystick trigger value to determine how quick the propeller is turning. Probably, this would create a lot of cyber sickness, as one moves upwards and downwards, but as one uses at the same time a the head and the arms to steer, I can imagine, that this would help to reduce cybersickness. But of course the main priority of this locomotion would be to create nostalgic feelings and have a lot of fun. 