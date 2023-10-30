
import { AgentPage } from "features/agent";



export function getServerSideProps(context: any) {
  const { params } = context;
  const appId = params.id;
  return {
    props: {
      appId,
    },
  }
}

export default function IndexPage({ appId }: any) {

  return (
    <AgentPage appId={appId} />
  );
}
