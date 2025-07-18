# Frontend Mentor - Newsletter sign-up form with success message solution

This is a solution to the [Newsletter sign-up form with success message challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/newsletter-signup-form-with-success-message-3FC1AZbNrv). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

- Add their email and submit the form
- See a success message with their email after successfully submitting the form
- See form validation messages if:
  - The field is left empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

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

- Solution URL: https://github.com/hatran-hattt/frontendmentor/tree/master/junior/article-preview-component
- Live Site URL: https://hatran-hattt.github.io/frontendmentor/junior/article-preview-component/index.html

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid, Flexbox
- Mobile-first workflow
- Sass (CSS extension language)

### What I learned

I've learned some CSS properties throughout this challenge

- Aligning items/tracks along the main(flexbox)/inline(grid) axis

  - `justify-content` (applies to **flexbox/grid** containers): aligns `items (or tracks)` and distributes extra space within the container.
  - `justify-items` (applies to **grid** containers): aligns the `content` of each individual grid item `within its cell`
    > `justify-self` (applies to **grid** items): aligns the content of a `single` grid item within its cell

- Applying a background image with a color layer

  ```
  {
    background-image:
      linear-gradient(to right, rgba(var(--color-bg-footer) ,0.75), rgba(#4D96A9,0.75)), /* Top layer: semi-transparent gradient */
      url('../assets/mobile/image-footer.jpg'); /* Bottom layer: actual image */
    background-repeat: no-repeat;
    background-size: cover; // Scales the image as large as possible without stretching it (clipped)
  }
  ```

- `Container-type` might affect an element's sizing, if a `shink-to-fit` width occurs, then an explicit width might be needed
  ```
  .container {
    container-type: inline-size;
    width: 100%;
  }
  ```
- Tip for centering block-level item horizontally: `margin: auto;`

## Author

- Frontend Mentor - [@hatran-hattt](https://www.frontendmentor.io/profile/hatran-hattt)
