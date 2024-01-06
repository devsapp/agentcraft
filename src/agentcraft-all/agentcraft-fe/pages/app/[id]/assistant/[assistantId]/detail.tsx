
import { DetailPage } from "features/assistant/detail";


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

export default function IndexPage({ appId,assistantId }: any) {

  return (
    <DetailPage appId={appId} assistantId={assistantId}/>
  );
}
