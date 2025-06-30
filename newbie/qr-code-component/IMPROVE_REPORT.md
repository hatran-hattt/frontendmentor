# Solution Improvement Report

## Accessibility report

1. Images must have alternative text
   > \<img src="./images/image-qr-code.png">
2. Document should have one main landmark
3. Page should contain a level-one heading
4. All page content should be contained by landmarks
   > \<div class="card">...

> **Reference:**
>
> - https://web.dev/articles/headings-and-landmarks?hl=en
> - https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html
> - https://web.dev/learn/html/semantic-html

## HTML report

1. Consider using relative units (em, rem) instead of absolute units (px, pt) to support resizing and improve accessibility.
   > width: 320px;
   > Reference:
   >
   > - https://web.dev/learn/css/sizing#relative_lengths
   > - https://www.a11y-collective.com/blog/what-is-rem-in-css/
2. Use logical properties (e.g., inline-start instead of left) to support different reading directions and improve internationalization.
   > margin-top: 20px;
   > Reference:
   >
   > - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
3. Consider using CSS functions like calc(), min(), and clamp() to create more responsive and flexible layouts that adapt to different viewport sizes.
   > padding: 16px 16px 40px 16px;
   > Reference:
   >
   > - https://web.dev/articles/min-max-clamp
4. Use CSS custom properties (variables) to centralize values, improve consistency, and make site-wide changes easier to implement.
   > background-color: #d5e1ef;
   > Reference:
   >
   > - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties
5. Avoid large shorthand declarations that can unintentionally override other styles and make debugging more difficult.
   > padding: 16px 16px 40px 16px;
   > Reference:
   >
   > - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Shorthand_properties
