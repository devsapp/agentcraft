
import { AssistantBuilder } from "features/assistant/builder";


export function getServerSideProps(context: any) {
  const { params } = context;
  const workspaceId = params.id;
  const assistantId = params.assistantId;
  return {
    props: {
      workspaceId,
      assistantId
    },
  }
}

export default function IndexPage({ workspaceId }: any) {
  return (
    <AssistantBuilder workspaceId={workspaceId} />
  );
}
