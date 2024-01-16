
import { AssistantBuilder } from "features/assistant/builder";


export function getServerSideProps(context: any) {
  const { params } = context;
  const appId = params.id;
  const assistantId = params.assistantId;
  return {
    props: {
      appId,
      assistantId
    },
  }
}

export default function IndexPage({ appId }: any) {

  return (
    <AssistantBuilder appId={appId} />
  );
}
