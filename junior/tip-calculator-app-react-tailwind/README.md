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

I've learned following library throughout this challenge

#### 1. TailwindCSS (style components using utility classes directly in markup)

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

#### 2. React hook form (reduce the amount of code need to write to handle form (state, validation management))

- npm package: react-hook-form, @hookform/resolvers
- Usage:

  - [`useForm`](https://react-hook-form.com/docs/useform): custom hook for managing forms with ease

    - Some properties of optional argument object:

      - defaultValues
      - mode: Validation strategy before submitting behaviour (reValidateMode -> after)
      - resolver: Integrates with your preferred schema validation library (ex: Zod)

    - Some method/object provided by this custom hook:

      - register: register an input/select element and apply built-in validation rules
      - watch: watch specified inputs and return their values (trigger re-render if used in conditional rendering)
      - getValues: An optimized helper for reading form values. The difference between watch and getValues is that getValues will not trigger re-renders or subscribe to input changes.
      - formState: object contains information about the entire form state (Some properties: errors, isValid, isDirty, ...)
      - handleSubmit: This function will receive the form data if form validation is successful.
      - reset: Reset the entire form state, fields reference, and subscriptions. There are optional arguments and will allow partial form state reset.
      - setFocus: TODO

- Some tips:

  - [How to share ref usage?](https://www.react-hook-form.com/faqs/#Howtosharerefusage)
    React Hook Form needs a ref to collect the input value. However, you may want to use ref for other purposes (e.g. scroll into the view, or focus).

    ```
    const { ref, ...rest } = register('firstName');

    <input {...rest} name="firstName" ref={(e) => {
      ref(e)
      firstNameRef.current = e // you can still assign to ref
    }} />
    ```

  - Add custom onChange handler
    (When you manually add your own onChange handler, you're overwriting the one provided by the register function.)

    ```
      const { onChange, ...rest } = register('tip-percentage');

      <input
        {...rest} // Spread the rest of the props
        type="radio"
        value="10"
        // Manually call both onChange functions
        onChange={(e) => {
          onChange(e); // Call react-hook-form's handler
          console.log("change radio"); // Call your custom handler
        }}
      />
    ```

#### 3. Zod (TypeScript-first schema declaration and validation library)

- npm package: zod
- Intro:

  - Using Zod, you can define schemas you can use to validate data, from a simple string to a complex nested object.
  - Zod is designed to be as developer-friendly as possible. The goal is to eliminate duplicate type declarations. With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type)

- [Usage](https://zod.dev/basics):

  - Defining a schema (To validate data, you must first define a schema. Schemas represent types)
  - Parsing data (Given any Zod schema, use .parse to validate an input. If it's valid, Zod returns a strongly-typed deep clone of the input.)
  - Inferring types (Zod infers a static type from your schema definitions)

  ```
  Example
      import * as z from "zod";

      // Define a schema
      const Player = z.object({
      username: z.string(),
      xp: z.number()
      });

      // extract the inferred type
      type Player = z.infer<typeof Player>;

      // use it in your code
      const player: Player = { username: "billie", xp: 100 };

  ```

- Some tips:

  - Solution to avoid `type mismatch between the input and output types of Zod schema` when integrates with react-hook-form.

    ```
      // Create a type for the data going IN to the schema (the raw form data)
      type MyFormInput = z.input<typeof myFormSchema>;

      // Create a type for the data coming OUT of the schema (the validated data)
      type MyFormOutput = z.infer<typeof myFormSchema>;

      // In your useForm hook, explicitly define both the input and output types
      // The first generic is the output type, the second is the input type.
      const { register, handleSubmit } = useForm<MyFormOutput, MyFormInput>({
        resolver: zodResolver(MyFormSchema),
      });
    ```

    - Note:

      - input type (`z.input<MySchema>`): What the schema accepts (ex: receives from the raw HTML) (getValues(), watch(), and the register function will all use this type)

      - output type (`z.infer<MySchema>`): What the schema produces after successful validation and transformation
        , z.infer (The handleSubmit callback will use this type for its data argument)

## Author

- Frontend Mentor - [@hatran-hattt](https://www.frontendmentor.io/profile/hatran-hattt)

---
