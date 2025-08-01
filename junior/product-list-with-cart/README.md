# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
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

#### 1. Learn React.js basic

- Component-base Architecture: create reusable, independently components

- Component:

  - Create Component using Functional Component (Older types: Class Component, ...)

    - Regular JavaScript functions whose names always begin with a capital letter
    - Return JSX markup
      > JSX is similar to HTML, with a few differences.
      > Curly braces let you bring JavaScript logic and variables into your markup.
      > To pass props, add them to the JSX (can forward all props with `<Avatar {...props} />` JSX spread syntax)
      > To read props, use destructuring syntax
      > `children` prop is automatically pass to every component
      > `Conditional`:
      >
      > > - ternary operator: {cond ? <A /> : <B />}
      > > - AND operator: {cond && <A />}

  - Rendering lists

    - JSX elements directly inside a map() call always need keys!

  - Importing & Exporting Component using `named` and `default` import/export

    - `named` import/export (many per file)

      ```
        export function Profile() {
          // ...
        }

        import { Profile } from '...';
      ```

    - `default` import/export (only 1 per file)

      ```
        export default function Profile() {
          // ...
        }

        import Profile from '...';
      ```

  - Others:
    - `React’s rendering process must always be pure`. Components should only return their JSX, and not change any objects or variables that existed before rendering—that would make them impure!
    - Updating the screen, starting an animation, changing the data—are called `side effects`. They’re things that happen “on the side”, not during rendering.
    - `Side effects` usually belong inside `event handlers`. Even though event handlers are defined inside your component, they don’t run during rendering! `So event handlers don’t need to be pure`.
    - If you’ve exhausted all other options and can’t find the right event handler for your side effect, you can still attach it to your returned JSX with a `useEffect` call in your component. This tells React to execute it later, after rendering, when side effects are allowed. However, this approach should be your last resort.

- State

  - Use a state variable when a component needs to “remember” some information between renders.
  - React components re-render themselves and all their children when the state is updated
  - State is private to the component. If you render it in two places, each copy gets its own state.

- Trigger - Render - Commit Loop
  Any screen update in a React app happens in three steps:

  - Trigger
    > Timing for a component to render: initial render & re-render when state updates (the component's or its ancestors' state has been updated)
  - Render
    > This is the "pure" phase. React calls your component function
    > It does not touch the DOM. It produces a description of what the UI should look like
    > This phase should be side-effect-free—no network requests, no DOM manipulation, no timers.
  - Commit:
    > React takes the description from the render phase and updates the DOM (only changes the DOM nodes if there’s a difference between renders)
    > After the DOM is updated, React runs the side effects. This is where your useEffect and useLayoutEffect hooks are executed.

  > The Loop: A trigger initiates a render, which leads to a commit. The commit can, in turn, lead to another trigger (e.g., an effect fetches data and calls a useState updater function).

## Author

- Frontend Mentor - [@hatran-hattt](https://www.frontendmentor.io/profile/hatran-hattt)
