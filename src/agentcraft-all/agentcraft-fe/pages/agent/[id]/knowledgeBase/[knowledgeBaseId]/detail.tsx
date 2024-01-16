
import { DetailPage } from "features/knowledgeBase/detail";


export function getServerSideProps(context: any) {
  const { params } = context;
  const appId = params.id;
  const knowledgeBaseId = params.knowledgeBaseId;
  return {
    props: {
      appId,
      knowledgeBaseId
    },
  }
}

export default function IndexPage({ appId,knowledgeBaseId }: any) {

  return (
    <DetailPage appId={appId} knowledgeBaseId={knowledgeBaseId}/>
  );
}
