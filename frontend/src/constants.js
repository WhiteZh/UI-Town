export const cssCategories = [
    "button",
    "checkbox",
    "toggle switch",
    "card",
    "loader",
    "input",
    "transition",
    "special effect"
];

export const jsCategories = [

];

export const iframeContent = (html, css) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Embedded Content</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        background-color: #2b2a2a;
        height: 100vh;
        width: 100vw;
      }
      ${css}
    </style>
  </head>
  <body>
    <div>
      ${html}
    </div>
  </body>
  </html>
`

export const shadowContent = (html, css) => `
<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" id="the-id-of-the-shadow-root">
    <style>${css}</style>
    ${html}
</div>
`