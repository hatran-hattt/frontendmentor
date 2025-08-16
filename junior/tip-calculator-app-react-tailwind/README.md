# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

**Mobile**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![](./screenshot-mobile.png)

**Tablet**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![](./screenshot-tablet.png)

**Desktop**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![](./screenshot-desktop.png)

### Links

- Solution URL: https://github.com/hatran-hattt/frontendmentor/tree/master/junior/tip-calculator-app
- Live Site URL: https://hatran-hattt.github.io/frontendmentor/junior/tip-calculator-app/index.html

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid, Flexbox
- Mobile-first workflow
- React.js
- TailwindCSS

### What I learned

I've learned TailwindCSS throughout this challenge

- Utility classes
  - Example:
    ```
      grid-cols-2 -> Using pre-defined values
      shadow-(<custom-property>) shadow-(color:<custom-property>) -> Using custom property
      grid-cols-[24rem_2.5rem_minmax(0,1fr)] -> Using arbitrary values
    ```
  - Visibility classes: hidden, sr-only
  - Mark important (add ! to last class: `className="bg-red-50 text-2xl!"`)
- Variants (state, responsive)
- Theme variables
  Theme variables are defined in namespaces and each namespace corresponds to one or more utility class or variant APIs.

  ```
    Namespace	Utility classes
    --color-*	Color utilities like bg-red-500, text-sky-300, and many more
    --font-*	Font family utilities like font-sans
    --text-*	Font size utilities like text-xl
  ```

  ```
    Example
    // declare
    @theme {
      --font-base: "Space Mono", sans-serif;
    }

    // using
    className="font-base"
  ```

- Styling based on the descendants of a peer
  - mark the sibling with the `peer` class
  - then use the `peer-<variant>-*` variant to style the target element
    Example
  ```
    className="peer-hover:bg-red"
  ```
- Note:
  Pay attention on duplicate classes declaration when checking many condition

## Author

- Frontend Mentor - [@hatran-hattt](https://www.frontendmentor.io/profile/hatran-hattt)
