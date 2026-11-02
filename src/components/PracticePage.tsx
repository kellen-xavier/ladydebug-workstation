import { useHashReveal } from "../hooks/useHashReveal";
import { PageLayout } from "./PageLayout";
import { Work } from "./Work";

export function PracticePage() {
  useHashReveal();
  return (
    <PageLayout current="pratica">
      <Work titleAs="h1" />
    </PageLayout>
  );
}
