
import { KnowledgeBaseBuilder } from "features/knowledgeBase/builder";


export function getServerSideProps(context: any) {
  const { params } = context;
  const workspaceId= params.id;
  return {
    props: {
      workspaceId,
    },
  }
}

export default function IndexPage({ workspaceId }: any) {

  return (
    <KnowledgeBaseBuilder workspaceId={workspaceId} />
  );
}
