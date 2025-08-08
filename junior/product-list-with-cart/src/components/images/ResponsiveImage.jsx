const ResponsiveImage = ({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  ...otherProps
}) => {
  return (
    <picture className="picture">
      <source srcSet={desktopSrc} media="(min-width: 64em)" />
      <source srcSet={tabletSrc} media="(min-width: 48em)" />
      <img src={mobileSrc} {...otherProps} />
    </picture>
  );
};

export default ResponsiveImage;

// .c-signup__hero img {
//   inline-size: 100%;
//   block-size: auto;
//   object-fit: cover;
//   object-position: center;
// }
