import localFont from "next/font/local";

const gt = localFont({
  src: [
    {
      path: "../fonts/GT-Walsheim-Ultra-Light.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Black.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/GT-Walsheim-Ultra-Bold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});

export { gt };
