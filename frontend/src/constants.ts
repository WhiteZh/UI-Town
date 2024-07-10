// export const cssCategories: string[] = [
//     "button",
//     "checkbox",
//     "toggle switch",
//     "card",
//     "loader",
//     "input",
//     "transition",
//     "special effect"
// ];

// export const jsCategories = [
//
// ];

export const iframeContent = (html: string, css: string) => `
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
`;

export const shadowContent = (html: string, css: string) => `
<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" id="the-id-of-the-shadow-root">
    <style>${css}</style>
    ${html}
</div>
`;

export type User = {
    id?: number,
    email?: string,
    password_hashed?: string,
};

export type Notification = {
    message: string,
    color?: string
};

export type Session = {
    playedOA: boolean
};

export enum CSSCategory {
    Button = "button",
    Checkbox = "checkbox",
    ToggleSwitch = "toggle switch",
    Loader = "loader",
    Card = "card",
    Input = "input",
    Transition = "transition",
    SpecialEffect = "special effect",
}

export type CSSStyle = {
    id: number,
    name: string,
    viewed_time: number,
    author_id: number,
    html: string,
    css: string,
    category: CSSCategory
};