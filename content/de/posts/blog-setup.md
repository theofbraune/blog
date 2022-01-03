+++
title= "Setting up a Webblog with Hugo"
date= 2021-12-21T11:31:19+01:00
draft= false
author = "Theo"
tags = ["virtual reality", "web development"]
+++

If you want to create your own website or webblog, you are often faced with a ton of possible frameworks. Here in this post, I'll explain how you can easily setup your webblog with the static page generator [hugo](https://gohugo.io/).<br>

To get started, you first need to install the Hugo framework. I used on Ubuntu the Snap store for it.

{{< figure src="/images/setup_blog/snap_store.png"   width="50%" height="50%" >}}

In the next step I created a new directory, where I created all the necessary files. In order to create a new hugo blog, you can cd into the desired directory and then call
```sh
$ hugo new site <your sitename>
```

In the picture you can see, that the creation with the hugo new call creates directely a certain number of folders and files for you.
{{< figure src="/images/setup_blog/create_site.png"   width="50%" height="50%" >}}

If you want to add some content to your blog, you can call
```sh
$ hugo new posts/<title of your post>.md
```
This will create a markdown file with your chosen title. You will see a header, that is structured like 

 
```
+++
title= "Setting up a Webblog with Hugo"
date= 2021-12-21T11:31:19+01:00
draft= false
author = "Your Name"
tags = []
+++
```

Note that by default `draft` is set to `true`. This will prevent, that you cannot show it in your final blog.
You can update the default settings for this header in the `config.toml` file. For further information how this can be done, I'll refer to the [official Hugo documentary](https://gohugo.io/getting-started/configuration/).
It is useful to add tags, because later on you can show all posts, that share a tag together at once.

So, you are now able to create new content to your blog, but if you call 
```sh
$ hugo server
```
and launch your localhost, you'll realize, that you have no styling at all and that it looks really boring. Now you have two options (or certainly there are more and I just don't know about them). You can either choose a [theme on the official hugo website](https://themes.gohugo.io/) and unpack this in the themes folder of your hugo project. You will find a lot of sample themes and I'm sure you will find one that you like. In this case you do not need to touch any css or javascript at all.

Nevertheless I decided to design and play with [bootstrap](https://getbootstrap.com/), css, javascript and html on my own.
In this blog with hugo I want to create content in the form of markdown files, which will then be in a nice looking websetup. In order to have for example the same header with navbar for all blog posts, we need to define a base website and then use some hugo code








