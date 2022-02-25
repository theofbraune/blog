+++
title= "Unity setup"
date= 2022-02-21T18:04:26+01:00
draft= false
author = "Theo"
tags = ["virtual reality","programming"]
+++

First I went to the [official unity page](https://learn.unity.com/tutorial/create-your-first-unity-project). This article assumes, that you have not installed unity yet. Thus you need to download the [unity hub](https://unity.com/download). 

{{< figure src="/images/unity_setup/unity_version.PNG"   width="50%" height="50%" >}}

In this article I am using Windows, but the steps for the other operating systems are not that different.
Of course you need to accept the unity licence agreement. Then you will see a window for the install location of the unity hub.
{{< figure src="/images/unity_setup/target_directory.PNG"   width="30%" height="30%" >}}
As I understood it, you can consider the unity hub as something, that will load for you all the utils from the big unity machinery (like shaders, libraries...) that you'll need for a good game.
You can leave the suggested target directory unchanged. Once the unity hub is installed it is ready to run.
Maybe your Firewall will block unity as a kind of software that could possibly download other software. But you can allow unity the access to your computer.
{{< figure src="/images/unity_setup/firewall_access.PNG"   width="30%" height="30%" >}}

Next you will need to sign in or create a unity account. 
{{< figure src="/images/unity_setup/unity_hun_version_three.PNG"   width="30%" height="30%" >}}
If you create a new unity account, keep in mind, that you will get tons of emails with "helpful" advices from unity. So I would recommend you to use an E-Mail, that you only use to subscribe somewhere, or to directly create in your E-Mail Inbox a rule, that automatically puts all the mails coming from untiy in a seperate folder.
Once you have signed in, you should see a window like that
{{< figure src="/images/unity_setup/unity_hub_version.PNG"   width="30%" height="30%" >}}

That will let you install the unity editor. Now, depending on your wifi, the installation might take a while. In my case with the Eduroam, it really takes some time.

Next if you click on *learn* on the left side, you will get some sample projects, that you can download.

{{< figure src="/images/unity_setup/installation_done_editor.PNG"   width="30%" height="30%" >}}

For example choose the kart race. 
{{< figure src="/images/unity_setup/unity_editor_karting.PNG"   width="30%" height="30%" >}}
At the first time, it will take some time for the Unity package manager to load and compile all the scripts and shaders.
{{< figure src="/images/unity_setup/compiling.PNG"   width="30%" height="30%" >}}

Once this is done, you are ready to modify your game in the unity editor.



