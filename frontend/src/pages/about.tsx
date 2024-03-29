import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>goal-appの使い方</h1>
      <h2>目標を設定できます</h2>
      <p>
        SMARTゴールに沿って目標を立てる。なぜやるのか、やらないとどうなるかを書くことによってやる意義を明確にできる
      </p>
      <h3>SMARTゴールとは？</h3>
      <p>
        specific, measurable, actionable, realistic,
        time-boundの略であり、具体的、計測可能、実行可能、現実的、時間制限があるかを意識して目標を立てることでより明確なゴールになり達成しやすくなる
      </p>
      <h2>目標の細分化ができます</h2>
      <p>
        中目標を立てることができ、その中にTODOを作ることができる。それによって細分化できる
      </p>
      <h2>その他モチベーションが上がる機能を実装予定です</h2>
      <p>グラフで一覧表示できたり</p>
    </>
  );
};

export default About;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
