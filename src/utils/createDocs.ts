export function createDocs(url: string, redocUrl: string) {
  return `
    <!DOCTYPE html>
      <html>
        <head>
          <title>Interview API V1</title>
          <!-- needed for adaptive design -->
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

          <!--
          Redoc doesn't change outer page styles
          -->
          <style>
            body {
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <redoc spec-url='${url}'></redoc>
          <script src="${redocUrl}"> </script>
        </body>
      </html>
  `;
}
