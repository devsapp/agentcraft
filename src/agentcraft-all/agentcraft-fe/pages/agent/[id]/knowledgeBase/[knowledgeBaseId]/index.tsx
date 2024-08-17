import { KnowledgeBaseBuilder } from "features/knowledgeBase/builder";


export function getServerSideProps(context: any) {
  const { params } = context;
  const workspaceId= params.id;
  const knowledgeBaseId = params.knowledgeBaseId;
  return {
    props: {
      workspaceId,
      knowledgeBaseId
    },
  }
}

export default function IndexPage({ workspaceId }: any) {

  return (
    <KnowledgeBaseBuilder workspaceId={workspaceId} />
  );
}
