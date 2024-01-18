
import { AssistantBuilder } from "features/assistant/builder";


export function getServerSideProps(context: any) {
  const { params } = context;
  const workspaceId = params.id;
  return {
    props: {
      workspaceId,
    },
  }
}

export default function IndexPage({ workspaceId }: any) {
  return (
    <AssistantBuilder workspaceId={workspaceId} />
  );
}
