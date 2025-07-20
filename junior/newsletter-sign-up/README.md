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

- Solution URL: https://github.com/hatran-hattt/frontendmentor/tree/master/junior/newsletter-sign-up
- Live Site URL: https://hatran-hattt.github.io/frontendmentor/junior/newsletter-sign-up/index.html

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid, Flexbox
- Mobile-first workflow
- Sass (CSS extension language)

### What I learned

#### 1. Handle form (get form data, validate)

#### 2. CSS tips

- Set border-radius for picture element

  ```
      picture {
        border-radius: ...;
        overflow: hidden; // Add this
      }
  ```

  > Imagine a square div with a border-radius of 20px (making its corners rounded). If you place a perfectly square img inside it that fills the div, the img's sharp corners will poke out of the div's rounded corners. Adding overflow: hidden; to the div will "trim" those sharp corners of the image, making it appear rounded.

- Linear color for element: set `background-image` property (not `background-color`)

- When using container query, `em` size constrains are caculated base on container's font-size (not root 16px);

## Author

- Frontend Mentor - [@hatran-hattt](https://www.frontendmentor.io/profile/hatran-hattt)
