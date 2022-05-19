import { createGetInitialProps } from "@mantine/next";
import { Html, Head, NextScript, Main } from "next/document";
import { X } from "tabler-icons-react";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = createGetInitialProps();
