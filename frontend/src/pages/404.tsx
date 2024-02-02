import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Custom404() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
