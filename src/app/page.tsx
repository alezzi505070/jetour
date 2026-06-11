import RedirectClient from "./RedirectClient";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${basePath}/en`} />
      <RedirectClient />
    </>
  );
}
