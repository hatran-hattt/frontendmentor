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
- Sass (CSS extension language)

### What I learned

I've learned some CSS/JS tips throughout this challenge

#### 1. Problem: Grid columns are not wide equally despite of setting 1fr for both

- Reason: After giving content's minimum size, remains space is divide equally
- Solution: using `minmax` (ex minmax((0, 1fr)) instead of only `fr`. That works because the x minimum size prevents the grid's default behavior of making columns larger to accommodate the content's minimum size, allowing the 1fr units to distribute space equally based on the container.

> `fr` is affected by intrinsic content size or a min-width -> might lead to unequall columns

#### 2. Problem: When focus input element, there are 2 layer of border (:focus & :focus-visible)

- Reason `:focus-visible` border style is browser default
- Solution: adding `outline: none;` to tell the browser not to draw its default outline when the input is focused.

#### 3. Problem: Tabbing for custom input, hidden input tab radio (input , lablel)

- Use `tabindex="-1"` to ignore tabbing (ex: hidden radio input)
- Use `tabindex="0"` to enable tabbing follow document flow (ex: custom label radio)

#### 4. Others:

- Apply CSS to hide number input spinners

  ```
  /* Hide number input spinners for Chrome, Safari, Edge, Opera */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide number input spinners for Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  ```

- Use `inputmode` attribute to hint touch device to show appropriate input pad

## Author

- Frontend Mentor - [@hatran-hattt](https://www.frontendmentor.io/profile/hatran-hattt)
